import React from 'react';
import { IFirebase } from './types';

const FirebaseContext = React.createContext<IFirebase | null>(null);

export const FirebaseContextProvider = FirebaseContext.Provider;
export const FirebaseContextConsumer = FirebaseContext.Consumer;
