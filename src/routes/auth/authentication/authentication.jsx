import './authentication.styles.scss';
import SignUp from '../sign-up/sign-up.component';
import SignIn from '../sign-in/sign-in.component';

const Auth = () => {
  return (
    <div className='authentication-container'>
      <SignIn />
      <SignUp />
    </div>
  )
}

export default Auth;