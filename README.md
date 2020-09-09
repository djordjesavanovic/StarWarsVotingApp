### Intro & Description

**Star Wars Voting App** is a React-based web app, which features 9 of my favourite Star Wars characters, with their pictures, basic info and an option to upvote and/or downvote them respectively.

The project was bootstrapped with `create-react-app` and finalized with the help of following packaged:
- **Firebase**
 - Packaged used for connecting to the Firebase Realtime Database and its frontend logic 
- **Reactstrap** (+ Bootstrap)
 - Prebuilt React components, based on Bootstrap
- **React Router**
 - Used for simple routing
- **Axios**
 - Used for making requests to the APIs

Multiple APIs and other technologies were used to make this app happen:
- **Firebase Realtime Database**
 - Used for storing the data, as well as updating it in frontend in the real time.
- **Swapi API**
 - Used for fetching Star Wars characters and their basic info
- **Serpapi (Google Image Search)**
 - Used for fetching images from Google, based on characters' names


Based on my understanding of the taks, the logic implemented functions in the following way:
1. Frontend connects to the Firebase Realtime Database and fetches the initial properties
2. Based on the data fetched, I map through that array and for each ID, I send one request to Swapi API, using the ID as the argument 
3. The intial array is then enriched witht he characters' data
4. Once that's done, I map through the array once more and based on the character's name, I send a request to google image search for each character respectively
5. Since the lowest amount of images returned is 100, I simpley use a random index of the image array and take that random picture and assign it to a character
6. User can now see the full list and upvote/downvote the characters (listener for voting is started right on the component mount)

------------


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
