import { SET_USER_DATA } from './actionTypes'
import { IUser } from './reducer'

export const setUserData = (userData: IUser) => ({
  type: SET_USER_DATA,
  payload: userData
})

interface ISetUserData {
  type: 'SET_USER_DATA',
  payload: IUser
}

export type TAction = ISetUserData;
