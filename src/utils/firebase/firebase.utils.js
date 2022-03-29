import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt-sex39OD2wPJqRKM8f8sV2P4uylXpdo",
  authDomain: "crwn-clothing-db-d5f15.firebaseapp.com",
  projectId: "crwn-clothing-db-d5f15",
  storageBucket: "crwn-clothing-db-d5f15.appspot.com",
  messagingSenderId: "740262959816",
  appId: "1:740262959816:web:b81e26872f021748b963fd"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);




export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)


  const userSnapShot = await getDoc(userDocRef)
  console.log('userSnapShot>>', userSnapShot.exists());

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt })
    } catch (error) {
      console.log('error in creating the user', error);
    }
  }
  return userDocRef;

}