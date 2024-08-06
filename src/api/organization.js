import { collection, query, where, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase/firebase_config';

// export async function getOrganizations() {
//   const organizationCollectionRef = collection(db, 'organizations');
//   const q = query(organizationCollectionRef, where('deleted_at', '==', null));
//   const organizations = (await getDocs(q)).docs;
//   const organizations_domainName = organizations.data().domains;

//   return Promise.all(
//     organizations.map((org) => {
//       return {
//         id: org.id,
//         ...org.data()
//       };
//     })
//   );
// }


export async function getOrganizations() {
  const organizationCollectionRef = collection(db, 'organizations');
  const q = query(organizationCollectionRef, where('deleted_at', '==', null));
  const organizationDocs = await getDocs(q);
  
  const organizations = organizationDocs.docs.map((doc) => {
    const data = doc.data();
    const domainName = data.domains;
    return {
      id: doc.id,
      domainName,
      ...data
    };
  });

  return organizations;
}