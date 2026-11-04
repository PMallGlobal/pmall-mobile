import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Footer.css'; // Import the new CSS

// Icons
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

export default function Footer({ vendorIn, stockist }) {
  const { user } = useUser();
  const location = useLocation(); // To detect the active route

  // 1. Define the navigation configurations for each role
  const navConfigs = {
    Vendor: [
      { path: '/dashboard', label: 'Dashboard', icon: GridViewOutlinedIcon },
      { path: `/vendor/${user?.storeId}`, label: 'My Store', icon: StorefrontOutlinedIcon },
      { path: '/', label: 'Mall', icon: StorefrontOutlinedIcon }, // Or Home icon
      { path: '/orders', label: 'Orders', icon: ReceiptLongOutlinedIcon },
      { path: '/menu', label: 'Menu', icon: MenuOutlinedIcon },
    ],
    Stockist: [
      { path: '/dashboard', label: 'Dashboard', icon: GridViewOutlinedIcon },
      { path: '/funds-withdrawal', label: 'Withdrawal', icon: AccountBalanceWalletOutlinedIcon },
      { path: '/chat', label: 'Chat', icon: ChatBubbleOutlineIcon }, // Update path if needed
      { path: '/menu', label: 'Menu', icon: MenuOutlinedIcon },
    ],
    Affiliate: [
      { path: '/', label: 'Mall', icon: StorefrontOutlinedIcon },
      { path: '/affiliate/my-affiliates', label: 'Affiliates', icon: PeopleAltOutlinedIcon },
      { path: '/affiliate/my-vendors', label: 'Vendors', icon: LocalShippingOutlinedIcon },
      { path: '/dashboard', label: 'Dashboard', icon: GridViewOutlinedIcon },
      { path: '/profile', label: 'Profile', icon: PersonOutlineIcon },
    ],
    Customer: [
      { path: '/', label: 'Home', icon: StorefrontOutlinedIcon },
      { path: '/cart', label: 'Cart', icon: ShoppingCartOutlinedIcon },
      { path: '/wishlist', label: 'Wishlist', icon: FavoriteBorderOutlinedIcon },
      { path: '/category', label: 'Category', icon: CategoryOutlinedIcon },
      { path: '/customer/profile', label: 'Profile', icon: PersonOutlineIcon },
    ],
  };

  let role = 'Customer'; 
  
  if (stockist && !vendorIn) {
    role = 'Stockist';
  } else if (user?.accountType === 'Vendor') {
    role = 'Vendor';
  } else if (user?.accountType === 'Affiliate') {
    role = 'Affiliate';
  }

  const links = navConfigs[role];

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = 
            location.pathname === link.path || 
            (link.path !== '/' && location.pathname.startsWith(link.path));

          return (
            <Link 
              to={link.path} 
              key={link.label} 
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="nav-icon-wrapper">
                <Icon className="nav-icon" />
                {isActive && <span className="active-dot"></span>}
              </div>
              <span className="nav-label">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}