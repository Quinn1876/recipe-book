import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
declare global {
  export interface CookieAuth {
    _id: ObjectId;
    userId: ObjectId;
    selector: string;
    hashedValidator: string;
    expires: Date;
  }

  export interface CookieAuthDocument extends Document, CookieAuth {
  }

  export interface AuthResponse {
    auth: boolean;
    userId: string;
  }

  export interface NewAuthDocument {
    userId: ObjectId;
    selector: string;
    hashedValidator: string;
  }

  export interface SignInBody {
    userName: string;
    password: string;
    remember?: boolean | number | string | null;
  }

  export interface SignUpBody extends SignInBody {
    name: string;
  }

  export interface UserAuth {
    _id: ObjectId;
    userId: ObjectId;
    userName: string;
    hashedPassword: string;
  }
  export interface UserAuthDocument extends Document, UserAuth {
  }
  export interface UserAuthDocumentRequest {
    userName: string;
    hashedPassword: string;
  }

  export interface NewUserAuthDocument {
    userId: ObjectId;
    userName: string;
    hashedPassword: string;
  }
}
