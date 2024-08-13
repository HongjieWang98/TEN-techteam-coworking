import { collection, query, where, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase/firebase_config';

export async function getOrganizations() {
  const organizationCollectionRef = collection(db, 'organizations');
  const q = query(organizationCollectionRef, where('deleted_at', '==', null));
  const organizations = (await getDocs(q)).docs;
  //const organizations_domainName = organizations.data().domains;

  return Promise.all(
    organizations.map((org) => {
      return {
        id: org.id,
        isVirtual: org.data().schedule?.some((day) => day !== null) ?? false,
        ...org.data()
      };
    })
  );
}
