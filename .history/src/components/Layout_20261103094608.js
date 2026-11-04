import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom'; 
import '../App.css'; 
import './Layout.css'; 

// Icons
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';

import Footer from './footer';
import HeaderSearch from './headerSearch';
import { getCart } from '../utils/cartUtils'; 
import { useUser, useLogOut } from "../context/UserContext";
import { useVendorr } from '../context/VendorSignupContext';

const Layout = () => {
  const { user } = useUser();
  const logOut = useLogOut();
  const { unreadNotifs } = useVendorr();
  const location = useLocation();

  
  const [cartCount, setCartCount] = useState(0);
  const [isBumping, setIsBumping] = useState(false);

  const vendorIn = user?.accountType === 'Vendor';

  
  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart() || [];
      const newCount = cart.reduce((sum, item) => sum + (item.amtItems || 1), 0);
      
      
      setCartCount((prevCount) => {
        if (newCount > prevCount) {
          setIsBumping(true);
          setTimeout(() => setIsBumping(false), 300); 
        }
        return newCount;
      });
    };

    // Initial load
    updateCartCount();

    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, [location.pathname]); 

  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="header-top-row">
          
          <div className="header-left">
            {user?.loggedIn ? (
              <div className="header-greeting">
                <p className="greeting-label">Welcome back,</p>
                <h2 className="greeting-name">{user.fname || 'Shopper'} 👋</h2>
              </div>
            ) : (
              <div className="header-greeting">
                <p className="greeting-label">Welcome to Pmall</p>
                <Link to="/auth/sign-in" className="login-link">
                  <h2 className="greeting-name">Tap to Login</h2>
                </Link>
              </div>
            )}
            
            <div className="location-pill">
              <LocationOnOutlinedIcon fontSize="small" />
              <span>Deliver to Lagos</span>
            </div>
          </div>

          <div className="header-actions">
            {user?.loggedIn && (
              <Link to="/notifications" className="icon-btn">
                <NotificationsActiveOutlinedIcon />
                {unreadNotifs > 0 && <span className="icon-badge red">{unreadNotifs}</span>}
              </Link>
            )}
            
            <Link to="/cart" className={`icon-btn ${isBumping ? 'bump' : ''}`}>
              <ShoppingCartOutlinedIcon />
              {cartCount > 0 && (
                <span className="icon-badge purple">{cartCount > 99 ? '99+' : cartCount}</span>
              )}
            </Link>

            {user?.loggedIn ? (
              <button className="icon-btn logout-btn" onClick={logOut} title="Log Out">
                <LogoutIcon />
              </button>
            ) : (
              <Link to="/auth/sign-in" className="icon-btn">
                <PersonOutlineIcon />
              </Link>
            )}
          </div>
        </div>

        <div className="header-search-row">
          <HeaderSearch />
        </div>
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

      {user?.loggedIn && <Footer vendorIn={vendorIn} />}
    </div>
  );
};

export default Layout;