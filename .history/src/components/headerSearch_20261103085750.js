import React from 'react'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { Link } from "react-router-dom";
import { useVendorr } from '../context/VendorSignupContext';
import { useUser } from '../context/UserContext';
import { getCart } from '../utils/cartUtils';
import '../storeFront/StoreFront.css';


import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
export default function HeaderSearch() {
  const { searchInput, setSearchInput} = useVendorr();
  const { user } = useUser();
  return (
    <header className="sf-header">
        <div className="sf-header-top">
          <div>
            <p className="sf-greeting">Welcome back,</p>
            <h2 className="sf-username">{user?.fname || 'Shopper'} 👋</h2>
          </div>
          <div className="sf-header-actions">
            <Link to="/wishlist" className="sf-icon-btn">
              <FavoriteBorderIcon />
            </Link>
            <Link to="/cart" className="sf-icon-btn">
              <ShoppingCartOutlinedIcon />
              {cartCount > 0 && <span className="sf-cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>

        <div className="sf-search-wrap">
          <div className="sf-search-bar">
            <SearchIcon className="sf-search-icon" />
            <input type="text" placeholder="Search for products, brands..." />
          </div>
          <button className="sf-filter-btn">
            <TuneOutlinedIcon />
          </button>
        </div>
      </header>
  )
}
