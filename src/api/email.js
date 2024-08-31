import { getFunctions, httpsCallable } from 'firebase/functions';
import { listingConfirmationTemplate } from './emailTemplates/listingConfirmation';
import { getPreferredEmailContactInfoByUserId } from './user';

async function sendEmail(emailTo, subject, body) {
  const dryRun = process.env.NODE_ENV === 'development';
  const functions = getFunctions();
  const sendEmailFirebaseFunction = httpsCallable(functions, 'sendEmail');
  try {
    const response = await sendEmailFirebaseFunction({
      emailTo,
      subject,
      body,
      dryRun
    });

    // TODO remove after testing this in prod
    console.log(response);
  } catch (e) {
    console.error(e);
  }
}

export async function sendListingConfirmation(userId, title, department, courseNumber) {
  const listerEmail = await getPreferredEmailContactInfoByUserId(userId);
  await sendEmail(
    listerEmail,
    'You have listed your textbook!',
    listingConfirmationTemplate(title, department, courseNumber)
  );
}

