import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import Firebase, { FirebaseContextProvider } from './Firebase';
import store from './store'

import unregister from './serviceWorker';

require('dotenv').config()

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContextProvider value={new Firebase()}>
      <App />
    </FirebaseContextProvider>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();
