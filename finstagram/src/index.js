// Purpose: Renders the main component and initializes firebase for image store.

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import css
import "./index.css";
// import bootstrap styling
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
// import Finstagram component
import Finstagram from "./components/Finstagram";
// import Firebase for images
import * as firebase from "firebase/app";

// stuff from FireBase
const firebaseConfig = {
  apiKey: "AIzaSyBymvB1fR7dopDd2cOkrHrxvTGH3bDQHeg",
  authDomain: "finstagram-c33b0.firebaseapp.com",
  databaseURL: "https://finstagram-c33b0.firebaseio.com",
  projectId: "finstagram-c33b0",
  storageBucket: "finstagram-c33b0.appspot.com",
  messagingSenderId: "943303781493",
  appId: "1:943303781493:web:26f60439168822632e1c3c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// renders Finstagram in the browser
ReactDOM.render(
  <Router>
    <Finstagram />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
