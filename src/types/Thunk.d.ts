import { ThunkAction } from "redux-thunk";

type Thunk = ThunkAction< void, RootState, unknown, Action< string > >
