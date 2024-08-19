import { initializeApp } from 'firebase-admin/app';

initializeApp();

export { addNewOrg } from './src/addNewOrg.js';
export { updateOrgSchedule } from './src/updateOrgSchedule.js';
export { sendEmail } from './src/sendEmail.js';