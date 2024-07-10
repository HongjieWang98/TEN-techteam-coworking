import {
  collection,
  doc,
  getDoc,
  or,
  query,
  addDoc,
  where,
  getDocs,
  serverTimestamp
} from 'firebase/firestore/lite';
import { db } from '../firebase/firebase_config';
import { processStatus } from './process_status';

export async function getTextbookById(id) {
  const textbookCollectionRef = collection(db, 'textbooks');
  const textbookDocRef = doc(textbookCollectionRef, id);
  const textbook = await getDoc(textbookDocRef);

  if (textbook.exists()) {
    return processStatus(textbookDocRef, textbook.data())
  }
  
  return null
}

export async function getTextbooksByUserId(userId) {
  const textbookCollectionRef = collection(db, 'textbooks');
  const q = query(textbookCollectionRef, or(where('seller_id', '==', userId), where('buyer_id', '==', userId)));
  const textbooks = (await getDocs(q)).docs

  return Promise.all(textbooks.map(textbook => {
    return {
      id: textbook.id,
      ...processStatus(textbook.ref, textbook.data())
    }
  }))
}

// we should handle any race conditions that comes with textbook events
// eg listing removal and reservation cancelled at the same time

export async function listTextbook(textbook) {
  const currTime = serverTimestamp();
  const docRef = await addDoc(collection(db, 'textbooks'), {
    ...textbook,
    created_at: currTime,
    updated_at: currTime,
    deleted_at: null
  });
  const subcollectionRef = collection(db, `textbooks/${docRef.id}/textbook_events`);
  await addDoc(subcollectionRef, {
    event_type: "listed",
    user_id: textbook.seller_id,
    timestamp: currTime
  });
}