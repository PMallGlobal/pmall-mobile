import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom'; // <-- Import Outlet
import '../App.css'; 
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Footer from './footer';
import HeaderSearch from './headerSearch';
import { cartNum } from '../utils/cartUtils';

const Layout = () => {
  const [vendorIn, setVendorIn] = useState(true)
  console.log(cartNum)
  return (
    <div className="layout-container">
      {/* Header */}
      <header className="layout-header">
        <div className="flex justsb header-t">
          <div>
            <h6>Location</h6>
            <div className='flex all-center'>
              <LocationOnOutlinedIcon className='location-icon header-icon' />
              <p className='location'>FCT Abuja, Nigeria</p>
            </div>
          </div>
          <div className='cart-cont'>
            <Link to="/cart"> <ShoppingCartOutlinedIcon className='header-icon pointer' /> </Link>
            <div className='cart-num'>
              <p >{cartNum}</p>
            </div>
          </div>
        </div>
       <HeaderSearch />
      </header>


      <main className="layout-main">
        <Outlet />
      </main>

      <Footer vendorIn={vendorIn} />
    </div>
  );
};

export default Layout;