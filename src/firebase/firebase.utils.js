// all the utility libraries loaded while included the dependencies when installed firebase with npm
import firebase from 'firebase/app'; 
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBUAAS0O9IrojqUi45dAwaDHT30x50wWQY",
    authDomain: "crown-db-55582.firebaseapp.com",
    projectId: "crown-db-55582",
    storageBucket: "crown-db-55582.appspot.com",
    messagingSenderId: "762361031124",
    appId: "1:762361031124:web:2e796faadff84e1e170e41",
    measurementId: "G-9SHXH60FPG"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;