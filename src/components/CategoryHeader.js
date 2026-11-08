import React from 'react';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HeaderSearch from '../components/headerSearch';
import { useUser } from '../context/UserContext'; 
import { Link, useNavigate } from 'react-router-dom';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { cartNum } from '../utils/cartUtils';
import UserAvatar from '../utils/UserAvatar';

export default function CategoryHeader({ title, image, search }) {
    const navigate = useNavigate();
    const { user } = useUser();

    // 1. Determine the right-side icon cleanly
    const renderRightIcon = () => {
        if (title === 'My Cart') {
            return <FavoriteOutlinedIcon className="fav-icon" />;
        }
        
        const showSearchIcon = ['My Wishlist', 'Checkout'].includes(title);
        if (showSearchIcon) {
            return <SearchOutlinedIcon />;
        }

        const showUserAvatar = [
            'My Orders', 'Order Details', 'Products', 'New Product', 'Edit Product', 
            'Orders/Transactions', 'Fund Withdrawal', 'Withdraw Funds', 'Transfer Funds', 
            'Menu', 'Transfer Pin', 'Edit Profile'
        ].includes(title) || image === 'true';

        if (showUserAvatar) {
            return <UserAvatar name={user?.fname} size={40} className="db-avatar" />;
        }

        // Default: Cart
        return (
            <div className='cart-cont'>
                <Link to="/cart"> <ShoppingCartOutlinedIcon className='header-icon pointer' /> </Link>
                <div className='cart-num'><p>{cartNum}</p></div>
            </div>
        );
    };

    // 2. Fix the search logic
    const hideSearchTitles = ['Product Details', 'My Cart', 'My Wishlist', 'Checkout'];
    const shouldShowSearch = !hideSearchTitles.includes(title) || search === "true";

    return (
        <div className='category-header-wrapper'> {/* New wrapper for sticky styling */}
            <div className='category-head flex justsb'>
                <div className='back-icon' onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                    <ArrowBackOutlinedIcon />
                </div>
                
                <p className="header-title">{title}</p>
                
                <div className="header-right-action">
                    {renderRightIcon()}
                </div>
            </div>
            
            {shouldShowSearch && <HeaderSearch />}
        </div>
    );
}