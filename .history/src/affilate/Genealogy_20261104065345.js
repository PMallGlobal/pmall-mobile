import React, { useState, useEffect } from 'react';
import CategoryHeader from '../components/CategoryHeader';
import { useUser } from '../context/UserContext'; 
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/config';

import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './Genealogy.css';

export default function Genealogy() {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [counts, setCounts] = useState({ 
    direct: 0, 
    indirect: 0, 
    total: 0, 
    affiliates: 0, 
    vendors: 0, 
    stockists: 0 
  });

  useEffect(() => {
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

        let direct = downlines.length;
        let indirect = 0;
        let affiliates = 0;
        let vendors = 0;
        let stockists = 0;

        const countRecursive = (users) => {
          users.forEach(u => {
            if (u.user_type === 'Affiliate') affiliates++;
            if (u.user_type === 'Vendor') vendors++;
            if (u.user_type === 'Stockist') stockists++;
            if (u.all_downline && u.all_downline.length > 0) {
              indirect += u.all_downline.length;
              countRecursive(u.all_downline);
            }
          });
        };
        countRecursive(downlines);

        setCounts({
          direct,
          indirect,
          total: direct + indirect,
          affiliates,
          vendors,
          stockists
        });

      } catch (err) {
        console.error("Failed to fetch network data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkData();
  }, [user?.token]);

  const referralId = user?.refId || "N/A";
  const accountType = user?.accountType || "Affiliate";
  
  const memberSince = user?.regDate 
    ? new Date(user.regDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
    : "N/A";

  const handleCopy = () => {
    if (!referralId || referralId === "N/A") return;
    navigator.clipboard.writeText(referralId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="gen-page">
      <CategoryHeader title="Genealogy Dashboard" image="true" />

      {/* HERO NETWORK CARD */}
      <div className="gen-hero-card">
        <div className="gen-hero-header">
          <div>
            <p className="gen-hero-label">Total Network Size</p>
            <h1 className="gen-hero-number">{loading ? "..." : counts.total}</h1>
          </div>
          <div className="gen-hero-icon">
            <AccountTreeOutlinedIcon fontSize="large" />
          </div>
        </div>

        <div className="gen-hero-stats">
          <div className="gen-stat-box">
            <p>Direct Referrals</p>
            <h4>{loading ? "-" : counts.direct}</h4>
          </div>
          <div className="gen-stat-box border-left">
            <p>Indirect Referrals</p>
            <h4>{loading ? "-" : counts.indirect}</h4>
          </div>
        </div>

        <Link to="/affiliate/genealogy/tree" className="gen-view-tree-btn">
          <ShareOutlinedIcon />
          View Full Genealogy Tree
          <ChevronRightIcon style={{ marginLeft: 'auto' }} />
        </Link>
      </div>

      {/* NETWORK BREAKDOWN */}
      <div className="gen-section">
        <h3 className="gen-section-title">Network Breakdown</h3>
        <div className="gen-grid-cards">
          <div className="gen-mini-card">
            <div className="gen-mini-icon bg-purple">
              <PeopleAltOutlinedIcon />
            </div>
            <div>
              <p>Affiliates</p>
              <h4>{loading ? "-" : counts.affiliates}</h4> 
            </div>
          </div>
          <div className="gen-mini-card">
            <div className="gen-mini-icon bg-yellow">
              <VerifiedUserIcon />
            </div>
            <div>
              <p>Vendors</p>
              <h4>{loading ? "-" : counts.vendors}</h4> 
            </div>
          </div>
        </div>
      </div>

      {/* ACCOUNT DETAILS */}
      <div className="gen-section">
        <h3 className="gen-section-title">Account Details</h3>
        <div className="gen-details-card">
          
          {/* Referral ID Row */}
          <div className="gen-detail-row">
            <span className="gen-detail-label">Referral ID</span>
            <div className="gen-detail-value interactive" onClick={handleCopy}>
              <span className="mono-font">{referralId}</span>
              {copied ? (
                <CheckCircleIcon className="copy-icon text-green" />
              ) : (
                <ContentCopyIcon className="copy-icon text-purple" />
              )}
            </div>
          </div>

          {/* Account Type Row */}
          <div className="gen-detail-row">
            <span className="gen-detail-label">Account Type</span>
            <div className="gen-detail-value">
              <span className="badge-purple">{accountType}</span>
            </div>
          </div>

          {/* Member Since Row */}
          <div className="gen-detail-row border-none">
            <span className="gen-detail-label">Member Since</span>
            <div className="gen-detail-value">
              <CalendarTodayIcon style={{ fontSize: 16, color: '#9ca3af', marginRight: 6 }} />
              {memberSince}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}