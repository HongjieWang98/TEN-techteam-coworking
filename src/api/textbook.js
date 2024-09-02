import {
  collection,
  doc,
  getDoc,
  or,
  query,
  addDoc,
  where,
  getDocs,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore/lite';
import { db } from '../firebase/firebase_config';
import { EventStatus, processTextbook } from './process_textbook';
import { sendBuyerCanceledReservationEmail, sendCompletedTransactionConfirmation, sendCompletedTransactionNotification, sendListingConfirmation, sendReservationConfirmationToReserver, sendReservationConfirmationToSeller, sendSellerAcceptedReservationEmail, sendSellerDeniedReservationEmail } from './email';

export async function getTextbookById(id, includeSellerBuyerSubmodel = false) {
  const textbookCollectionRef = collection(db, 'textbooks');
  const textbookDocRef = doc(textbookCollectionRef, id);
  const textbook = await getDoc(textbookDocRef);

  if (textbook.exists()) {
    return await processTextbook(textbook.ref, textbook.data(), includeSellerBuyerSubmodel);
  }

  return null;
}

export async function getTextbooksByUserId(userId) {
  // TODO put some caching here
  const textbookCollectionRef = collection(db, 'textbooks');
  const q = query(textbookCollectionRef, or(where('seller_id', '==', userId), where('buyer_id', '==', userId)));
  const textbooks = (await getDocs(q)).docs;
  return (
    await Promise.all(
      textbooks.map(async (textbook) => {
        return processTextbook(textbook.ref, textbook.data());
      })
    )
  ).filter((textbook) => textbook.seller_id === userId || textbook.buyer_id === userId);
}

export async function getTextbooksByOrganizationId(organizationId, includeSellerBuyerSubmodel = false) {
  // TODO put some caching here
  const textbookCollectionRef = collection(db, 'textbooks');
  const q = query(textbookCollectionRef, where('organization_id', '==', organizationId));
  const textbooks = (await getDocs(q)).docs;

  return Promise.all(
    textbooks.map(async (textbook) => {
      return processTextbook(textbook.ref, textbook.data(), includeSellerBuyerSubmodel);
    })
  );
}

// TODO we should handle any race conditions that comes with textbook events
// eg listing removal and reservation cancelled at the same time

export async function listTextbook(textbook, userId) {
  // TODO we should rollback if the email fails to send
  // TODO we should validte the textbook once here before listing
  const currTime = serverTimestamp();
  const docRef = await addDoc(collection(db, 'textbooks'), {
    ...textbook,
    seller_id: userId,
    buyer_id: null,
    created_at: currTime,
    updated_at: currTime,
    deleted_at: null
  });
  const subcollectionRef = collection(db, `textbooks/${docRef.id}/textbook_events`);
  await addDoc(subcollectionRef, {
    event_type: 'listed',
    user_id: userId,
    timestamp: currTime
  });

  await sendListingConfirmation(userId, textbook);
}

// Takes in an array of textbook, returns a list of true or false (relating to whether or not the textbook was bought)
// Additionally takes in a userId for the user that wants to reserve these textbooks
export async function reserveTextbooks(textbooks, userId) {
  const reservedStatus = await Promise.all(
    textbooks.map(async (textbook) => {
      try {
        const currTextbook = await getTextbookById(textbook.id);
        if (currTextbook != null && currTextbook.status === EventStatus.ACTIVE && currTextbook.seller_id !== userId) {
          const subcollectionRef = collection(db, `textbooks/${textbook.id}/textbook_events`);
          const currTime = serverTimestamp();
          await updateDoc(doc(db, 'textbooks', textbook.id), {
            buyer_id: userId,
            updated_at: currTime
          });
          await addDoc(subcollectionRef, {
            event_type: 'reserved',
            user_id: userId,
            timestamp: currTime
          });
          return { ...textbook, reserved: true };
        }
      } catch (e) {
        return { ...textbook, reserved: false };
      }
      return { ...textbook, reserved: false };
    })
  );

  const successfulTextbooks = reservedStatus.filter((textbook) => textbook.reserved);
  if (successfulTextbooks.length > 0) {
    await Promise.all([
      sendReservationConfirmationToReserver(userId, successfulTextbooks),
      sendReservationConfirmationToSeller(userId, successfulTextbooks) // userId is the buyerId, seller id is derived by textbook
    ]);
  }

  // Note that bought status is a list where each element is a textbook object and a bool relating to whether or not the textbook was bought
  return reservedStatus;
}

// Accept the reservation made by a buyer
export async function acceptBuyer(textbook) {
  const updatedTextbook = await getTextbookById(textbook.id);
  if (updatedTextbook.status !== EventStatus.RESERVED) {
    throw new Error('Textbook does not have appropriate status for action');
  }

  const subcollectionRef = collection(db, `textbooks/${textbook.id}/textbook_events`);
  const currTime = serverTimestamp();
  await updateDoc(doc(db, 'textbooks', textbook.id), {
    updated_at: currTime
  });
  await addDoc(subcollectionRef, {
    event_type: 'buyer_accepted',
    user_id: textbook.seller_id,
    timestamp: currTime
  });

  await sendSellerAcceptedReservationEmail(textbook)  
}

// Deny the reservation made by a buyer (have to null the buyer field)
export async function denyBuyer(textbook) {
  const updatedTextbook = await getTextbookById(textbook.id);
  if (updatedTextbook.status !== EventStatus.RESERVED) {
    throw new Error('Textbook does not have appropriate status for action');
  }
  const subcollectionRef = collection(db, `textbooks/${textbook.id}/textbook_events`);
  const currTime = serverTimestamp();
  await updateDoc(doc(db, 'textbooks', textbook.id), {
    buyer_id: null,
    updated_at: currTime
  });
  await addDoc(subcollectionRef, {
    event_type: 'buyer_denied',
    user_id: textbook.seller_id,
    timestamp: currTime
  });

  await sendSellerDeniedReservationEmail(textbook)
}

// Remove the listing from the inventory (nullify the buyer_id slot if applicable)
export async function listingRemove(textbook) {
  const updatedTextbook = await getTextbookById(textbook.id);
  if (updatedTextbook.status === EventStatus.REMOVED || updatedTextbook.status === EventStatus.SOLD) {
    throw new Error('Textbook does not have appropriate status for action');
  }
  const subcollectionRef = collection(db, `textbooks/${textbook.id}/textbook_events`);
  const currTime = serverTimestamp();
  await updateDoc(doc(db, 'textbooks', textbook.id), {
    buyer_id: null,
    updated_at: currTime
  });
  await addDoc(subcollectionRef, {
    event_type: 'listing_removed',
    user_id: textbook.seller_id,
    timestamp: currTime
  });
  
  // since we are grabbing the textbook again, the buyer id will only exist if the textbook has an ongoing reservation
  if (updatedTextbook.buyer_id) {
    await sendSellerDeniedReservationEmail(textbook)
  }

  await sendListingConfirmation(textbook.seller_id, textbook);
}

// Cancel the reservation
export async function sellerReservationCancel(textbook) {
  const updatedTextbook = await getTextbookById(textbook.id);
  if (updatedTextbook.status !== EventStatus.PENDING_CONFIRMATION) {
    throw new Error('Textbook does not have appropriate status for action');
  }
  const subcollectionRef = collection(db, `textbooks/${textbook.id}/textbook_events`);
  const currTime = serverTimestamp();
  await updateDoc(doc(db, 'textbooks', textbook.id), {
    buyer_id: null,
    updated_at: currTime
  });
  await addDoc(subcollectionRef, {
    event_type: 'reservation_canceled',
    user_id: textbook.seller_id,
    timestamp: currTime
  });

  await sendSellerDeniedReservationEmail(textbook)
}

// Seller confirms the reservation
export async function sellerConfirmTransaction(textbook) {
  const updatedTextbook = await getTextbookById(textbook.id);
  if (updatedTextbook.status !== EventStatus.PENDING_CONFIRMATION) {
    throw new Error('Textbook does not have appropriate status for action');
  }
  const subcollectionRef = collection(db, `textbooks/${textbook.id}/textbook_events`);
  const currTime = serverTimestamp();
  await updateDoc(doc(db, 'textbooks', textbook.id), {
    updated_at: currTime
  });
  await addDoc(subcollectionRef, {
    event_type: 'seller_confirmed_transaction',
    user_id: textbook.seller_id,
    timestamp: currTime
  });

  await Promise.all([
    sendCompletedTransactionConfirmation(textbook, textbook.seller_id),
    sendCompletedTransactionNotification(textbook, textbook.buyer_id)
  ])
}

// Cancel the reservation
export async function buyerReservationRequestCancel(textbook) {
  const updatedTextbook = await getTextbookById(textbook.id);
  if (updatedTextbook.status !== EventStatus.RESERVED) {
    throw new Error('Textbook does not have appropriate status for action');
  }
  const formerBuyer = textbook.buyer_id;
  const subcollectionRef = collection(db, `textbooks/${textbook.id}/textbook_events`);
  const currTime = serverTimestamp();
  await updateDoc(doc(db, 'textbooks', textbook.id), {
    buyer_id: null,
    updated_at: currTime
  });
  await addDoc(subcollectionRef, {
    event_type: 'reservation_canceled',
    user_id: formerBuyer,
    timestamp: currTime
  });

  await sendBuyerCanceledReservationEmail(textbook)
}

// Cancel the reservation
export async function buyerReservationCancel(textbook) {
  const updatedTextbook = await getTextbookById(textbook.id);
  if (updatedTextbook.status === EventStatus.REMOVED || updatedTextbook.status === EventStatus.SOLD) {
    throw new Error('Textbook does not have appropriate status for action');
  }
  const formerBuyer = textbook.buyer_id;
  const subcollectionRef = collection(db, `textbooks/${textbook.id}/textbook_events`);
  const currTime = serverTimestamp();
  await updateDoc(doc(db, 'textbooks', textbook.id), {
    buyer_id: null,
    updated_at: currTime
  });
  await addDoc(subcollectionRef, {
    event_type: 'reservation_canceled',
    user_id: formerBuyer,
    timestamp: currTime
  });

  await sendBuyerCanceledReservationEmail(textbook)
}

// Buyer confirms the reservation
export async function buyerConfirmTransaction(textbook) {
  const updatedTextbook = await getTextbookById(textbook.id);
  if (updatedTextbook.status !== EventStatus.PENDING_CONFIRMATION) {
    throw new Error('Textbook does not have appropriate status for action');
  }
  const subcollectionRef = collection(db, `textbooks/${textbook.id}/textbook_events`);
  const currTime = serverTimestamp();
  await updateDoc(doc(db, 'textbooks', textbook.id), {
    updated_at: currTime
  });
  await addDoc(subcollectionRef, {
    event_type: 'buyer_confirmed_transaction',
    user_id: textbook.buyer_id,
    timestamp: currTime
  });

  await Promise.all([
    sendCompletedTransactionConfirmation(textbook, textbook.buyer_id),
    sendCompletedTransactionNotification(textbook, textbook.seller_id)
  ])
}
