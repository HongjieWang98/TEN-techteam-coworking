export function confirmedTransactionTemplate(textbook) {
  return `Hello!
  
  You have marked the transaction for ${textbook.title} for ${textbook.department} ${textbook.course_number} as confirmed.
  
  Please respond to this email if you have any questions!
  
  Best,
  The TEN Team`;
}

export function completedTransactionNotificationTemplate(textbook) {
  return `Hello!
  
  The transaction for ${textbook.title} for ${textbook.department} ${textbook.course_number} has been marked as complete by the other party.
  
  If this is wrong or you have any questions, please respond to this email!
  
  Best,
  The TEN Team`;
}