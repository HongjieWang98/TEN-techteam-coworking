# How to use

### Install firebase-tools globally first

```
npm install -g firebase-tools
```

### Login into firebase

```
firebase login
```

### Start emulator

```
npm run serve
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

Here is an example of the `addNewOrg` function

```
curl -X POST http://127.0.0.1:5001/fir-testjuly8/us-central1/addNewOrg -H 'Content-Type: application/json' -d '{
  "name": "Test Organization",
  "domains": ["tufts.edu"], 
  "exchange_location": "hello ave", 
  "schedule": [null, null, null, null, null, null, {"start": "10:00", "end": "24:00"}]
}'
```

### To deploy the function to prod

```
npm run prod-deploy
```