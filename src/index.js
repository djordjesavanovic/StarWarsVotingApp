import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase";

// Firebase config and initialization
let firebaseConfig = {
    apiKey: "AIzaSyBS4zF-KPrqs4NGBR2gbhKr1ximGLM_ArI",
    authDomain: "starwarsvotingapp.firebaseapp.com",
    databaseURL: "https://starwarsvotingapp.firebaseio.com",
    projectId: "starwarsvotingapp",
    storageBucket: "starwarsvotingapp.appspot.com",
    messagingSenderId: "301888680987",
    appId: "1:301888680987:web:4ddf50f83f38767074f4be"
};

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
