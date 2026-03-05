import React from 'react'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HeaderSearch from '../components/headerSearch';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { cartNum } from '../utils/cartUtils';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


export default function CategoryHeader({title, image, search}) {
    const navigate = useNavigate();
  return (
    <div className='category-t'>
        <div className='flex justsb category-head'>
            <div className='back-icon' 
                onClick={() => navigate(-1)}   
                style={{ cursor: 'pointer' }}
            >
                <ArrowBackOutlinedIcon />
            </div>
            <p>{title}</p>
            {title === 'My Cart' ? (
              <div className="back-icon">
                <FavoriteOutlinedIcon className="fav-icon" />
              </div>
            ) : title === 'My Wishlist' || title === 'Checkout' ? (
              <div className="back-icon">
                <SearchOutlinedIcon className="" />
              </div>
            ) : title === 'My Orders' || title === 'Order Details' || title === 'Products' || title === 'New Product' || title === 'Edit Product' || title == "Orders/Transactions" || title == "Fund Withdrawal" || title == "Withdraw Funds" || title == "Transfer Funds"  || title == "Menu" || title == "Transfer Pin" || title === 'Edit Profile' || image === 'true' ? (
              <div className="back-icon">
                {/* <img src="/images/Ellipse 280.png" alt="Orders" className='profile-image' /> */}
                <AccountCircleOutlinedIcon className='pfp' />
              </div>
            ) : (
              <div className='cart-cont'>
                <Link to="/cart"> <ShoppingCartOutlinedIcon className='header-icon pointer' /> </Link>
                <div className='cart-num'>
                  <p >{cartNum}</p>
                </div>
              </div>
            )}
        </div>

       {title !== 'Product Details' || title !== 'My Cart' || title !== "My Wishlist" || title !== "Checkout"  && <HeaderSearch />}
       {title == 'Products' || search == "true" && <HeaderSearch />}
    </div>
  )
}
