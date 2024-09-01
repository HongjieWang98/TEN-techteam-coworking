export function listingRemovedConfirmationTemplate(textbook) {
  return `Hello!

Your textbook ${textbook.title} for ${textbook.department} ${textbook.course_number} for ${textbook.price} has been removed so students will no longer be able to purchase. If you would like to re-list the textbook at any point, please create a new listing for the textbook.

If you have any questions, please respond to this email!

Best,
The TEN Team`;
}