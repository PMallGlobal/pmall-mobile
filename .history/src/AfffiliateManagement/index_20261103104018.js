import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader';
import { useUser } from '../context/UserContext';
import { BASE_URL } from '../utils/config';

// Modern Icons
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import './AffiliateManagement.css';

export default function AffiliateManagement() {
  const { user } = useUser();
  const [counts, setCounts] = useState({ affiliates: 0, vendors: 0, stockists: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the downline data to populate the dashboard numbers
    const fetchNetworkData = async () => {
      if (!user?.token) return;
      
      try {
        const res = await fetch(`${BASE_URL}/profile/hierarchy-all-downline`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + user?.token,
          },
        });
        const result = await res.json();
        
        const downlines = result?.data?.allDownline || [];
        
        setCounts({
          affiliates: downlines.filter(item => item.user_type === "Affiliate").length,
          vendors: downlines.filter(item => item.user_type === "Vendor").length,
          stockists: downlines.filter(item => item.user_type === "Stockist").length,
          total: downlines.length
        });
      } catch (err) {
        console.error("Failed to fetch network data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkData();
  }, [user?.token]);

  return (
    <div className='am-page'>
      <CategoryHeader title="Affiliate Management" image="true" />

      {/* Hero Summary Card */}
      <div className="am-summary-card">
        <div className="am-summary-icon">
          <NetworkCheckIcon fontSize="large" />
        </div>
        <div className="am-summary-info">
          <p>Total Network Size</p>
          <h2>{loading ? "..." : counts.total}</h2>
          <span>Members in your downline</span>
        </div>
      </div>

      <div className="am-section-title">
        <h3>Manage Network</h3>
      </div>

      {/* Management Links */}
      <div className="am-list-container">
        <Link to="/affiliate/my-affiliates" className="am-link-card">
          <div className="am-link-icon bg-purple">
            <PeopleAltIcon />
          </div>
          <div className="am-link-content">
            <h4>My Affiliates</h4>
            <p>View and manage your downlines</p>
          </div>
          <div className="am-link-right">
            {!loading && <span className="am-badge">{counts.affiliates}</span>}
            <ChevronRightIcon className="am-chevron" />
          </div>
        </Link>

        <Link to="/affiliate/my-vendors" className="am-link-card">
          <div className="am-link-icon bg-yellow">
            <StorefrontIcon />
          </div>
          <div className="am-link-content">
            <h4>My Vendors</h4>
            <p>Track vendors in your network</p>
          </div>
          <div className="am-link-right">
            {!loading && <span className="am-badge">{counts.vendors}</span>}
            <ChevronRightIcon className="am-chevron" />
          </div>
        </Link>

        <Link to="/affiliate/my-stockists" className="am-link-card">
          <div className="am-link-icon bg-blue">
            <LocalShippingIcon />
          </div>
          <div className="am-link-content">
            <h4>My Stockists</h4>
            <p>Manage stockists and logistics</p>
          </div>
          <div className="am-link-right">
            {!loading && <span className="am-badge">{counts.stockists}</span>}
            <ChevronRightIcon className="am-chevron" />
          </div>
        </Link>
      </div>
      <Footer Affiliate={true} />  
    </div>
  );
}