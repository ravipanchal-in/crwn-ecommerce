import { Link, Outlet } from 'react-router-dom';
import './navigation.styles.scss'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

const Navigation = () => {
  return (
    <>
      <div className="navigation">
        <Link to='/' className='logo-container'><CrwnLogo className='logo' /></Link>
        <div className="nav-links-container">
          <Link to='/' className='nav-link'>Home</Link>
          <Link to='/shop' className='nav-link'>Shop</Link>
          <Link to='/sign-in' className='nav-link'>Sign In</Link>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Navigation;