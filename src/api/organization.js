import { collection, query, where, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase/firebase_config';

export async function getOrganizations() {
  const organizationCollectionRef = collection(db, 'organizations');
  const q = query(organizationCollectionRef, where('deleted_at', '==', null));
  const organizations = (await getDocs(q)).docs;

  return Promise.all(
    organizations.map((org) => {
      return {
        id: org.id,
        ...org.data()
      };
    })
  );
}
