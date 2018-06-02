import axios from "axios";
//import * as firebase from "firebase";

import * as actionTypes from "./actionTypes";

const toto = [
  "A",
  "I",
  "z",
  "a",
  "S",
  "y",
  "D",
  "R",
  "a",
  "l",
  "t",
  "Y",
  "o",
  "Q",
  "6",
  "V",
  "c",
  "h",
  "d",
  "y",
  "D",
  "r",
  "g",
  "X",
  "O",
  "z",
  "9",
  "K",
  "h",
  "F",
  "l",
  "m",
  "1",
  "M",
  "O",
  "K",
  "W",
  "L",
  "c"
];
/* 
const config = {
  apiKey: `${toto.join("")}`,
  authDomain: "react-burger-builder-cce1e.firebaseapp.com",
  databaseURL: "https://react-burger-builder-cce1e.firebaseio.com",
  projectId: "react-burger-builder-cce1e",
  storageBucket: "react-burger-builder-cce1e.appspot.com",
  messagingSenderId: "128712198554"
};
firebase.initializeApp(config); */

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSucces = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const auth = (email, password) => {
  console.log("TO REMOVE");
  return async dispatch => {
    dispatch(authStart());
    /*
        See https://firebase.google.com/docs/web/setup
        for how to implement Oauth
    */
    try {
      /*       const data = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password); */
      const userData = {
        email,
        password,
        returnSecureToken: true
      };
      const { data } = axios.post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${toto.join(
          ""
        )}`,
        userData
      );

      dispatch(authSucces(data));
    } catch (error) {
      // Handle Errors here.
      /*       var errorCode = error.code;
      var errorMessage = error.message; */
      // ...
      console.error(`[ERROR AUTH] ${error.message}`);
      dispatch(authFail(error));
    }
  };
};
