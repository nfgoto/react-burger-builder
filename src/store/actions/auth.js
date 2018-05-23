import axios from "axios";
import * as firebase from "firebase";

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
  console.log('TO REMOVE');
  return async dispatch => {
    dispatch(authStart());
    const authData = {
      token: `${email}${password}`,
      returnSecureToken: true
    };
    /*
        See https://firebase.google.com/docs/web/setup
        for how to implement Oauth
    */
    try {
      const { data } = await axios.post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${toto.join(
          ""
        )}`,
        authData
      );
      dispatch(authSucces(data));
    } catch (error) {
      console.error(`[ERROR AUTH] ${error.message}`);
      dispatch(authFail(error));
    }
  };
};
