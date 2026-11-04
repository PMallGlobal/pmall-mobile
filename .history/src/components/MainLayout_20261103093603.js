import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './Layout.css'; 
import Footer from './footer';
import HeaderSearch from './headerSearch';
import { getCart } from '../utils/cartUtils';
import { useUser } from "../context/UserContext";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const MainLayout = () => {
  const { user } = useUser();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  // Sync cart count reactively
  useEffect(() => {
    const updateCart = () => {
      const cart = getCart() || [];
      setCartCount(cart.reduce((sum, item) => sum + (item.amtItems || 1), 0));
    };
    updateCart();
    window.addEventListener('cartUpdated', updateCart);
    return () => window.removeEventListener('cartUpdated', updateCart);
  }, [location.pathname]);

  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="flex justsb header-t">
          <div>
            <h6>Welcome to Pmall,</h6>
            {user?.loggedIn ? (
              <div className='flex alc g-5'>
                <AccountCircleOutlinedIcon className='location-icon header-icon' />
                <p className='capitalize'>{user.fname} {user.accountType && `(${user.accountType})`}</p>
              </div>
            ) : (
              <div className='login-link'>
                <Link to="/auth/sign-in"><p>Login</p></Link>
              </div>
            )}
          </div>
          
          <div className='flex g-10'>
            {user?.loggedIn && (
              <div className='cart-cont'>
                <Link to="/notifications"> <NotificationsActiveOutlinedIcon className='header-icon pointer' /></Link>
              </div>
            )}
            <div className='cart-cont'>
              <Link to="/cart"> <ShoppingCartOutlinedIcon className='header-icon pointer' /> </Link>
              {cartCount > 0 && <div className='cart-num'><p>{cartCount}</p></div>}
            </div>
          </div>
        </div>
        <HeaderSearch />
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

      {/* The Customer Footer */}
      <Footer vendorIn={false} /> 
    </div>
  );
};

export default MainLayout;