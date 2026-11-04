import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { useVendorr } from '../context/VendorSignupContext';
import '../storeFront/';

export default function HeaderSearch() {
  const { searchInput, setSearchInput} = useVendorr();
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
