import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/auth';

export const firebaseConfig = {
    // apiKey: "AIzaSyDcuhyIOZp7RtjtfJEQ0qBcoLrDPjFPcFw",
    // authDomain: "react-native-fiufit.firebaseapp.com",
    // projectId: "react-native-fiufit",
    // storageBucket: "react-native-fiufit.appspot.com",
    // messagingSenderId: "880473744329",
    // appId: "1:880473744329:web:64a1cc5058202179fc3e18"
    apiKey: "AIzaSyDt5QLWTnBLt_422ee85KSrMARdYMI4B_s",
    authDomain: "fiufit-99b25.firebaseapp.com",
    projectId: "fiufit-99b25",
    storageBucket: "fiufit-99b25.appspot.com",
    messagingSenderId: "656208108442",
    appId: "1:656208108442:web:0dc521de512e95ab5eb823"
    
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

/*
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});*/

export { firebase};



