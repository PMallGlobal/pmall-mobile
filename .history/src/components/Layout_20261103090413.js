import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom'; 
import '../App.css'; 
import './Layout.css'; // Import the new CSS

// Icons
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';

import Footer from './footer';
import HeaderSearch from './headerSearch';
import { getCart } from '../utils/cartUtils'; // FIX: Use getCart instead of static cartNum
import { useUser, useLogOut } from "../context/UserContext";
import { useVendorr } from '../context/VendorSignupContext';

const Layout = () => {
  const { user } = useUser();
  const logOut = useLogOut();
  const { unreadNotifs } = useVendorr();
  const location = useLocation();

  // 1. FIX: Make cart count reactive
  const [cartCount, setCartCount] = useState(0);

  // 2. Derive `vendorIn` from the user object, not a static state
  const vendorIn = user?.accountType === 'Vendor';

  // Update cart count whenever the user navigates (e.g., after adding to cart)
  useEffect(() => {
    const cart = getCart() || [];
    const count = cart.reduce((sum, item) => sum + (item.amtItems || 1), 0);
    setCartCount(count);
  }, [location.pathname]); // Re-run on route change

  return (
    <div className="layout-container">
      {/* STICKY HEADER */}
      <header className="layout-header">
        
        {/* TOP ROW: Greeting & Actions */}
        <div className="header-top-row">
          
          {/* Left Side: Greeting or Location */}
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
            
            {/* Optional: Location Pill (using that unused icon) */}
            <div className="location-pill">
              <LocationOnOutlinedIcon fontSize="small" />
              <span>Deliver to Lagos</span>
            </div>
          </div>

          {/* Right Side: Icons */}
          <div className="header-actions">
            {user?.loggedIn && (
              <Link to="/notifications" className="icon-btn">
                <NotificationsActiveOutlinedIcon />
                {unreadNotifs > 0 && <span className="icon-badge red">{unreadNotifs}</span>}
              </Link>
            )}
            
            <Link to="/cart" className="icon-btn">
              <ShoppingCartOutlinedIcon />
              {cartCount > 0 && <span className="icon-badge purple">{cartCount}</span>}
            </Link>

            {/* Profile/Logout Action */}
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

        {/* SEARCH ROW */}
        <div className="header-search-row">
          <HeaderSearch />
        </div>
        
      </header>

      {/* PAGE CONTENT */}
      <main className="layout-main">
        <Outlet />
      </main>

      {/* BOTTOM NAVIGATION */}
      {user?.loggedIn && <Footer vendorIn={vendorIn} />}
    </div>
  );
};

export default Layout;