import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser, useLogOut } from "../context/UserContext";
import { useVendorr } from '../context/VendorSignupContext';
import { useVendor } from '../context/AuthContext';
import { copyToClipboard } from "../utils/copyTextToClipboard";
import { BASE_URL } from '../utils/config';
import Toast from "../utils/Toast";
import Footer from '../components/footer';

// MUI Icons
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LogoutIcon from '@mui/icons-material/Logout';
import BackpackIcon from '@mui/icons-material/Backpack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './Dashboard.css'; 

export default function Dashboard() {
  const { user } = useUser();
  const logOut = useLogOut();
  const { vendorProductAmt, wallet, orderAmt } = useVendorr();
  const { setLoading } = useVendor();
  
  const [vendorCount, setVendorCount] = useState(0);
  const [affiliateCount, setAffiliateCount] = useState(0);
  const [allDownlines, setAllDownlines] = useState([]);
  const [toast, setToast] = useState(null);

  const addCommas = (val) => Number(val || 0).toLocaleString();

  const handleCopy = () => {
    if (!user?.refId) {
      setToast({ message: "No referral ID found!", type: "error" });
      setTimeout(() => setToast(null), 5000);
      return;
    }
  
    copyToClipboard(
      `https://pmall.com.ng/auth/app/Signup?refLink=${user.refId}`, 
      (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 5000);
      }
    );
  };

  const getMyNetwork = () => {
    setLoading(true);
    fetch(`${BASE_URL}/profile/hierarchy-all-downline`, {
      headers: { Accept: "application/json", Authorization: "Bearer " + user?.token },
    })
      .then((resp) => resp.json())
      .then((result) => {
        const downlines = result?.data?.allDownline || [];
        setAffiliateCount(downlines.filter(item => item.user_type === "Affiliate").length);
        setVendorCount(downlines.filter(item => item.user_type === "Vendor").length);
        setAllDownlines(downlines);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getMyNetwork();
  }, []);

  const isVendor = user?.accountType === "Vendor";

  return (
    <div className="db-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      
      <header className="db-header">
        <div>
          <p className="db-greeting">Welcome back,</p>
          <h2 className="db-name">{user?.fname} {user?.lname}</h2>
          <div className="db-badge" onClick={handleCopy}>
            {user?.accountType} • {user?.refId}
            <ContentCopyIcon style={{ fontSize: 14, marginLeft: 6 }} />
          </div>
        </div>
        <img 
          src={user?.userAvatar || `https://ui-avatars.com/api/?name=${user?.fname}+${user?.lname}&background=6d28d9&color=fff`} 
          alt="Profile" 
          className="db-avatar" 
        />
      </header>

      
      <section className="db-wallet-card">
        <div className="db-wallet-top">
          <div>
            <p className="db-wallet-label">Available Balance</p>
            <h1 className="db-wallet-amount">
              <span className="currency">₦</span>{addCommas(wallet?.amount)}
            </h1>
          </div>
          <div className="db-wallet-icon">
            <AccountBalanceWalletIcon fontSize="large" />
          </div>
        </div>
        
        <div className="db-wallet-bottom">
          <div className="db-wallet-sub">
            <p>PMT Wallet</p>
            <h4>₦{addCommas(wallet?.pmt)}</h4>
          </div>
          <div className="db-wallet-sub border-left">
            <p>Point Value (PV)</p>
            <h4>{addCommas(wallet?.pv)}</h4>
          </div>
          <Link to="/withdraw-funds" className="db-withdraw-btn">
            Withdraw
          </Link>
        </div>
      </section>

      {user?.accountType === "Vendor" && }
      <section className="db-referral-banner" onClick={handleCopy}>
        <div>
          <h4>Invite & Earn</h4>
          <p>Share your link to grow your network</p>
        </div>
        <button className="db-share-btn">Copy Link</button>
      </section>

      
      <section className="db-stats-grid">
        {isVendor ? (
          <>
            <div className="db-stat-card">
              <div className="db-stat-icon purple"><ShoppingBagIcon /></div>
              <div>
                <p>Total Orders</p>
                <h3>{orderAmt || 0}</h3>
              </div>
            </div>
            <div className="db-stat-card">
              <div className="db-stat-icon yellow"><StorefrontIcon /></div>
              <div>
                <p>Products</p>
                <h3>{vendorProductAmt || 0}</h3>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="db-stat-card">
              <div className="db-stat-icon purple"><PeopleAltIcon /></div>
              <div>
                <p>My Affiliates</p>
                <h3>{affiliateCount}</h3>
              </div>
            </div>
            <div className="db-stat-card">
              <div className="db-stat-icon yellow"><StorefrontIcon /></div>
              <div>
                <p>My Vendors</p>
                <h3>{vendorCount}</h3>
              </div>
            </div>
          </>
        )}
      </section>

      {/* QUICK LINKS */}
      <section className="db-quick-links">
        <h3 className="db-section-title">Quick Links</h3>
        <div className="db-links-list">
          
          {isVendor ? (
            <>
              <Link to={`/vendor/${user?.storeId}`} className="db-link-item">
                <div className="db-link-left"><StorefrontIcon className="text-purple" /> My Store</div>
                <ChevronRightIcon className="text-gray" />
              </Link>
              <Link to="/products" className="db-link-item">
                <div className="db-link-left"><ShoppingBagIcon className="text-purple" /> Manage Products</div>
                <ChevronRightIcon className="text-gray" />
              </Link>
              <Link to="/vendor/orders" className="db-link-item">
                <div className="db-link-left"><TrendingUpIcon className="text-purple" /> Orders & Transactions</div>
                <ChevronRightIcon className="text-gray" />
              </Link>
            </>
          ) : (
            <>
              <Link to="/affiliate-management" className="db-link-item">
                <div className="db-link-left"><PeopleAltIcon className="text-purple" /> Affiliates Management</div>
                <ChevronRightIcon className="text-gray" />
              </Link>
              <Link to="/affiliate/genealogy" className="db-link-item">
                <div className="db-link-left"><AccountTreeIcon className="text-purple" /> Genealogy Tree</div>
                <ChevronRightIcon className="text-gray" />
              </Link>
              <Link to="/iRecharge" className="db-link-item">
                <div className="db-link-left"><PhoneAndroidIcon className="text-purple" /> iRecharge</div>
                <ChevronRightIcon className="text-gray" />
              </Link>
            </>
          )}

          <Link to="/withdraw-funds" className="db-link-item">
            <div className="db-link-left"><AccountBalanceWalletIcon className="text-purple" /> Fund Withdrawal</div>
            <ChevronRightIcon className="text-gray" />
          </Link>
          <Link to="/" className="db-link-item">
            <div className="db-link-left"><BackpackIcon className="text-purple" /> Back to Mall</div>
            <ChevronRightIcon className="text-gray" />
          </Link>
          
          <div className="db-link-item logout" onClick={logOut}>
            <div className="db-link-left"><LogoutIcon className="text-red" /> Log Out</div>
            <ChevronRightIcon className="text-gray" />
          </div>
        </div>
      </section>

      <Footer vendorIn={isVendor} />
    </div>
  );
}