import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
    apiKey: "AIzaSyBY7B2RndygRPN880yv-G7DyWdIxx5CX90",
    authDomain: "speech-27653.firebaseapp.com",
    databaseURL: "https://speech-27653.firebaseio.com/",
    projectId: "speech-27653",
    storageBucket: "speech-27653.appspot.com",
    messagingSenderId: "354045762381"
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
