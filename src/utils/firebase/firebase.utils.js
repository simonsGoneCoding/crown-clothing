import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBbcXat3IIotK4hGQfoaV67uGaHB25wTOo',
  authDomain: 'crwn-clothing-db-6cc7c.firebaseapp.com',
  projectId: 'crwn-clothing-db-6cc7c',
  storageBucket: 'crwn-clothing-db-6cc7c.appspot.com',
  messagingSenderId: '645239573248',
  appId: '1:645239573248:web:9369b00528c309e5c101e5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//Database
export const db = getFirestore();

export const createUserDocumentFromAuth = async userAuth => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  //check if user data does not exists - and then create/set the doc with data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error);
    }
  }

  return userDocRef;
};
