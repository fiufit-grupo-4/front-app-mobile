/*
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Optionally import the services that you want to use

//import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcuhyIOZp7RtjtfJEQ0qBcoLrDPjFPcFw",
    authDomain: "react-native-fiufit.firebaseapp.com",
    projectId: "react-native-fiufit",
    storageBucket: "react-native-fiufit.appspot.com",
    messagingSenderId: "880473744329",
    appId: "1:880473744329:web:64a1cc5058202179fc3e18"
  };

//if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
//}
//const app = initializeApp(firebaseConfig);
//const storage = getStorage(app);

export { firebase };
*/




import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
    apiKey: "AIzaSyDcuhyIOZp7RtjtfJEQ0qBcoLrDPjFPcFw",
    authDomain: "react-native-fiufit.firebaseapp.com",
    projectId: "react-native-fiufit",
    storageBucket: "react-native-fiufit.appspot.com",
    messagingSenderId: "880473744329",
    appId: "1:880473744329:web:64a1cc5058202179fc3e18"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

//const app = initializeApp(firebaseConfig);

export {firebase}

