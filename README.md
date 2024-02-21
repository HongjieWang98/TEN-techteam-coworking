# For building up the local environment

## Create React App:
1. In Visual Studio Code, open up a terminal
2. cd to the directory where you want

```
npx create-react-app my-app
cd my-app
npm start
```


## Module Needed to be Installed in your Local Computer
1. Install React Router:
If encounter the error: Failed to compile ./src/components/App/App.js Module not found: Can't resolve 'react-router-dom'
The following command will resolve it: 

```
npm install react-router-dom --save
```
2. Install Bootstrap
```
npm install react-bootstrap --save
```

## When Merge your code:
1. git pull //before making any modification in your local environment
2. git status
3. git pull name-of-your-branch
  
# Temporarily ignore the rest of the notes
---------------------------------------------------------------------------------------------------------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to deploy

```
firebase login
npm run deploy-prod
```

[We may want to limit what we deploy with `--only` in the future](https://firebase.google.com/docs/cli#partial_deploys)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.  
The page will reload when you make changes.  
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.  
The build is minified and the filenames include the hashes.  
Your app is ready to be deployed! See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.  
This command will remove the single build dependency from your project.  
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them.  
All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them.  
At this point, you're on your own. You don't have to ever use `eject`.  
The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature.  
However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).  
To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

