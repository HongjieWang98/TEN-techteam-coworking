import { onRequest } from 'firebase-functions/v2/https';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { respondWithErrorMessage } from './utils.js';

const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
const militaryTimePattern = /^([01]\d|2[0-3]):([0-5]\d)|24:00$/;

export const addNewOrg = onRequest(async (req, res) => {
  const newOrgData = req.body;
  console.log('Received request for new org: ' + JSON.stringify(newOrgData));

  // first validate the object and make sure no extraneous fields are added
  for (const key in newOrgData) {
    if (!['domains', 'exchange_location', 'name', 'schedule', 'dryRun'].includes(key)) {
      return respondWithErrorMessage(res, `extraneous field defined in body: ${key}`);
    }
  }

  const { domains, exchange_location, name, schedule, dryRun = true } = newOrgData;

  // now validate the fields
  if (!name || name.trim() === '') {
    return respondWithErrorMessage(res, 'name is empty');
  }

  if (!exchange_location || exchange_location.trim() === '') {
    return respondWithErrorMessage(res, 'exchange_location is empty');
  }

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

  if (schedule.some((day) => day)) {
    if (!domains || !Array.isArray(domains) || domains.length === 0) {
      return respondWithErrorMessage(res, 'domains must be defined, be of type array, and have at least one domain within it');
    }
  
    domains.forEach((domain) => {
      if (!domainPattern.test(domain)) {
        return respondWithErrorMessage(res, `domain ${domain} is not valid`);
      }
    });
  }

  // add the fields to the new document
  try {
    if (dryRun === false) {
      const newOrg = await getFirestore()
        .collection('organizations')
        .add({
          ...newOrgData,
          created_at: Timestamp.now(),
          updated_at: Timestamp.now(),
          deleted_at: null
        });

      return res.json({ result: `New org with ID: ${newOrg.id} added.` });
    }

    return res.json({
      result:
        "Data passed validation. No data upserted to db as dryRun was enabled. Set 'dryRun: false' if you want to upsert data."
    });
  } catch (e) {
    return respondWithErrorMessage(res, `Error while adding new org data: ${e.message}`);
  }
});
