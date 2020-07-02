// *** State Interfaces ***
export interface UserState {
  userData: firebase.User | null;
}

// *** Action Types ***
export const USER_SIGN_IN_SUCCESS = 'USER_SIGN_IN_SUCCESS';

// *** Action Payloads ***
interface UserPayload {
  user: firebase.User;
}

// *** Action Interfaces ***

export interface SignInSuccessAction {
  type: typeof USER_SIGN_IN_SUCCESS;
  payload: UserPayload;
}

export type UserActionTypes = SignInSuccessAction;
