import { onCall } from 'firebase-functions/v2/https';
import { config } from 'dotenv';
config();

const devCorsConfig = [/localhost/, /textbookexchangenetwork\.com$/];

export const testFunction = onCall({ cors: devCorsConfig }, async (_req) => {
  return { result: "Test function called" };
});