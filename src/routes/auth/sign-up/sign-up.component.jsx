import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss'
import FormInput from "../../../components/form-inout/form-inout.component";
import Button from '../../../components/button/button.component';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Password do not match');
      return;
    }
    try {
      const response = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(response.user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Can not create user, email already in use')
      }
      console.log('user creation encountered an error', error);
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account ?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit} >
        <FormInput label='Name' onChange={handleChange} name='displayName' value={displayName} type='text' required />
        <FormInput label='Email' onChange={handleChange} name='email' value={email} type='email' required />
        <FormInput label='Password' onChange={handleChange} name='password' value={password} type='password' required />
        <FormInput label='Confirm Password' onChange={handleChange} name='confirmPassword' value={confirmPassword} type='password' required />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}


export default SignUp;