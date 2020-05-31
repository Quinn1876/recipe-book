import firebase from 'firebase/app'
import 'firebase/auth';
import {
  SIGN_IN_STARTED,
  SIGN_IN_COMPLETED,
  SIGN_IN_FAILED,
  FirebaseActionTypes,
  FirebaseState,
  UPDATE_USER
} from './types'

const firebaseConfig = {
  apiKey: "AIzaSyCOkMIZTCJBlLEqoiRfAqRKqV8rzHRNQcA",
  authDomain: "recipe-book-a502c.firebaseapp.com",
  databaseURL: "https://recipe-book-a502c.firebaseio.com",
  projectId: "recipe-book-a502c",
  storageBucket: "recipe-book-a502c.appspot.com",
  messagingSenderId: "718926795968",
  appId: "1:718926795968:web:9a0f7a64cb251a24158925"
};

// List of Scopes and services
// https://developers.google.com/identity/protocols/oauth2/scopes
const initialState: FirebaseState = {
  app: firebase.initializeApp(firebaseConfig),
  auth: firebase.auth(),
  google: {
    authScopes: [],
    authProvider: new firebase.auth.GoogleAuthProvider(),
  },
  signInStatus: {
    loggedIn: false,
    attemptingLogin: false,
    loginFailed: false,
    errMsg: ''
  },
  user: null
}

const firebaseReducer = (state = initialState, action: FirebaseActionTypes) => {
  switch (action.type) {
    case SIGN_IN_STARTED:
      return {
        ...state,
        signInStatus: {
          ...state.signInStatus,
          attemptingLoging: true,
          loginFailed: false,
        }
      }
    case SIGN_IN_COMPLETED:
      return {
        ...state,
        signInStatus: {
          ...state.signInStatus,
          attemptingLoging: false,
          loginFailed: false,
          loggedIn: true,
        }
      }
    case SIGN_IN_FAILED:
      return {
        ...state,
        signInStatus: {
          ...state.signInStatus,
          attemptingLoging: false,
          loginFailed: true,
          loggedIn: false,
          errMsg: action.msg || 'No Error Message given'
        }
      }
    case UPDATE_USER:
      return {
        ...state,
        user: action.user
      }
  default:
    return state
  }
}

export default firebaseReducer
