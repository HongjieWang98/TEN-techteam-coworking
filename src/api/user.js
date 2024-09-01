import { collection, query, where, getDocs, getDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore/lite';
import { db } from '../firebase/firebase_config';
import { getOrganizationById } from './organization';

export const PreferredContactInfoEnum = {
  SCHOOL_EMAIL: 'school_email',
  SECONDARY_EMAIL: 'secondary_email',
  PHONE_NUMBER: 'phone_number'
}

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

export async function validateEmailDomain(schoolEmail, schoolId) {
  const regex = /@([^@]+)$/;
  const match = schoolEmail.match(regex);

  if (!match) {
    throw new Error('No domain found');
  }

  const extractedDomain = match[1];

  const university = await getOrganizationById(schoolId);
  const { domains } = university;

  if (!domains[extractedDomain]) {
    throw new Error('Invalid email domain, use a valid school email.');
  }
}

export async function validateUser(userAccount) {
  // Check if the user already exists
  const schoolEmail = userAccount.contact_info.school_email;
  const universityId = userAccount.organization_id;

  await checkDuplicateUserBySchoolEmail(schoolEmail);
  await validateEmailDomain(schoolEmail, universityId);

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

export async function getUserById(id) {
  const userCollectionRef = collection(db, 'users');
  const userDocRef = doc(userCollectionRef, id);
  const user = await getDoc(userDocRef);
  if (!user.exists()) {
    throw new Error('User not found');
  }

  return {
    id: user.id,
    ...user.data()
  };
}

export async function getSchoolEmailByUserId(id) {
  const user = await getUserById(id);
  return user.contact_info.school_email;
}

// This function returns the preferred email contact info for a user
// If the user has phone number as their preferred contact info, we default to school email
export async function getPreferredEmailContactInfoByUserId(id) {
  const user = await getUserById(id);

  return getPreferredEmailContactInfoByUser(user)
}

export function getPreferredEmailContactInfoByUser(user) {
  switch (user.contact_info.preferred_contact_info) {
    case PreferredContactInfoEnum.SCHOOL_EMAIL:
      return user.contact_info.school_email;
    case PreferredContactInfoEnum.SECONDARY_EMAIL:
      return user.contact_info.secondary_email;
    case PreferredContactInfoEnum.PHONE_NUMBER:
      // we do not have sms capabilities yet
      return user.contact_info.school_email;
    default:
      // if something is messed up with our data, just default to school email
      return user.contact_info.school_email;
  }
}
