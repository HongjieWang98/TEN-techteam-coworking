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
  console.log('Hello');
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
    console.log(e);
    // throw new Error('Issue in creating account');
    return null;
  }
}
