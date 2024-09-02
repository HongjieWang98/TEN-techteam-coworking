import { onCall } from 'firebase-functions/v2/https';
import { config } from 'dotenv';
config();

const devCorsConfig = [/localhost/, /textbookexchangenetwork\.com$/];

export const testFunction = onCall({ cors: devCorsConfig }, async (_req) => {
  // to prevent anyone from invoking our function
  // TODO: ideally we convert this to an onCall function and only allow authenticated users to invoke this
  const blockUsage = true;
  if (blockUsage) {
    throw new HttpsError(
      'For interal use only'
    )
  }
  
  return { result: "Test function called" };
});