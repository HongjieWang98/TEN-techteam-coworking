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
 * @property {TextbookEvent[]} textbook_events
 * @property {string} seller_id
 * @property {string} buyer_id 
 */

/**
 * Processes the textbook events and return a the status of the textbook
 * The param is expected to be the document from the textbook collection before data retrieval
 * @returns {EventStatusType}
 */
export async function processStatus(textbookRef, textbook) {

  if (!textbook) {
    throw new Error(`Could not find textbook`)
  }

  const textbookEventsRef = collection(textbookRef, 'textbook_events');

  if (!textbookEventsRef) {
    throw new Error(`Could not find 'textbook_events' subcollection reference on textbook id: ${textbook.id}`)
  }

  const textbookEvents = (await getDocs(query(textbookEventsRef, orderBy('timestamp')))).docs;

  if (!textbookEvents || textbookEvents.length === 0) {
    throw new Error(`Could not find 'textbook_events' subcollection on textbook id: ${textbook.id}`)
  }

  // now add the logic to map the events to statuses

  return {
    ...textbook,
    status: EventStatus.ACTIVE
  }
  
}