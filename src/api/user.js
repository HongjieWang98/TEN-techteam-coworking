import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp
} from 'firebase/firestore/lite';
import { db } from '../firebase/firebase_config';

export async function validateUser(
  schoolEmail,
  school,
  preferredContact,
  secondaryEmail,
  phone,
  paymentMethod,
  venmo
) {
  if (schoolEmail === '') {
    throw new Error('School email is required');
  }

  // TODO need to validate the domain is correct

  if (school === '') {
    throw new Error('School name is required');
  }
  if (preferredContact === '') {
    throw new Error('Preferred contact is required');
  }
  if (phone === '') {
    throw new Error('Phone number is required');
  }
  if (paymentMethod.cash === false && paymentMethod.venmo === false) {
    throw new Error('Payment method is required');
  }
  if (paymentMethod.venmo === true && venmo === '') {
    throw new Error('Venmo username is required');
  }

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

/**
 * Expects all fields to be validated before calling this function
 */
export async function postUser(
  schoolEmail,
  school,
  preferredContact,
  secondaryEmail,
  phone,
  paymentMethod,
  venmo
) {
  try {
    // Get the current date/time
    const currTime = serverTimestamp();
    const newUser = await addDoc(collection(db, 'users'), {
      schoolEmail,
      school,
      preferredContact,
      secondaryEmail,
      phone,
      paymentMethod,
      venmo,
      created_at: currTime,
      updated_at: currTime
    });
    return newUser;
  } catch (e) {
    throw new Error('Account creation failed');
  }
}
