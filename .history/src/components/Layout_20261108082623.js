import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'; 
import '../App.css'; 
import './Layout.css'; 

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import Footer from './footer';
import HeaderSearch from './headerSearch';
import { getCart } from '../utils/cartUtils'; 
import { useUser, useLogOut } from "../context/UserContext";
import { useVendorr } from '../context/VendorSignupContext';
import UserAvatar from '../utils/UserAvatar'; // Make sure this path is correct

const Layout = () => {
  const { user } = useUser();
  const logOut = useLogOut();
  const { unreadNotifs } = useVendorr();
  const location = useLocation();
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [isBumping, setIsBumping] = useState(false);

  const vendorIn = user?.accountType === 'Vendor';

  // 1. Map paths to their titles
  const pageTitles = {
    '/vendors': 'My Vendors',
    '/cart': 'My Cart',
    '/wishlist': 'My Wishlist',
    '/checkout': 'Checkout',
    '/orders': 'My Orders',
    // Add other sub-pages here
  };

  const currentTitle = pageTitles[location.pathname];
  const isSubPage = !!currentTitle;

  // 2. Hide search bar on specific pages (like Cart or Vendors) to save space
  const hideSearchPaths = ['/vendors', '/cart', '/checkout', '/wishlist'];
  const showSearch = !hideSearchPaths.includes(location.pathname);

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

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, [location.pathname]); 

  return (
    <div className="layout-container">
      {/* Dynamic Header */}
      <header className={`layout-header ${isSubPage ? 'sub-page-header' : ''}`}>
        <div className="header-top-row">
          
          {/* LEFT SIDE: Either Greeting OR Back Button + Title */}
          <div className="header-left">
            {isSubPage ? (
              <div className="sub-page-title-row">
                <div className="back-btn" onClick={() => navigate(-1)}>
                  <ArrowBackOutlinedIcon />
                </div>
                <h2 className="page-title">{currentTitle}</h2>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* RIGHT SIDE: Global Icons */}
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
               <div className="profile-avatar-btn" onClick={logOut} title="Log Out">
                  <UserAvatar name={user?.fname} size={36} className="header-avatar" />
               </div>
            ) : (
              <Link to="/auth/sign-in" className="icon-btn">
                <PersonOutlineIcon />
              </Link>
            )}
          </div>
        </div>

        {showSearch && (
          <div className="header-search-row">
            <HeaderSearch />
          </div>
        )}
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

      {user?.loggedIn && <Footer vendorIn={vendorIn} />}
    </div>
  );
};

export default Layout;