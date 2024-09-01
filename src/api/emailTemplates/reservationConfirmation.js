// commenting out 

import { PreferredContactInfoEnum } from "../user";
import { getAcceptedPaymentMethods } from "./utils";

// Remember, exchanges must occur at ${location} between the hours of ${time}.
export function reservationConfirmationForReserverTemplate(textbooks, organization) {
  return `Hello!

You have submitted a request to reserve the following textbooks:

${(textbooks.map((textbook) => {
  return `\tTitle: ${textbook.title}, Course: ${textbook.courseAndDpmt}, Price: ${textbook.price}`;
})).join('\n')};

We have notified the relevant sellers! If they accept you, we will share your contact information with them to set up an exchange. If they deny you, please find a new textbook to reserve! If the seller does not respond within 1 week, the reservation will be canceled and you will be able to request to reserve a new textbook.

${organization ? `Remember, exchanges must occur at: ${organization.exchange_location} at the following times:\n\n${formatSchedule(organization.schedule)}.` : ''}

Please respond to this email if you have any questions!

Best,
The TEN Team`;
}

export function reservationConfirmationForSellerTemplate(textbook, buyer, buyerPreferredContactEmail, organization) {
  const baseUrl = process.env.REACT_APP_NODE_ENV === "production" ? "https://app.textbookexchangenetwork.com" : "https://dev-app.textbookexchangenetwork.com";
  const acceptRejectLink = baseUrl + "/listing/" + textbook.id;
  return `Hello!

Someone is interested in buying your textbook ${textbook.title} for ${textbook.department} ${textbook.course_number} for ${textbook.price}. The buyer's contact information is below. If you are interested in continuing with this exchange, please navigate to the below link and "Accept" the buyer. You will have one week from the sent date of this email to either Accept or Deny the buyer. If no action is taken, the buyer will automatically be denied and your textbook will be put back up for sale.

If you accept the buyer, you are allowing TEN to share your contact information with the buyer. You will also be responsible for reaching out to the buyer and coordinating a time to exchange the textbook and receive the payment. ${organization ? `Exchanges must occur at: ${organization.exchange_location} at the following times:\n\n${formatSchedule(organization.schedule)}.` : ''}

Please confirm on the payment method used in advance and make the payment in person during the exchange. If you are doing an electronic payment, you must exchange handles with the seller.

${acceptRejectLink}

If you accept the buyer, please reach out via the following information:
- Email: ${buyerPreferredContactEmail}
${buyer.preferred_contact_info === PreferredContactInfoEnum.PHONE_NUMBER && buyer.contact_info.phone_number ? `- Phone Number: ${buyer.contact_info.phone_number}\n` : '' /* Super jank but it prevents a random newline if no phone number */}- Preferred Contact Method: ${buyer.preferred_contact_info}
- Payment Methods Accepted: ${getAcceptedPaymentMethods(buyer.payment_method).join(', ')}

If you have any questions, please respond to this email!

Best,
The TEN Team`;
}

function convertToAmPm(time) {
  const [hour, minute] = time.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const adjustedHour = hour % 12 || 12;
  return `${adjustedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
}

function formatSchedule(schedule) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return schedule.flatMap((day, index) => {
    if (day) {
      const start = convertToAmPm(day.start);
      const end = convertToAmPm(day.end);
      return [`${daysOfWeek[index]}: ${start} - ${end}`];
    }

    return [];
  }).join('\n');
}