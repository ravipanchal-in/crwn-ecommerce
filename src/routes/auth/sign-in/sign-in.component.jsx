import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../../utils/firebase/firebase.utils';
import SignUp from '../sign-up/sign-up.component';

const SignIn = () => {

  useEffect(async () => {
    const response = await getRedirectResult(auth);
    if (response) {
      const userDocRef = await createUserDocumentFromAuth(response.user);
    }
  }, [])


  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
  }


  return (
    <>
      Sign in
      <button onClick={logGoogleUser}>Sign in with Google popup</button>
      <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>

      <SignUp />
    </>
  )
}

export default SignIn;