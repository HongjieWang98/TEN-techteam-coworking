import { onCall, HttpsError } from 'firebase-functions/v2/https';
import {createTransport} from 'nodemailer';
import { validateEmail } from './utils.js';
import { config } from 'dotenv';
config();

const SENDING_EMAIL_NAME = "TEN";
const SENDING_EMAIL_ADDRESS = "textbookexchangenetwork@gmail.com";
const devCorsConfig = [/localhost/, /textbookexchangenetwork\.com$/];
// we should eventually utilize different env vars when deploying to handle different env files
// https://firebase.google.com/docs/functions/config-env?gen=2nd#deploying_multiple_sets_of_environment_variables
// const prodCorsConfig = [/textbookexchangenetwork\.com$/];
// const cors = process.env.FIREBASE_ENV === 'production' ? prodCorsConfig : devCorsConfig;

// eventually we will want to use onCall instead of onRequest to authorize the user
export const sendEmail = onCall({ cors: devCorsConfig }, async (req) => {
  if (!request.auth?.uid) {
    throw new HttpsError(
      'unauthenticated',
      'The function must be called while authenticated.'
    )
  }

  let transporter
  try {
    transporter = createTransport({
      service: "gmail",
      auth: {
        user: SENDING_EMAIL_ADDRESS,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });
  } catch (e) {
    return {
      result: 'error',
      message: "Could not setup email transport"
    }
  }

  const emailData = req.data;
  const { emailTo, subject, body, dryRun = true } = emailData;

  const mailOptions = {
    from: {
      name: SENDING_EMAIL_NAME,
      address: SENDING_EMAIL_ADDRESS,
    },
    to: emailTo,
    subject: subject,
    text: body,
  };

  if (!validateEmail(emailTo)) {
    return {
      result: 'error',
      message: "emailTo is not a valid email"
    }
  }

  if (!dryRun) {
    try {
      let sendEmailError = null;
      transporter.sendMail(mailOptions, (error, _info) => {
        if (error) {
          sendEmailError = error;
        }
      });
      if (sendEmailError) {
        return {
          result: 'error',
          message: `Could not send email: ${sendEmailError.message}`
        };
      } else {
        return { result: 'success', message: "Email sent successfully" };
      }
    } catch (e) {
      return {
        result: 'error',
        message: `Error while trying to send email: ${e.message}`
      }
    }
  } else {
    return {
      result: 'success',
      message: "Data passed validation. Email not sent as dryRun was enabled. Set 'dryRun: false' if you want to send email."
    };
  }
});