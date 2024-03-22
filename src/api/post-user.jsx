import { collection, addDoc } from 'firebase/firestore/lite';
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
  // @todo Error check for duplicate schoolEmail
  try {
    const newCustomer = await addDoc(collection(db, 'customers'), {
      schoolEmail,
      password,
      school,
      preferredContact,
      secondaryEmail,
      phone,
      paymentMethod,
      venmo
    });
    return newCustomer;
  } catch (e) {
    throw new Error('Issue in creating account');
  }
}
