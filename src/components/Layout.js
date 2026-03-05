import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom'; // <-- Import Outlet
import '../App.css'; 
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Footer from './footer';
import HeaderSearch from './headerSearch';
import { cartNum } from '../utils/cartUtils';
import { useUser, useLogOut} from "../context/UserContext";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { useVendorr } from '../context/VendorSignupContext';

const Layout = () => {
  const [vendorIn, setVendorIn] = useState(true)
  const {user} = useUser()
  const logOut = useLogOut();

   const {unreadNotifs} = useVendorr()
 
  return (
    <div className="layout-container">
      {/* Header */}
      <header className="layout-header">
        <div className="flex justsb header-t">
          <div>
            <h6>Welcome to Pmall,</h6>
            {user.token? 
            <div className='flex alc g-5'>
              <AccountCircleOutlinedIcon className='location-icon header-icon' />
              <p className='capitalize'>{user.fname} {user.accountType && `(${user.accountType})`}</p>
            </div> :
            <div className='login-link'>
                <Link to="/auth/sign-in"><p>Login</p></Link>
            </div>
            }
          </div>
          <div className='flex  g-10'>
          {user.token && user.accountType &&
           <div className='cart-cont'>
              <Link to="/notifications"> <NotificationsActiveOutlinedIcon  className='header-icon pointer' /></Link>
              <div className='cart-num'>
                <p >{unreadNotifs}</p>
              </div>
            </div>
          }
            <div className='cart-cont'>
              <Link to="/cart"> <ShoppingCartOutlinedIcon className='header-icon pointer' /> </Link>
              <div className='cart-num'>
                <p >{cartNum}</p>
              </div>
            </div>
          </div>
        </div>
       <HeaderSearch />
       {user.token && !user.accountType && 
        <div className='logout-btn-header'>
          <p onClick={logOut}>Logout</p>
        </div>
       }
      </header>


      <main className="layout-main">
        <Outlet />
      </main>

      {user.token && <Footer vendorIn={vendorIn} />}
    </div>
  );
};

export default Layout;