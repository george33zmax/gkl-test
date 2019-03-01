import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


// Initialize Firebase
const config = {
  apiKey: "AIzaSyBOEK0JvHz_JFv7bETwM-iE2eFE0VUKS5s",
  authDomain: "glk-jorge.firebaseapp.com",
  databaseURL: "https://glk-jorge.firebaseio.com",
  projectId: "glk-jorge",
  storageBucket: "glk-jorge.appspot.com",
  messagingSenderId: "82529304238"
};
firebase.initializeApp(config);

export default firebase;
