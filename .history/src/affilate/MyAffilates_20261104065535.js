import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader';
import Toast from '../utils/Toast';
import UserAvatar from '../utils/UserAvatar'; // Assuming you placed it in utils
import { BASE_URL } from '../utils/config';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import './MyAffiliates.css';

export default function MyAffiliates() {
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const getAffiliates = () => {
    fetch(`${BASE_URL}/get-all-affiliates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setAffiliates(result?.data?.affiliates || []);
      })
      .catch((err) => {
        console.error(err);
        setToast({ message: "Failed to load affiliates", type: "error" });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAffiliates();
  }, []);

  const totalAffiliates = affiliates.length;
  const activeAffiliates = affiliates.filter(a => a.status === "1" || a.isActive).length;

  return (
    <div className="ma-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <CategoryHeader title="My Affiliates" image="true" />

      <div className="ma-stats-banner">
        <div className="ma-stat-box">
          <PeopleAltOutlinedIcon className="ma-stat-icon" />
          <div>
            <p>Total Affiliates</p>
            <h3>{loading ? "..." : totalAffiliates}</h3>
          </div>
        </div>
        <div className="ma-stat-divider"></div>
        <div className="ma-stat-box">
          <CheckCircleOutlinedIcon className="ma-stat-icon text-green" />
          <div>
            <p>Active</p>
            <h3>{loading ? "..." : activeAffiliates}</h3>
          </div>
        </div>
      </div>

      <div className="ma-list-container">
        {loading ? (
          <div className="ma-loading">Loading affiliates...</div>
        ) : affiliates.length === 0 ? (
          <div className="ma-empty-state">
            <UserAvatar name="?" size={80} className="mb-4" />
            <h3>No Affiliates Yet</h3>
            <p>You haven't added any affiliates to your network.</p>
          </div>
        ) : (
          affiliates.map((item) => {
            const isActive = item.status === "1" || item.isActive;
            
            return (
              <div className="ma-card" key={item.id}>
                <div className="ma-card-header">
                  <div className="ma-user-info">
                    <UserAvatar name={item.fname || item.username} size={48} />
                    <div className="ma-name-group">
                      <h3 className="ma-fullname">{item.fname} {item.lname}</h3>
                      <p className="ma-username">@{item.username}</p>
                    </div>
                  </div>
                  <div className={`ma-status ${isActive ? 'active' : 'inactive'}`}>
                    {isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>

                <div className="ma-card-body">
                  <div className="ma-contact-row">
                    <EmailOutlinedIcon className="ma-icon" />
                    <span>{item.email}</span>
                  </div>
                  <div className="ma-contact-row">
                    <PhoneOutlinedIcon className="ma-icon" />
                    <span>{item.phone}</span>
                  </div>
                </div>

                <div className="ma-card-footer">
                  <div className="ma-ref-id">
                    Ref: <span>{item.my_ref_id}</span>
                  </div>
                  <div className="ma-actions">
                    <button className="ma-action-btn edit" aria-label="Edit">
                      <EditOutlinedIcon fontSize="small" />
                    </button>
                    <button className="ma-action-btn delete" aria-label="Delete">
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Link to="/affiliate/add-affiliate" className="ma-fab">
        <AddIcon />
      </Link>
    </div>
  );
}