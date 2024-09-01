export function getAcceptedPaymentMethods(paymentMethods) {
  return Object.entries(paymentMethods)
    .filter(([_method, isAccepted]) => isAccepted)
    .map(([method]) => method);
}