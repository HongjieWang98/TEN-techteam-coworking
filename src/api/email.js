import { getFunctions, httpsCallable } from 'firebase/functions';
import { listingConfirmationTemplate } from './emailTemplates/listingConfirmation';
import { reservationConfirmationForReserverTemplate, reservationConfirmationForSellerTemplate } from './emailTemplates/reservationConfirmation';
import { getPreferredEmailContactInfoByUser, getPreferredEmailContactInfoByUserId, getUserById } from './user';
import { getOrganizationById } from './organization';

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

export async function sendListingConfirmation(userId, textbook) {
  const listerEmail = await getPreferredEmailContactInfoByUserId(userId);
  await sendEmail(
    listerEmail,
    'You have listed your textbook!',
    listingConfirmationTemplate(textbook.title, textbook.department, textbook.course_number)
  );
}

export async function sendReservationConfirmationToReserver(userId, textbooks) {
  if (textbooks.length === 0) {
    return;
  }

  const [listerEmail, org] = await Promise.all([
    getPreferredEmailContactInfoByUserId(userId),
    getOrganizationById(textbooks[0].organization_id)
  ]);

  await sendEmail(
    listerEmail,
    "Your have submitted a request for a textbook!",
    reservationConfirmationForReserverTemplate(textbooks, org)
  );
}

export async function sendReservationConfirmationToSeller(buyerId, textbooks) {
  Promise.all(textbooks.map(async (textbook) => {
    const [sellerEmail, buyer, org] = await Promise.all([
      getPreferredEmailContactInfoByUserId(textbook.seller_id),
      getUserById(buyerId),
      getOrganizationById(textbook.organization_id)
    ]);
    
    await sendEmail(
      sellerEmail,
      "Your textbook has been reserved!",
      reservationConfirmationForSellerTemplate(textbook, buyer, getPreferredEmailContactInfoByUser(buyer), org)
    );
  }));
}