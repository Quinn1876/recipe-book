// import firebase from 'firebase/app'
// import 'firebase/auth';
// import 'firebase/functions'
// import {
//   SIGN_IN_STARTED,
//   SIGN_IN_COMPLETED,
//   SIGN_IN_FAILED,
//   FirebaseActionTypes,
//   FirebaseState,
//   UPDATE_USER,
// } from './types'



// // List of Scopes and services
// // https://developers.google.com/identity/protocols/oauth2/scopes
// const initialState: FirebaseState = {
//   app: firebase.initializeApp(firebaseConfig),
//   auth: firebase.auth(),
//   google: {
//     authScopes: [],
//     authProvider: new firebase.auth.GoogleAuthProvider(),
//   },
//   signInStatus: {
//     loggedIn: false,
//     attemptingLogin: false,
//     loginFailed: false,
//     errMsg: ''
//   },
//   user: null,
//   func: firebase.functions(),
// }

// const firebaseReducer = (state = initialState, action: FirebaseActionTypes) => {
//   switch (action.type) {
//     case SIGN_IN_STARTED:
//       return {
//         ...state,
//         signInStatus: {
//           ...state.signInStatus,
//           attemptingLoging: true,
//           loginFailed: false,
//         }
//       }
//     case SIGN_IN_COMPLETED:
//       return {
//         ...state,
//         signInStatus: {
//           ...state.signInStatus,
//           attemptingLoging: false,
//           loginFailed: false,
//           loggedIn: true,
//         }
//       }
//     case SIGN_IN_FAILED:
//       return {
//         ...state,
//         signInStatus: {
//           ...state.signInStatus,
//           attemptingLoging: false,
//           loginFailed: true,
//           loggedIn: false,
//           errMsg: action.msg || 'No Error Message given'
//         }
//       }
//     case UPDATE_USER:
//       return {
//         ...state,
//         user: action.user
//       }
//   default:
//     return state
//   }
// }

// export default firebaseReducer
