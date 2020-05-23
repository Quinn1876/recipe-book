import * as ActionTypes from './actionTypes';
import { TAction } from './actions'

export interface IUser {
  uid: string;
}


const initialUserState: IUser = {
  uid: ''
}

export default (state: IUser = initialUserState, { type, payload }: TAction) => {
  switch (type) {

  case ActionTypes.SET_USER_DATA:
    const {uid} = payload;
    return { ...state, uid }

  default:
    return state
  }
}
