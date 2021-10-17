import { Document } from 'mongoose';
declare global {
  export interface UserRow {
    name: string;
    id: number;
  }
  export interface NewUser {
    name: string;
  }

}
