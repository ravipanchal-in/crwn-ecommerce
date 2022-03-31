import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './navigation.styles.scss'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../components/contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

const Navigation = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  }

  console.log('currentUser >', currentUser);

  return (
    <>
      <div className="navigation">
        <Link to='/' className='logo-container'><CrwnLogo className='logo' /></Link>
        <div className="nav-links-container">
          <Link to='/' className='nav-link'>Home</Link>
          <Link to='/shop' className='nav-link'>Shop</Link>
          {
            currentUser ? (<span onClick={signOutHandler} className='nav-link'>Sign Out</span>) :
              (<Link to='/auth' className='nav-link'>Sign In</Link>)
          }
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Navigation;