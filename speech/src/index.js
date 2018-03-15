import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
    apiKey: 'AIzaSyDSEOAMf85_JiYgsxMPMmpkafEnn9N_ghg',
    authDomain: 'proyecto-final-react.firebaseapp.com',
    databaseURL: 'https://proyecto-final-react.firebaseio.com',
    projectId: 'proyecto-final-react',
    storageBucket: 'proyecto-final-react.appspot.com',
    messagingSenderId: '15138534925'
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
