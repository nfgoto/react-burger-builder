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

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSucces = (idToken, localId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId: localId
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error
});

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("localId");

  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = expirationTIme => async dispatch =>
  setTimeout(params => {
    dispatch(authLogout());
  }, expirationTIme * 1000); // because setTimeout take milisec timer, now in sec

export const auth = (email, password, isSignup) => async dispatch => {
  dispatch(authStart());
  /*
        Seehttps://firebase.google.com/docs/reference/rest/auth/#section-sign-in-email-password
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

    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${toto.join(
      ""
    )}`;
    if (isSignup) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${toto.join(
        ""
      )}`;
    }
    const {
      data,
      data: { idToken, localId, expiresIn }
    } = await axios.post(url, userData);

    localStorage.setItem("token", idToken);
    localStorage.setItem("localId", localId);

    const expirationDate = new Date(Date.now() + expiresIn * 1000);
    localStorage.setItem("expirationDate", expirationDate);

    console.log("[DATA FROM RESPONSE]******", data);
    dispatch(authSucces(idToken, localId));
    dispatch(checkAuthTimeout(expiresIn));
  } catch (error) {
    // Handle Errors here.
    /*       var errorCode = error.code;
      var errorMessage = error.message; */
    // ...
    console.error(`[ERROR AUTH] ${error.message}`);
    dispatch(authFail(error.response.data.error));
  }
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path
});

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("[NO TOKEN]");
    return dispatch(authLogout());
  }
  const localId = localStorage.getItem("localId");
  const expirationDate = new Date(
    localStorage.getItem("expirationDate")
  ).getTime();
  const now = Date.now();

  if (now > expirationDate) {
    console.log("[TOKEN EXPIRED]");
    return dispatch(authLogout());
  }

  dispatch(authSucces(token, localId));
  const timeout = (expirationDate - now) / 1000;
  return dispatch(checkAuthTimeout(timeout));
};
