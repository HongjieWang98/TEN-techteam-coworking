import { PreferredContactInfoEnum } from "../user";
import { getAcceptedPaymentMethods } from "./utils";

export function sellerAcceptedTemplate(textbook, seller, sellerPreferredContactEmail) {
  const acceptedPaymentMethods = getAcceptedPaymentMethods(seller.payment_method).join(', ');

  return `Hello!

The seller of the textbook ${textbook.title} for ${textbook.department} ${textbook.course_number} for ${textbook.price} has accepted your request to buy their textbook! They will be reaching out to you shortly. Please be sure to confirm the transaction has been completed on your TEN account after you buy the textbook.

Seller's information:
- Email: ${sellerPreferredContactEmail}
${seller.preferred_contact_info === PreferredContactInfoEnum.PHONE_NUMBER && seller.contact_info.phone_number ? `- Phone Number: ${seller.contact_info.phone_number}\n` : '' /* Super jank but it prevents a random newline if no phone number */}- Preferred Contact Method: ${seller.preferred_contact_info}
- Payment Methods Accepted: ${acceptedPaymentMethods}

If you have any questions, please respond to this email!

Best,
The TEN Team`;
}

export function sellerDeniedTemplate(textbook) {
  return `Hello!

The transaction for ${textbook.title} for ${textbook.department} ${textbook.course_number} for ${textbook.price} has been canceled by the other party. If you would like to buy another textbook instead, please return to the TEN website and reserve another textbook.

If you have any questions, please respond to this email!

Best,
The TEN Team`;
}

export function buyerCanceledTemplate(textbook) {
  return `Hello!

The transaction for ${textbook.title} for ${textbook.department} ${textbook.course_number} for ${textbook.price} has been canceled by the other party and the textbook will automatically be relisted for sale.

If you have any questions, please respond to this email!

Best,
The TEN Team`;
}