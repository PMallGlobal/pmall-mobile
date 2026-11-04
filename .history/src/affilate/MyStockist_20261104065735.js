import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader';
import UserAvatar from '../utils/UserAvatar';
import Toast from '../utils/Toast';

// Icons
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import './MyStockist.css';

export default function MyStockist() {
  const [stockists, setStockists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const getStockists = () => {
    setLoading(true);
    fetch("https://api.pmall.com.ng/api/v1/stockists/affiliate_stockist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setStockists(result?.data || []);
      })
      .catch((err) => {
        console.error(err);
        setToast({ message: "Failed to load stockists", type: "error" });
      })
      .finally(() => setLoading(false));
  };

  const deleteStockist = (id) => {
    if (!window.confirm('Are you sure you want to delete this stockist?')) return;

    fetch(`https://api.pmall.com.ng/api/v1/stockists/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result.status) {
          setToast({ message: "Stockist deleted successfully", type: "success" });
          getStockists(); 
        } else {
          setToast({ message: result.message || "Failed to delete stockist", type: "error" });
        }
      })
      .catch((err) => {
        console.error(err);
        setToast({ message: "Network error while deleting", type: "error" });
      });
  };

  useEffect(() => {
    getStockists();
  }, []);

  // Derived Stats
  const totalStockists = stockists.length;
  const activeStockists = stockists.filter(s => s.is_active == "1").length;

  return (
    <div className="ms-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <CategoryHeader title="My Stockists" image="true" />

      <div className="ms-stats-banner">
        <div className="ms-stat-box">
          <LocalShippingOutlinedIcon className="ms-stat-icon" />
          <div>
            <p>Total Stockists</p>
            <h3>{loading ? "..." : totalStockists}</h3>
          </div>
        </div>
        <div className="ms-stat-divider"></div>
        <div className="ms-stat-box">
          <CheckCircleOutlinedIcon className="ms-stat-icon text-green" />
          <div>
            <p>Active</p>
            <h3>{loading ? "..." : activeStockists}</h3>
          </div>
        </div>
      </div>

      <div className="ms-list-container">
        {loading ? (
          <div className="ms-loading">Loading stockists...</div>
        ) : stockists.length === 0 ? (
          <div className="ms-empty-state">
            <LocalShippingOutlinedIcon style={{ fontSize: 60, color: '#d1d5db' }} />
            <h3>No Stockists Yet</h3>
            <p>You haven't added any stockists to your network.</p>
            <Link to="/affiliate/add-stockist" className="ms-empty-btn">Add Your First Stockist</Link>
          </div>
        ) : (
          stockists.map((data) => {
            const isActive = data.is_active == "1";
            const locationText = [data.city, data.state, data.country].filter(Boolean).join(', ');

            return (
              <div className="ms-card" key={data.id}>
                <div className="ms-card-header">
                  <div className="ms-user-info">
                    <UserAvatar name={data.name} size={48} />
                    <div className="ms-name-group">
                      <h3 className="ms-name">{data.name}</h3>
                      <p className="ms-email">
                        <EmailOutlinedIcon style={{ fontSize: 14, marginRight: 4, verticalAlign: 'middle' }} />
                        {data.email}
                      </p>
                    </div>
                  </div>
                  <div className={`ms-status ${isActive ? 'active' : 'inactive'}`}>
                    {isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>

                <div className="ms-card-body">
                  {locationText && (
                    <div className="ms-info-row">
                      <LocationOnOutlinedIcon className="ms-icon" />
                      <span>{locationText}</span>
                    </div>
                  )}
                  {data.phone && (
                    <div className="ms-info-row">
                      <PhoneOutlinedIcon className="ms-icon" />
                      <span>{data.phone}</span>
                    </div>
                  )}
                  {data.address && (
                    <div className="ms-info-row">
                      <StorefrontOutlinedIcon className="ms-icon" />
                      <span className="ms-address">{data.address}</span>
                    </div>
                  )}
                </div>

                <div className="ms-card-footer">
                  <div className="ms-id">
                    ID: <span>{data.id}</span>
                  </div>
                  <div className="ms-actions">
                    <Link to={`/affiliate/edit-stockist/${data.id}`} className="ms-action-btn edit">
                      <EditOutlinedIcon fontSize="small" />
                    </Link>
                    <button className="ms-action-btn delete" onClick={() => deleteStockist(data.id)}>
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Link to="/affiliate/add-stockist" className="ms-fab">
        <AddIcon />
      </Link>
    </div>
  );
}