import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/functions'

import * as FirebaseTypes from './types';

const firebaseConfig = {
  apiKey: "AIzaSyCOkMIZTCJBlLEqoiRfAqRKqV8rzHRNQcA",
  authDomain: "recipe-book-a502c.firebaseapp.com",
  databaseURL: "https://recipe-book-a502c.firebaseio.com",
  projectId: "recipe-book-a502c",
  storageBucket: "recipe-book-a502c.appspot.com",
  messagingSenderId: "718926795968",
  appId: "1:718926795968:web:9a0f7a64cb251a24158925"
};

class Firebase {
  private static app: firebase.app.App = firebase.initializeApp(firebaseConfig);
  private static auth: firebase.auth.Auth = firebase.auth();
  private static functions: firebase.functions.Functions = firebase.functions();

  private static addRecipe: firebase.functions.HttpsCallable = Firebase.functions.httpsCallable('v1-callable-addRecipe');
  private static getRecipes: firebase.functions.HttpsCallable = Firebase.functions.httpsCallable('v1-callable-getRecipes');

  static async getUserRecipesRequest(): Promise<FirebaseTypes.Recipe[]> {
    try {
      const response = await this.getRecipes(null);
      return response.data
    } catch ( err ) {
      console.log('Error fetching recipes', err)
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  }

  static async addRecipeRequest(newRecipe: FirebaseTypes.NewRecipe): Promise<FirebaseTypes.Recipe[]> {
    try {
      const response = await this.addRecipe(newRecipe);
      return response.data;
    } catch ( err ) {
      console.log('Error Adding recipe', err)
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  }

  static async signInWithEmailAndPassword(email: string, password: string): Promise<firebase.User | null> {
    try {
      const response = await this.auth.signInWithEmailAndPassword(email, password);
      return response.user;
    } catch (err) {
      console.error(err)
    }
    return null;
  }

  static async updateUserDisplayName(name: string) {
    try {
      const repsonse = await this.auth.currentUser?.updateProfile({ displayName: name });
    } catch (err) {
      console.error(err);
    }
  }

};

export default Firebase;
