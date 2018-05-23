import axios from "axios";
import * as firebase from "firebase";


import * as actionTypes from "./actionTypes";

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
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=",
        authData
      );
      dispatch(authSucces(data));
    } catch (error) {
      console.error(`[ERROR AUTH] ${error.message}`);
      dispatch(authFail(error));
    }
  };
};
