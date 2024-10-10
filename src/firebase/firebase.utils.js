// all the utility libraries loaded while included the dependencies when installed firebase with npm
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBUAAS0O9IrojqUi45dAwaDHT30x50wWQY",
  authDomain: "crown-db-55582.firebaseapp.com",
  projectId: "crown-db-55582",
  storageBucket: "crown-db-55582.appspot.com",
  messagingSenderId: "762361031124",
  appId: "1:762361031124:web:2e796faadff84e1e170e41",
  measurementId: "G-9SHXH60FPG",
};

//Storing authenticated User Data in Firebase Firestore
export const createUserProfileDocument = async (userAuth, _additionalData) => {
  if (!userAuth) return;

  //   const userRef = firestore.doc("users/128fdashadu");
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  // console.log(snapshot);

  //Step 3 : if NO document, create a new object and document
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userAuth.set({
        displayName,
        email,
        createAt,
        ..._additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
