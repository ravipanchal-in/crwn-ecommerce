import { useState, useContext } from "react";
import './sign-in.styles.scss'
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../../utils/firebase/firebase.utils';
import FormInput from "../../../components/form-inout/form-inout.component";
import Button from '../../../components/button/button.component';
import { UserContext } from "../../../components/contexts/user.context";


const defaultFormFields = {
  email: '',
  password: '',
}

const SignIn = () => {

  const { setCurrentUser } = useContext(UserContext);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => { setFormFields(defaultFormFields); }

  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    setCurrentUser(response.user)
    await createUserDocumentFromAuth(response.user);
    console.log('response after sign in try with google popup :', response);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      resetFormFields();
      setCurrentUser(response.user)
      console.log('response after sign in try with email and password :', response);
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  }





  return (
    <div className="sign-up-container">
      <h2>Already have an account ?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit} >
        <FormInput label='Email' onChange={handleChange} name='email' value={email} type='email' required />
        <FormInput label='Password' onChange={handleChange} name='password' value={password} type='password' required />
        <div className="buttons-container">
          <Button type='submit'>Sign In</Button>
          <Button onClick={signInWithGoogle} buttonType='google' type='button'>Google Sign In</Button>
        </div>
      </form>
    </div>
  )
}


export default SignIn;