import { HttpsError, onRequest } from 'firebase-functions/v2/https';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { militaryTimePattern, respondWithErrorMessage } from './utils.js';

const devCorsConfig = [/localhost/, /textbookexchangenetwork\.com$/];

export const updateOrgSchedule = onRequest({ cors: devCorsConfig }, async (req, res) => {
  // to prevent anyone from invoking our function
  // TODO: ideally we convert this to an onCall function and only allow authenticated users to invoke this
  const blockUsage = true;
  if (blockUsage) {
    throw new HttpsError(
      'For interal use only'
    )
  }
  const orgData = req.body;
  console.log('Received request to update org: ' + JSON.stringify(orgData));

  // first validate the object and make sure no extraneous fields are added
  for (const key in orgData) {
    if (!['id', 'schedule', 'dryRun'].includes(key)) {
      return respondWithErrorMessage(res, `extraneous field defined in body: ${key}`);
    }
  }

  const { id, schedule, dryRun = true } = orgData;

  if (schedule !== undefined) {
    if (!Array.isArray(schedule) || schedule.length !== 7) {
      return respondWithErrorMessage(res, 'schedule is not valid');
    }

    schedule.forEach((scheduleForDay) => {
      if (scheduleForDay !== null) {
        if (!scheduleForDay.hasOwnProperty('start') || !scheduleForDay.hasOwnProperty('end')) {
          return respondWithErrorMessage(res, 'schedule is missing start/end');
        }

        if (!militaryTimePattern.test(scheduleForDay.start) || !militaryTimePattern.test(scheduleForDay.end)) {
          return respondWithErrorMessage(res, 'one of the starts/ends are not in valid military time format');
        }
      }
    });
  }

  // add the fields to the new document
  try {
    if (dryRun === false) {
        await getFirestore()
          .collection('organizations')
          .doc(id)
          .update({
            schedule: schedule,
            updated_at: Timestamp.now()
          });

      return res.json({ result: `Updated the org.` });
    }

    return res.json({
      result:
        "Data passed validation. No data upserted to db as dryRun was enabled. Set 'dryRun: false' if you want to upsert data."
    });
  } catch (e) {
    return respondWithErrorMessage(res, `Error while updating org schedule: ${e.message}`);
  }
});
