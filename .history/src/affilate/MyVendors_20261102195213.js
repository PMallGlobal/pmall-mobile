import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader';
import Toast from '../utils/Toast';
import UserAvatar from '../utils/UserAvatar'; 
import { BASE_URL } from '../utils/config';

// Icons
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import './MyVendors.css';

export default function MyVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const getVendors = () => {
    fetch(`${BASE_URL}/get-all-vendors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setVendors(result?.data?.vendors || []);
      })
      .catch((err) => {
        console.error(err);
        setToast({ message: "Failed to load vendors", type: "error" });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getVendors();
  }, []);

  // Calculate Stats
  const totalVendors = vendors.length;
  const activeVendors = vendors.filter(v => v.status === "1" || v.isActive).length;

  return (
    <div className="mv-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <CategoryHeader title="My Vendors" image="true" />

      {/* DASHBOARD STATS BANNER */}
      <div className="mv-stats-banner">
        <div className="mv-stat-box">
          <StorefrontOutlinedIcon className="mv-stat-icon" />
          <div>
            <p>Total Vendors</p>
            <h3>{loading ? "..." : totalVendors}</h3>
          </div>
        </div>
        <div className="mv-stat-divider"></div>
        <div className="mv-stat-box">
          <CheckCircleOutlinedIcon className="mv-stat-icon text-green" />
          <div>
            <p>Active</p>
            <h3>{loading ? "..." : activeVendors}</h3>
          </div>
        </div>
      </div>

      {/* LIST CONTAINER */}
      <div className="mv-list-container">
        {loading ? (
          <div className="mv-loading">Loading vendors...</div>
        ) : vendors.length === 0 ? (
          <div className="mv-empty-state">
            <StorefrontOutlinedIcon style={{ fontSize: 60, color: '#d1d5db' }} />
            <h3>No Vendors Yet</h3>
            <p>You haven't added any vendors to your network.</p>
            <Link to="/add-vendor" className="mv-empty-btn">Add Your First Vendor</Link>
          </div>
        ) : (
          vendors.map((item) => {
            const isActive = item.status === "1" || item.isActive;
            const displayName = item.store_name || `${item.fname} ${item.lname}`;

            return (
              <div className="mv-card" key={item.id}>
                <div className="mv-card-header">
                  <div className="mv-user-info">
                    <UserAvatar name={displayName} size={48} />
                    <div className="mv-name-group">
                      <h3 className="mv-storename">{item.store_name || "Unnamed Store"}</h3>
                      <p className="mv-owner">{item.fname} {item.lname}</p>
                    </div>
                  </div>
                  <div className={`mv-status ${isActive ? 'active' : 'inactive'}`}>
                    {isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>

                <div className="mv-card-body">
                  <div className="mv-contact-row">
                    <EmailOutlinedIcon className="mv-icon" />
                    <span>{item.email || "N/A"}</span>
                  </div>
                  <div className="mv-contact-row">
                    <PhoneOutlinedIcon className="mv-icon" />
                    <span>{item.phone || "N/A"}</span>
                  </div>
                </div>

                <div className="mv-card-footer">
                  <div className="mv-ref-id">
                    ID: <span>{item.my_ref_id || item.store_id || "N/A"}</span>
                  </div>
                  <div className="mv-actions">
                    <button className="mv-action-btn edit" aria-label="Edit">
                      <EditOutlinedIcon fontSize="small" />
                    </button>
                    <button className="mv-action-btn delete" aria-label="Delete">
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* FLOATING ACTION BUTTON */}
      <Link to="/add-vendor" className="mv-fab">
        <AddIcon />
      </Link>
    </div>
  );
}