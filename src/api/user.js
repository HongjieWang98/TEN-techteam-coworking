import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore/lite';
import { db } from '../firebase/firebase_config';

export async function checkDuplicateUserBySchoolEmail(schoolEmail) {
  const userRef = collection(db, 'users');
  const q = query(userRef, where('schoolEmail', '==', schoolEmail));

  // Execute the query
  const duplicateUsers = await getDocs(q);
  if (duplicateUsers == null) {
    throw new Error('Duplicate checking failed');
  }

  // Check if any documents are returned
  if (!duplicateUsers.empty) {
    // Document with the same email already exists
    throw new Error('An account with this email already exists.');
  }
}

export async function validateUser(userAccount) {
  // Check if the user already exists
  const schoolEmail = userAccount.contact_info.school_email;
  await checkDuplicateUserBySchoolEmail(schoolEmail);

  // TODO Validate the rest of the fields
}

/**
 * Expects all fields to be validated before calling this function
 * The id passed in is the user's Firebase Auth ID
 */
export async function postUser(id, user) {
  try {
    // Get the current date/time
    const currTime = serverTimestamp();
    const docRef = doc(db, 'users', id);
    // Set the document with the provided data
    const newUser = await setDoc(docRef, {
      ...user,
      created_at: currTime,
      updated_at: currTime,
      deleted_at: null
    });

    return newUser;
  } catch (e) {
    throw new Error('Account creation failed');
  }
}
