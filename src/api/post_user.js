import { collection, query, where, getDocs, addDoc } from 'firebase/firestore/lite';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { db } from '../firebase/firebase_config';

export default async function postCustomer(
  schoolEmail,
  password,
  school,
  preferredContact,
  secondaryEmail,
  phone,
  paymentMethod,
  venmo
) {
  // sburchfield33 - think its appropiate for errors to be sent to the caller
  // for their handling the try and catch is below is only here to prevent
  // sensitive errors from getting it

  // Duplicate checking for accounts with the same schoolEmail
  const customersRef = collection(db, 'customers');
  const q = query(customersRef, where('schoolEmail', '==', schoolEmail));

  // Execute the query
  const duplicateAccounts = await getDocs(q);
  if (duplicateAccounts == null) {
    throw new Error('Duplicate checking failed');
  }

  // Check if any documents are returned
  if (!duplicateAccounts.empty) {
    // Document with the same email already exists
    throw new Error('An account with this email already exists.');
  }

  try {
    // Get the current date/time
    const newDate = new Date();
    const currTime = newDate.getTime();
    const newCustomer = await addDoc(collection(db, 'customers'), {
      schoolEmail,
      password,
      school,
      preferredContact,
      secondaryEmail,
      phone,
      paymentMethod,
      venmo,
      created_at: currTime,
      updated_at: currTime
    });
    return newCustomer;
  } catch (e) {
    throw new Error('Account creation failed');
  }
}
