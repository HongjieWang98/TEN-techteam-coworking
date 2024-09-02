# How to use

### Install firebase-tools globally first (just once)

```
npm install -g firebase-tools
```

### Login into firebase (also just once)

```
firebase login
```

### Start emulator

```
npm run serve-dev
```

### Start emulator in PROD (BE CAREFUL)

```
npm run serve-prod
```

### Now your firebase emulator is running and firebase functions can invoked

- `http://127.0.0.1:4000/logs?q=metadata.emulator.name%3D%22functions%22` - is where the emulator is running
- `http://127.0.0.1:5001` - is where the functions can be invoked

Double check the output of `npm run serve` to make sure of the ports

### Invoke a function

You can invoke a function by hitting its url

```
http://127.0.0.1:5001/[project_id]/[region]/[function_name]
```

## Usage w/ example curl:

> NOTE, there is a block of code in each onRequest function to only allow internal use. You will have to change the blockUsage boolean to false when locally running these functions

#### `addNewOrg`

```bash
curl -X POST http://127.0.0.1:5001/fir-testjuly8/us-central1/addNewOrg -H 'Content-Type: application/json' -d '{
  "name": "Test Organization",
  "domains": ["tufts.edu"],
  "exchange_location": "hello ave",
  "schedule": [null, null, null, null, null, null, {"start": "10:00", "end": "24:00"}]
}'
```

#### `updateOrgSchedule`

```bash
curl -X POST http://127.0.0.1:5001/fir-testjuly8/us-central1/updateOrgSchedule -H 'Content-Type: application/json' -d '{
"id": "cVWuLsnxCv2qLNHzI7pE",
"schedule": [{"start": "09:00", "end": "17:00"}, {"start": "00:00", "end": "24:00"}, null, null, null, null, {"start": "10:00", "end": "24:00"}]
}'
```

#### `sendEmail`

```javascript
const functions = getFunctions();
const sendEmail = httpsCallable(functions, 'sendEmail');
try {
  const response = await sendEmail({
    emailTo: 'kevinbae15@gmail.com',
    subject: 'wow',
    body: 'hello ave'
  });
  console.log(response);
} catch (e) {
  console.error(e);
}
```

`dryRun` is set to `false` by default. Set to `true` if you actually want to add an org.

### To deploy the function to prod

```
npm run prod-deploy
```

#Todo, add how to use the production version of function
