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
import { processTextbook } from './process_textbook';

export async function getTextbookById(id) {
  const textbookCollectionRef = collection(db, 'textbooks');
  const textbookDocRef = doc(textbookCollectionRef, id);
  const textbook = await getDoc(textbookDocRef);

  if (textbook.exists()) {
    return {
      id: textbook.id,
      ...(await processTextbook(textbookDocRef, textbook.data()))
    };
  }

  return null;
}

export async function getTextbooksByUserId(userId) {
  const textbookCollectionRef = collection(db, 'textbooks');
  const q = query(textbookCollectionRef, or(where('seller_id', '==', userId), where('buyer_id', '==', userId)));
  const textbooks = (await getDocs(q)).docs;

  return Promise.all(
    textbooks.map(async (textbook) => {
      return {
        id: textbook.id,
        ...(await processTextbook(textbook.ref, textbook.data()))
      };
    })
  );
}

export async function getTextbooksByOrganizationId(organizationId) {
  // TODO put some caching here
  const textbookCollectionRef = collection(db, 'textbooks');
  const q = query(textbookCollectionRef, where('organization_id', '==', organizationId));
  const textbooks = (await getDocs(q)).docs;

  return Promise.all(textbooks.map(async (textbook) => getTextbookById(textbook.id)));
}

// we should handle any race conditions that comes with textbook events
// eg listing removal and reservation cancelled at the same time

export async function listTextbook(textbook, userId) {
  const currTime = serverTimestamp();
  const docRef = await addDoc(collection(db, 'textbooks'), {
    ...textbook,
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
        if (currTextbook != null && currTextbook.status === 'active') {
          const textbookCollectionRef = collection(db, 'textbooks');
          await updateDoc(doc(textbookCollectionRef, textbook.id), { buyer_id: userId });
          const subcollectionRef = collection(db, `textbooks/${textbook.id}/textbook_events`);
          const currTime = serverTimestamp();
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
