export const SIGN_IN_STARTED = 'SIGN_IN_STARTED'
export const SIGN_IN_COMPLETED = 'SIGN_IN_COMPLETE'
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED'

export type SIGN_IN_STATUS = typeof SIGN_IN_STARTED |
                             typeof SIGN_IN_COMPLETED |
                             typeof SIGN_IN_FAILED

interface SignInStatusAction {
  type: SIGN_IN_STATUS
  msg?: string
}

export type FirebaseActionTypes = SignInStatusAction

export interface FirebaseState {
  app: firebase.app.App,
  auth: firebase.auth.Auth,
  google: {
    authScopes: string[],
    authProvider?: firebase.auth.GoogleAuthProvider
  },
  signInStatus: {
    loggedIn: boolean,
    attemptingLogin: boolean,
    loginFailed: boolean,
    errMsg: string,
  }
}
