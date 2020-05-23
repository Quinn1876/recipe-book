import app from 'firebase/app'
const firebaseConfig = {
  apiKey: "AIzaSyCOkMIZTCJBlLEqoiRfAqRKqV8rzHRNQcA",
  authDomain: "recipe-book-a502c.firebaseapp.com",
  databaseURL: "https://recipe-book-a502c.firebaseio.com",
  projectId: "recipe-book-a502c",
  storageBucket: "recipe-book-a502c.appspot.com",
  messagingSenderId: "718926795968",
  appId: "1:718926795968:web:9a0f7a64cb251a24158925"
};

export class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
  }
}

