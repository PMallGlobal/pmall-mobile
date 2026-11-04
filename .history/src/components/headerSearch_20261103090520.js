import React from 'react'
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
  const cartCount = (getCart() || []).reduce((sum, item) => sum + (item.amtItems || 1), 0);

  return (
    <header className="sf-header">
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
