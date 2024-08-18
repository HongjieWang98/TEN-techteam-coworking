import { onRequest } from 'firebase-functions/v2/https';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';


const militaryTimePattern = /^([01]\d|2[0-3]):([0-5]\d)|24:00$/;

export const updateOrgSchedule = onRequest(async (req, res) => {
  const respondWithErrorMessage = (errorMessage) => {
    return res.json({
      result: 'error',
      message: errorMessage
    });
  };
  const orgData = req.body;
  console.log('Received request to update org: ' + JSON.stringify(orgData));

  // first validate the object and make sure no extraneous fields are added
  for (const key in orgData) {
    if (!['id', 'schedule', 'dryRun'].includes(key)) {
      return respondWithErrorMessage(`extraneous field defined in body: ${key}`);
    }
  }

  const { id, schedule, dryRun = true } = orgData;

  if (schedule !== undefined) {
    if (!Array.isArray(schedule) || schedule.length !== 7) {
      return respondWithErrorMessage('schedule is not valid');
    }

    schedule.forEach((scheduleForDay) => {
      if (scheduleForDay !== null) {
        if (!scheduleForDay.hasOwnProperty('start') || !scheduleForDay.hasOwnProperty('end')) {
          return respondWithErrorMessage('schedule is missing start/end');
        }

        if (!militaryTimePattern.test(scheduleForDay.start) || !militaryTimePattern.test(scheduleForDay.end)) {
          return respondWithErrorMessage('one of the starts/ends are not in valid military time format');
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
        "Data passed validation. No data inserted to db as dryRun was enabled. Set 'dryRun: false' if you want to insert data."
    });
  } catch (e) {
    return respondWithErrorMessage(`Error while adding new org data: ${e.message}`);
  }
});
