import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Initialize Firebase
var config = {
	apiKey: "AIzaSyAFl9OOkHr_PVpdQz5NdlEoYhYIZB0bgI4",
	authDomain: "react-example-a9b80.firebaseapp.com",
	databaseURL: "https://react-example-a9b80.firebaseio.com",
	projectId: "react-example-a9b80",
	storageBucket: "react-example-a9b80.appspot.com",
	messagingSenderId: "794811170116"
};
firebase.initializeApp(config);

ReactDOM.render(
	<App />, 
	document.getElementById('root'));
registerServiceWorker();
	