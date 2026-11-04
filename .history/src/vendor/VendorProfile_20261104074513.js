import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader';
import Toast from '../utils/Toast';
import UserAvatar from '../utils/UserAvatar'; // Assuming you have this
import { useUser } from '../context/UserContext';

// Icons
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import './VendorProfile.css';

export default function VendorProfile() {
  const { user } = useUser(); 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    const getProfileDetails = () => {
      fetch("https://api.pmall.com.ng/api/v1/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      })
        .then((resp) => resp.json())
        .then((result) => {
          setProfile(result.data.user);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    };

    getProfileDetails();
  }, []);

  const handleCopy = (text, field) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setToast({ message: "Copied to clipboard", type: "success" });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatRegDate = (isoDate) => {
    if (!isoDate) return "—";
    return new Date(isoDate).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  const isVendor = user?.accountType === "Vendor";

  return (
    <div className="vp-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <CategoryHeader title="My Profile" image="true" />

      {/* HERO PROFILE SECTION */}
      <div className="vp-hero">
        <div className="vp-avatar-wrap">
          <UserAvatar name={profile?.fname || profile?.username} size={90} />
          <div className="vp-cam-badge">
            <CameraAltIcon fontSize="small" />
          </div>
        </div>
        
        <h2 className="vp-name">
          {profile?.fname ? `${profile.fname} ${profile.lname}` : profile?.username}
        </h2>
        
        <div className="vp-badges">
          <span className="vp-badge type">{user?.accountType}</span>
          <span className="vp-badge ref-id" onClick={() => handleCopy(profile?.my_ref_id, 'ref')}>
            {profile?.my_ref_id}
            {copiedField === 'ref' ? <CheckCircleIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
          </span>
        </div>

        <Link to="/edit-profile" className="vp-edit-btn">
          <EditOutlinedIcon fontSize="small" />
          Edit Profile
        </Link>
      </div>

      {/* ACCOUNT DETAILS CARD */}
      <div className="vp-card">
        <div className="vp-card-title">
          <PersonOutlineIcon className="vp-icon" />
          <h3>Account Details</h3>
        </div>

        <div className="vp-row">
          <span className="vp-label">Username</span>
          <span className="vp-value">{profile?.username}</span>
        </div>

        <div className="vp-row">
          <span className="vp-label">Email</span>
          <span className="vp-value">{profile?.email}</span>
        </div>

        <div className="vp-row">
          <span className="vp-label">Telephone</span>
          <span className="vp-value">{profile?.phone || "Not provided"}</span>
        </div>

        <div className="vp-row">
          <span className="vp-label">Member Since</span>
          <span className="vp-value">{formatRegDate(profile?.created_at)}</span>
        </div>
      </div>

      {/* VENDOR DETAILS CARD (Only shows if Vendor) */}
      {isVendor && (
        <div className="vp-card">
          <div className="vp-card-title">
            <StorefrontOutlinedIcon className="vp-icon" />
            <h3>Store Information</h3>
          </div>

          <div className="vp-row">
            <span className="vp-label">Store Name</span>
            <span className="vp-value">{profile?.store_name || "Not set"}</span>
          </div>

          <div className="vp-row">
            <span className="vp-label">Store ID</span>
            <div className="vp-value copyable" onClick={() => handleCopy(profile?.store_id, 'store')}>
              {profile?.store_id || "N/A"}
              {copiedField === 'store' ? <CheckCircleIcon fontSize="small" className="text-green" /> : <ContentCopyIcon fontSize="small" />}
            </div>
          </div>

          <div className="vp-row">
            <span className="vp-label">Package</span>
            <span className="vp-value capitalize">{profile?.package?.name || "Standard"}</span>
          </div>
        </div>
      )}

      {/* BANK & LOCATION CARD */}
      <div className="vp-card">
        <div className="vp-card-title">
          <AccountBalanceOutlinedIcon className="vp-icon" />
          <h3>Bank & Location</h3>
        </div>

        {profile?.acct_number ? (
          <>
            <div className="vp-row">
              <span className="vp-label">Bank Name</span>
              <span className="vp-value">{profile?.bank}</span>
            </div>
            <div className="vp-row">
              <span className="vp-label">Account Name</span>
              <span className="vp-value">{profile?.acct_name}</span>
            </div>
            <div className="vp-row">
              <span className="vp-label">Account Number</span>
              <span className="vp-value mono">{profile?.acct_number}</span>
            </div>
          </>
        ) : (
          <div className="vp-empty-bank">
            <p>No bank account linked yet.</p>
            <Link to="/edit-profile" className="vp-add-bank-btn">Add Bank Details</Link>
          </div>
        )}

        <div className="vp-row border-top">
          <span className="vp-label">State</span>
          <span className="vp-value">{profile?.state || "Not set"}</span>
        </div>
        <div className="vp-row">
          <span className="vp-label">L.G.A</span>
          <span className="vp-value">{profile?.lga || "Not set"}</span>
        </div>
      </div>
    </div>
  );
}