import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export default function Footer({vendorIn,stockist }) {
    const {user} = useUser()
  return (
    <div className='footer-cont'>
        {user?.accountType == "Vendor" ?
        <div className='footer'>
            <Link to="/dashboard">
                <div className='footer-item'>
                    <GridViewIcon className='footer-icon' />
                    <p>Dashboard</p>
                </div>
            </Link>
            <Link to={`/vendor/${user?.storeId}`} >
                <div className='footer-item'>
                    <StorefrontOutlinedIcon className='footer-icon' />
                    <p>My Store</p>
                </div>
            </Link>
            <Link to="/">
                <div className='footer-item'>
                    <BusinessCenterOutlinedIcon alt="" className='footer-icon' />
                    <p>Mall</p>
                </div>
            </Link><Link to="/orders">
                <div className='footer-item'>
                    <ShoppingBasketOutlinedIcon className='footer-icon' />
                    <p>My Orders</p>
                </div>
            </Link>
            <Link to="/menu">
                <div className='footer-item'>
                    <MenuOutlinedIcon className='footer-icon' />
                    <p>Menu</p>
            </div>
            </Link>
        </div> : stockist && !vendorIn ?
            <div className='footer'>
                <Link to="/dashboard">
                    <div className='footer-item'>
                        <DashboardOutlinedIcon className='footer-icon' />
                        <p>Dashboard</p>
                    </div>
                </Link>
                <Link to="/funds-withdrawal">
                    <div className='footer-item'>
                        <img src="/images/uil_money-withdraw.png" alt="" className='footer-icon' />
                        <p>Withdrawal</p>
                    </div>
                </Link>
                <div className='footer-item'>
                    <MessageOutlinedIcon className='footer-icon' />
                    <p>Chat</p>
                </div>
                <Link to="/menu">
                    <div className='footer-item'>
                        <MenuOutlinedIcon className='footer-icon' />
                        <p>Menu</p>
                    </div>
                </Link>
            </div> : user?.accountType == "Affiliate" ?
        <div className='footer'>
            <Link to="/">
                <div className='footer-item'>
                    <HomeOutlinedIcon className='footer-icon' />
                    <p>Mall</p>
                </div>
            </Link>
            <Link to="/affiliate/my-affiliates">
                <div className='footer-item'>
                    <img src="/images/affilates.png" alt="" className='footer-icon' />
                    <p>Affilates</p>
                </div>
            </Link>
            <Link to="/affiliate/my-vendors">
                <div className='footer-item'>
                    <img src="/images/courier.png" alt="" className='footer-icon' />
                    <p>My Vendor</p>
                </div>
            </Link>
            <Link to="/dashboard">
                <div className='footer-item'>
                    <img src="/images/Group (3).png" alt="" className='footer-icon' />
                    <p>dashboard</p>
                </div>
            </Link>
            <Link to="/profile">
                <div className='footer-item'>
                    <AccountCircleOutlinedIcon className='footer-icon' />
                    <p>Profile</p>
                </div>
            </Link>
        </div> :
        <div className='footer'>
            <Link to="/">
                <div className='footer-item'>
                    <HomeOutlinedIcon className='footer-icon' />
                    <p>Home</p>
                </div>
            </Link>
            <Link to="/cart">
                <div className='footer-item'>
                    <ShoppingCartOutlinedIcon className='footer-icon' />
                    <p>Cart</p>
                </div>
            </Link>
            <Link to="/wishlist">
                <div className='footer-item'>
                    <FavoriteBorderOutlinedIcon className='footer-icon' />
                    <p>Wishlist</p>
                </div>
            </Link>
            <Link to="/category">
                <div className='footer-item'>
                    <img src="/images/Group (3).png" alt="" className='footer-icon' />
                    <p>Category</p>
                </div>
            </Link>
            <Link to="/customer/profile">
                <div className='footer-item'>
                    <AccountCircleOutlinedIcon className='footer-icon' />
                    <p>Profile</p>
                </div>
            </Link>
        </div>
    }
    </div>
  )
}
