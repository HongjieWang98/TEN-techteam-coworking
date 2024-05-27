import {
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore/lite';

/**
 * @enum {string}
 */
const EventType = {
  LISTED: "listed",
  RESERVED: "reserved",
  RESERVATION_CANCELED: "reservation_canceled",
  LISTING_REMOVED: "listing_removed",
  BUYER_ACCEPTED: "buyer_accepted",
  BUYER_DENIED: "buyer_denied",
  SELLER_CONFIRMED_TRANSACTION: "seller_confirmed_transaction",
  BUYER_CONFIRMED_TRANSACTION: "buyer_confirmed_transaction"
}

/**
 *  Annoyingly, for type safety, this must be updated whenever the EventType object is updated.
 * @typedef {'LISTED'|'RESERVED'|'RESERVATION_CANCELED'|'LISTING_REMOVED'|'BUYER_ACCEPTED'|'BUYER_DENIED'|'SELLER_CONFIRMED_TRANSACTION'|'BUYER_CONFIRMED_TRANSACTION'} EventTypeType 
 */

/**
 * @enum {string}
 */
const EventStatus = {
  ACTIVE: "active",
  REMOVED: "removed",
  RESERVED: "reserved",
  PENDING_CONFIRMATION: "pending_confirmation",
  SOLD: "sold",
}

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
 * Represents a textbook (only typing the fields necessary for processStatus)
 * @typedef {Object} Textbook
 * @property {string} seller_id
 * @property {string} buyer_id 
 * @property {EventStatusType} status
 */

/**
 * Processes the textbook events and return a the status of the textbook
 * The param is expected to be the document from the textbook collection before data retrieval
 * @returns {Textbook}
 */
export async function processStatus(textbookRef, textbook) {

  if (!textbook) {
    throw new Error(`Could not find textbook`)
  }

  const textbookEventsRef = collection(textbookRef, 'textbook_events');

  if (!textbookEventsRef) {
    throw new Error(`Could not find 'textbook_events' subcollection reference on textbook id: ${textbook.id}`)
  }

  const textbookEvents = (await getDocs(query(textbookEventsRef, orderBy('timestamp', "desc")))).docs;

  if (!textbookEvents || textbookEvents.length === 0) {
    throw new Error(`Could not find 'textbook_events' subcollection on textbook id: ${textbook.id}`)
  }

  const textbookEventsData = textbookEvents.map(event => event.data());
  const textbookStatus = evaluateEventStatus(textbookEventsData);

  return {
    ...textbook,
    status: textbookStatus
  }
  
}


const RESERVATION_EXPIRATION = 60 * 60 * 24 * 7 // one week in seconds

/**
 * 
 * @param {TextbookEvent[]} textbookEventsData 
 * @returns {EventStatusType}
 */
function evaluateEventStatus(textbookEventsData) {
  const mostRecentEvent = textbookEventsData[0];
  if (mostRecentEvent.event_type === EventType.RESERVED) {
    // compare epoch timestamps
    if (mostRecentEvent.timestamp.seconds + RESERVATION_EXPIRATION > Date.now() / 1000) {
      return EventStatus.RESERVED;
    } else {
      return EventStatus.ACTIVE;
    }
  }

  if (mostRecentEvent.event_type === EventType.LISTED ||
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

  if (mostRecentEvent.event_type === EventType.SELLER_CONFIRMED_TRANSACTION ||
      mostRecentEvent.event_type === EventType.BUYER_CONFIRMED_TRANSACTION
  ) {
    return EventStatus.SOLD;
  }

  throw new Error(`Could not determine status from event: ${mostRecentEvent.event_type}`)
  
}