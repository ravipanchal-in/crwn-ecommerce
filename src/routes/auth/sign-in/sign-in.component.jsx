import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../../utils/firebase/firebase.utils';

const SignIn = () => {

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
  }

  return (
    <>
      Sign in
      <button onClick={logGoogleUser}>Sign in with Google popup</button>
    </>
  )
}

export default SignIn;