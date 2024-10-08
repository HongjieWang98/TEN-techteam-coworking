import { collection, query, where, getDoc, getDocs, doc } from 'firebase/firestore/lite';
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

export async function getVirtualOrganizations() {
  const allOrganizations = await getOrganizations();

  return allOrganizations.filter((organization) => organization.isVirtual);

}

export async function getOrganizationById(id) {
  const organizationCollectionRef = collection(db, 'organizations');
  const organizationDocRef = doc(organizationCollectionRef, id);
  const organization = await getDoc(organizationDocRef);
  if (!organization.exists()) {
    throw new Error('Organization not found');
  }

  return {
    id: organization.id,
    isVirtual: organization.data().schedule?.some((day) => day !== null) ?? false,
    ...organization.data()
  };
}

export async function getExchangeLocationAndSchedule(organizationId) {
  // Create a reference to the specific document using the organization ID
  const organizationDocRef = doc(db, 'organizations', organizationId);

  // Retrieve the document snapshot
  const organizationDoc = await getDoc(organizationDocRef);

  if (organizationDoc.exists()) {
    // Extract the data from the document
    const data = organizationDoc.data();

    // Return the specific fields
    return {
      exchange_location: data.exchange_location || '',
      schedule:
        data.schedule?.map((day) =>
          day
            ? {
                start: day.start || '',
                end: day.end || ''
              }
            : { start: '', end: '' }
        ) || []
    };
  } else {
    // Handle the case where the document doesn't exist
    throw new Error(`No organization found with ID: ${organizationId}`);
  }
}
