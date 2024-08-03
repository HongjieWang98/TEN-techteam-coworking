import { collection, orderBy, query, getDocs, limit } from 'firebase/firestore/lite';
import { getUserById } from './user';

/**
 * @enum {string}
 */
const EventType = {
  LISTED: 'listed',
  RESERVED: 'reserved',
  RESERVATION_CANCELED: 'reservation_canceled',
  LISTING_REMOVED: 'listing_removed',
  BUYER_ACCEPTED: 'buyer_accepted',
  BUYER_DENIED: 'buyer_denied',
  SELLER_CONFIRMED_TRANSACTION: 'seller_confirmed_transaction',
  BUYER_CONFIRMED_TRANSACTION: 'buyer_confirmed_transaction'
};

/**
 *  Annoyingly, for type safety, this must be updated whenever the EventType object is updated.
 * @typedef {'LISTED'|'RESERVED'|'RESERVATION_CANCELED'|'LISTING_REMOVED'|'BUYER_ACCEPTED'|'BUYER_DENIED'|'SELLER_CONFIRMED_TRANSACTION'|'BUYER_CONFIRMED_TRANSACTION'} EventTypeType
 */

/**
 * @enum {string}
 */
const EventStatus = {
  ACTIVE: 'active',
  REMOVED: 'removed',
  RESERVED: 'reserved',
  PENDING_CONFIRMATION: 'pending_confirmation',
  SOLD: 'sold'
};

/**
 *  Annoyingly, for type safety, this must be updated whenever the EventStatus object is updated.
 * @typedef {'ACTIVE'|'REMOVED'|'RESERVED'|'PENDING_CONFIRMATION'|'SOLD'} EventStatusType
 */

/**
 * Represents a textbook event
 * @typedef {Object} TextbookEvent
 * @property {string} user_id
 * @property {EventTypeType} event_type
 * @property {firebase.firestore.Timestamp} timestamp
 */

/**
 * Represents a User
 * @typedef {Object} User
 * @property {string} id
 */

/**
 * Represents a textbook (only typing the fields necessary for processTextbook)
 * @typedef {Object} Textbook
 * @property {User} seller
 * @property {User} buyer
 * @property {EventStatusType} status
 */

const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;
const RESERVATION_EXPIRATION = ONE_WEEK_IN_SECONDS;

/**
 * Processes the textbook events and return a the status of the textbook
 * The param is expected to be the document from the textbook collection before data retrieval
 * @returns {Promise<Textbook>}
 */
export async function processTextbook(textbookRef, textbook, includeSellerBuyerSubmodel = false) {
  if (!textbook) {
    throw new Error(`Could not find textbook`);
  }

  const textbookEventsRef = collection(textbookRef, 'textbook_events');

  if (!textbookEventsRef) {
    throw new Error(`Could not find 'textbook_events' subcollection reference on textbook id: ${textbook.id}`);
  }

  const textbookEvents = (
    await getDocs(query(textbookEventsRef, orderBy('timestamp', 'desc')))
  ).docs.map((doc) => doc.data());

  if (!textbookEvents) {
    throw new Error(`Could not find 'textbook_events' subcollection on textbook id: ${textbook.id}`);
  }

  const mostRecentTextbookEvent = textbookEvents[0];
  const textbookStatus = evaluateEventStatus(mostRecentTextbookEvent);
  const [seller_id, buyer_id] = await evaluateSellerIdAndBuyerId(textbookEvents);
  let [seller, buyer] = [{ id: seller_id }, buyer_id ? { id: buyer_id } : null];
  
  if (includeSellerBuyerSubmodel) {
    [seller, buyer] = await Promise.all([
      seller_id ? getUserById(seller_id) : null,
      buyer_id ? getUserById(buyer_id) : buyer_id
    ])
  }

  return {
    ...textbook,
    status: textbookStatus,
    buyer,
    seller
  };
}

/**
 *
 * @param {TextbookEvent[]} textbookEventsData
 * @returns {EventStatusType}
 */
function evaluateEventStatus(mostRecentEvent) {
  if (mostRecentEvent.event_type === EventType.RESERVED) {
    // compare epoch timestamps
    if (mostRecentEvent.timestamp.seconds + RESERVATION_EXPIRATION > Date.now() / 1000) {
      return EventStatus.RESERVED;
    } else {
      return EventStatus.ACTIVE;
    }
  }

  if (
    mostRecentEvent.event_type === EventType.LISTED ||
    mostRecentEvent.event_type === EventType.BUYER_DENIED ||
    mostRecentEvent.event_type === EventType.RESERVATION_CANCELED
  ) {
    return EventStatus.ACTIVE;
  }

  if (mostRecentEvent.event_type === EventType.LISTING_REMOVED) {
    return EventStatus.REMOVED;
  }

  if (mostRecentEvent.event_type === EventType.BUYER_ACCEPTED) {
    return EventStatus.PENDING_CONFIRMATION;
  }

  if (
    mostRecentEvent.event_type === EventType.SELLER_CONFIRMED_TRANSACTION ||
    mostRecentEvent.event_type === EventType.BUYER_CONFIRMED_TRANSACTION
  ) {
    return EventStatus.SOLD;
  }

  throw new Error(`Could not determine status from event: ${mostRecentEvent.event_type}`);
}

async function evaluateSellerIdAndBuyerId(textbookEvents) {
  const seller_id = textbookEvents.find((event) => event.event_type === EventType.LISTED)?.user_id;
  let buyer_id = null

  const status = evaluateEventStatus(textbookEvents[0]);

  switch(status) {
    case EventStatus.RESERVED:
      // .find() looks for the first element that satisfies the condition and the order is in descending
      //  we should be finding the buyer_id of the most recent reservation
      buyer_id = textbookEvents.find((event) => 
        event.event_type === EventType.RESERVED && 
        event.timestamp.seconds + RESERVATION_EXPIRATION > Date.now() / 1000
      )?.user_id;
      break;
    case EventStatus.PENDING_CONFIRMATION || EventStatus.SOLD:
      buyer_id = textbookEvents.find((event) => 
        event.event_type === EventType.RESERVED
      )?.user_id;
      break;
    default:
      buyer_id = null
  }

  if (!seller_id) {
    throw new Error(`Could not find seller_id for textbook id: ${textbook.id}`);
  }


  return [seller_id, buyer_id]
}
