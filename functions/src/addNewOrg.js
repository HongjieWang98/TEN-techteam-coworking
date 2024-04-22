import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();


const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
const militaryTimePattern = /^([01]\d|2[0-3]):([0-5]\d)|24:00$/;

export const addNewOrg = onRequest(async (req, res) => {
  const respondWithErrorMessage = (errorMessage) => {
    return res.json({
      result: "error",
      message: errorMessage
    })
  }
  const newOrgData = req.body;
  console.log("Received request for new org: " + JSON.stringify(newOrgData));

  // first validate the object and make sure no extraneous fields are added
  for (const key in newOrgData) {
    if (!["domains", "exchange_location", "name", "schedule", "dryRun"].includes(key)) {
      return respondWithErrorMessage(`extraneous field defined in body: ${key}`)
    }
  }

  const {
    domains,
    exchange_location,
    name,
    schedule,
    dryRun = true
  } = newOrgData;

  // now validate the fields
  if (!name || name.trim() === "") {
    return respondWithErrorMessage("name is empty")
  }

  if (!exchange_location || exchange_location.trim() === "") {
    return respondWithErrorMessage("exchange_location is empty")
  }

  if (!domains || !Array.isArray(domains) || domains.length === 0) {
    return respondWithErrorMessage("domains must be defined, be of type array, and have at least one domain within it")
  }

  domains.forEach(domain => {
    if (!domainPattern.test(domain)) {
      return respondWithErrorMessage(`domain ${domain} is not valid`)
    }
  });

  if (schedule !== undefined) {
    if (!Array.isArray(schedule) || schedule.length !== 7) {
      return respondWithErrorMessage("schedule is not valid")
    }

    schedule.forEach(scheduleForDay => {
      if (scheduleForDay !== null) {
        if (!scheduleForDay.hasOwnProperty('start') || !scheduleForDay.hasOwnProperty('end')) {
          return respondWithErrorMessage("schedule is missing start/end")
        }

        if (!militaryTimePattern.test(scheduleForDay.start) || !militaryTimePattern.test(scheduleForDay.end)) {
          return respondWithErrorMessage("one of the starts/ends are not in valid military time format")
        }
      }
    })
  }

  // add the fields to the new document
  try {
    if (dryRun === false) {
      const newOrg = await getFirestore()
      .collection("organizations")
      .add({
        ...newOrgData
      });

      return res.json({result: `New org with ID: ${newOrg.id} added.`});
    }

    return res.json({result: "Data passed validation. No data inserted to db as dryRun was enabled. Set 'dryRun: false' if you want to insert data."})
  } catch (e) {
    return respondWithErrorMessage(`Error while adding new org data: ${e.message}`)
  }
});