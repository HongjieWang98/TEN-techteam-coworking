import {
  collection,
  doc,
  getDoc,
  or,
  query,
  where,
  getDocs
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

  return Promise.all(textbooks.map(textbook => processStatus(textbook.ref, textbook.data())))
}

// we should handle any race conditions that comes with textbook events
// eg listing removal and reservation cancelled at the same time