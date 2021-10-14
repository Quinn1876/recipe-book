declare module 'auth' {
  type USER_AUTH = 'USER_AUTH';
  type GOOGLE_AUTH = 'GOOGLE_AUTH';

  export namespace AuthDatabase {
    export interface CookieAuthRow  {
      id:               number;
      user_id:          number;
      selector:         string;
      hashed_validator: string;
      expires:          PgDate;
    }

    export interface UserAuthRow {
        user_name:        string;
        hashed_password:  string;
        id:               number;
        user_id:          number;
      }
  }

  export namespace AuthQuery {
    export interface NewAuthRequest {
      userId:           number;
      selector:         string;
      hashedValidator:  string;
    }
    export interface UserAuthSignInRequest {
      readonly type: USER_AUTH;

      userName: string;
      password: string;
      remember?: boolean | number | string | null;
    }
    export interface UserAuthSignUpRequest extends SignInRequest {
      name: string;
    }

    export interface GoogleAuthSignInRequest {
      readonly type: GOOGLE_AUTH;
    }
    export type GoogleAuthSignUpRequest = unknown;

    export type SignInRequest = UserAuthSignInRequest;
    export type SignUpRequest = UserAuthSignUpRequest;
  }

  export namespace AuthResponse {
    export interface AuthSuccess {
      readonly authenticated:   true;
      readonly userId:          number;
    }
    export interface AuthFailure {
      readonly authenticated: false;
      readonly message?:      string;
    }

    export type AuthResult = AuthSuccess | AuthFailure;

    export interface UserAuthSignUpSuccess {
      readonly type:            USER_AUTH;
      readonly accountCreated:  true;
      readonly userId:          number;
    }

    export interface AuthSignUpFailure {
      readonly accountCreated:  false;
      readonly message?:        string;
    }

    export type SignUpResult = AuthSignUpFailure
                             | UserAuthSignUpSuccess;
  }
}
