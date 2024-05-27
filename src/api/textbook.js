import {
  collection,
  doc,
  getDoc,
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

export function getTextbooksByUserId(userId) {
  // TODO implement
  return []
}