import { onRequest } from 'firebase-functions/v2/https';
import {createTransport} from 'nodemailer';
import { respondWithErrorMessage, validateEmail } from './utils.js';
import { config } from 'dotenv';
config();

const SENDING_EMAIL_ADDRESS = "textbookexchangenetwork@gmail.com"

export const sendEmail = onRequest(async (req, res) => {
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
    return respondWithErrorMessage(res, "Could not setup email transport");
  }

  const emailData = req.body;
  const { emailTo, subject, body, dryRun = true } = emailData;

  const mailOptions = {
    from: SENDING_EMAIL_ADDRESS,
    to: emailTo,
    subject: subject,
    text: body,
  };

  if (!validateEmail(emailTo)) {
    return respondWithErrorMessage(res, "emailTo is not a valid email");
  }

  if (!dryRun) {
    try {
      transporter.sendMail(mailOptions, (error, _info) => {
        if (error) {
          respondWithErrorMessage(res, `Could not send email: ${error.message}`);
        } else {
          res.json({ result: "Email sent successfully" });
        }
      });
    } catch (e) {
      return respondWithErrorMessage(res, `Error while trying to send email: ${e.message}`);
    }
  } else {
    return res.json({
      result:
        "Data passed validation. Email not sent as dryRun was enabled. Set 'dryRun: false' if you want to send email."
    });
  }
});