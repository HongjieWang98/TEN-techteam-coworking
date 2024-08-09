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
        return await processTextbook(textbook.ref, textbook.data());
      })
    )
  ).filter((textbook) => textbook.seller_id === userId || textbook.buyer_id === userId);
}

export async function getTextbooksByOrganizationId(organizationId, includeSellerBuyerSubmodel = false) {
  // TODO put some caching here
  const textbookCollectionRef = collection(db, 'textbooks');
  const q = query(textbookCollectionRef, where('orgazation_id', '==', organizationId));
  const textbooks = (await getDocs(q)).docs;

  return Promise.all(
    textbooks.map(async (textbook) => {
      return await processTextbook(textbook.ref, textbook.data(), includeSellerBuyerSubmodel);
    })
  );
}

// we should handle any race conditions that comes with textbook events
// eg listing removal and reservation cancelled at the same time

export async function listTextbook(textbook, userId) {
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
}

// Takes in an array of textbook, returns a list of true or false (relating to whether or not the textbook was bought)
// Additionally takes in a userId for the user that wants to reserve these textbooks
export async function reserveTextbooks(textbooks, userId) {
  const boughtStatus = await Promise.all(
    textbooks.map(async (textbook) => {
      try {
        const currTextbook = await getTextbookById(textbook.id);
        if (currTextbook != null && currTextbook.status === EventStatus.ACTIVE) {
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
          return { ...textbook, bought: true };
        }
      } catch (e) {
        return { ...textbook, bought: false };
      }
      return { ...textbook, bought: false };
    })
  );
  // Note that bought status is a list where each element is a textbook object and a bool relating to whether or not the textbook was bought
  return boughtStatus;
}
