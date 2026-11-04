import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader';
import Toast from '../utils/Toast';
import ButtonLoader from '../utils/buttonLoader';
import UserAvatar from '../utils/UserAvatar'; 
import { useUser } from '../context/UserContext';
import nigeriaStates from '../components/nigeriaStateAndLgas.json';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import './EditProfile.css';

export default function EditProfile() {
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phone: '',
    acct_name: '',
    acct_number: '',
    bank: '',
    state: '',
    lga: '',
    address: '',
    description: '',
    photo: '',
  });


  const [selectedState, setSelectedState] = useState('');
  const [selectedLga, setSelectedLga] = useState('');

  const banks = ["UBA", "First Bank", "Unity Bank", "Access Bank", "GTBank", "Zenith Bank"];
  const isVendor = user?.accountType === "Vendor";

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch("https://api.pmall.com.ng/api/v1/profile", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        });
        const result = await res.json();
        const cleanUser = result?.data?.user;

        if (cleanUser) {
          setFormData({
            fname: cleanUser.fname || '',
            lname: cleanUser.lname || '',
            phone: cleanUser.phone || '',
            acct_name: cleanUser.acct_name || '',
            acct_number: cleanUser.acct_number || '',
            bank: cleanUser.bank || '',
            state: cleanUser.state || '',
            lga: cleanUser.lga || '',
            address: cleanUser.address || '',
            description: cleanUser.description || '',
            photo: cleanUser.photo || '',
          });
          setSelectedState(cleanUser.state || '');
          setSelectedLga(cleanUser.lga || '');
        }
      } catch (err) {
        console.error(err);
        setToast({ message: "Failed to load profile", type: "error" });
      }
    };
    getProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setSelectedLga(''); // Reset LGA
    setFormData({ ...formData, state: newState, lga: '' });
  };

  const handleLgaChange = (e) => {
    const newLga = e.target.value;
    setSelectedLga(newLga);
    setFormData({ ...formData, lga: newLga });
  };

  const selectedStateData = nigeriaStates.find((s) => s.state === selectedState);
  const lgas = selectedStateData ? selectedStateData.lgas : [];

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Optional: Show a temporary loading state for the image
    const formDataObj = new FormData();
    formDataObj.append("file", file);

    try {
      const res = await fetch("https://api.pmall.com.ng/api/v1/products/upload-file", {
        method: "POST",
        body: formDataObj,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      });
      const data = await res.json();
      setFormData((prev) => ({ ...prev, photo: data.url }));
      setToast({ message: "Image uploaded successfully", type: "success" });
    } catch (error) {
      console.error(error);
      setToast({ message: "Failed to upload image", type: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = user?.token || localStorage.getItem("authToken");

    try {
      const response = await fetch('https://api.pmall.com.ng/api/v1/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setToast({ message: "Profile updated successfully!", type: "success" });
        setTimeout(() => navigate("/profile"), 1500);
      } else {
        let errorMsg = "Failed to update profile.";
        if (typeof data?.message === 'string') errorMsg = data.message;
        else if (data?.errors) {
          const firstError = Object.values(data.errors)[0];
          errorMsg = Array.isArray(firstError) ? firstError[0] : firstError;
        }
        setToast({ message: errorMsg, type: "error" });
      }
    } catch (error) {
      console.error(error);
      setToast({ message: "Network error. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ep-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <CategoryHeader title="Edit Profile" image="true" />

      <form className="ep-form" onSubmit={handleSubmit}>
        <div className="ep-avatar-section">
          <div className="ep-avatar-wrap">
            {formData.photo ? (
              <img src={formData.photo} alt="Profile" className="ep-avatar-img" />
            ) : (
              <UserAvatar name={formData.fname || formData.lname} size={90} />
            )}
            <label htmlFor="avatar-upload" className="ep-avatar-badge">
              <CameraAltIcon fontSize="small" />
            </label>
            <input 
              id="avatar-upload" 
              type="file" 
              accept=".jpg,.png,.jpeg" 
              onChange={handleImageUpload} 
              hidden 
            />
          </div>
          <p className="ep-avatar-hint">Tap the camera to change your photo</p>
        </div>

        {/* CARD 1: Personal Info */}
        <div className="ep-card">
          <div className="ep-card-header">
            <PersonOutlineIcon className="ep-icon" />
            <h3>Personal Information</h3>
          </div>

          <div className="ep-row">
            <div className="ep-input-group">
              <label>First Name</label>
              <input type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="e.g. Roy" />
            </div>
            <div className="ep-input-group">
              <label>Last Name</label>
              <input type="text" name="lname" value={formData.lname} onChange={handleChange} placeholder="e.g. Linus" />
            </div>
          </div>

          <div className="ep-input-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 0803 000 0000" />
          </div>
        </div>

        {/* CARD 2: Bank Details */}
        <div className="ep-card">
          <div className="ep-card-header">
            <AccountBalanceOutlinedIcon className="ep-icon" />
            <h3>Bank Details</h3>
          </div>

          <div className="ep-input-group">
            <label>Bank Name</label>
            <select name="bank" value={formData.bank} onChange={handleChange}>
              <option value="">Select Bank</option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>

          <div className="ep-input-group">
            <label>Account Name</label>
            <input type="text" name="acct_name" value={formData.acct_name} onChange={handleChange} placeholder="e.g. Roy Linus Theo" />
          </div>

          <div className="ep-input-group">
            <label>Account Number</label>
            <input type="text" name="acct_number" value={formData.acct_number} onChange={handleChange} placeholder="e.g. 0012345678" />
          </div>
        </div>

        {/* CARD 3: Location */}
        <div className="ep-card">
          <div className="ep-card-header">
            <LocationOnOutlinedIcon className="ep-icon" />
            <h3>Location Details</h3>
          </div>

          <div className="ep-row">
            <div className="ep-input-group">
              <label>State</label>
              <select name="state" value={selectedState} onChange={handleStateChange}>
                <option value="">Select State</option>
                {nigeriaStates.map((s) => (
                  <option key={s.state} value={s.state}>{s.state}</option>
                ))}
              </select>
            </div>

            <div className="ep-input-group">
              <label>LGA</label>
              <select name="lga" value={selectedLga} onChange={handleLgaChange} disabled={!selectedState}>
                <option value="">Select LGA</option>
                {lgas.map((lga) => (
                  <option key={lga} value={lga}>{lga}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="ep-input-group">
            <label>Street Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your full address" />
          </div>
        </div>

        {/* CARD 4: Vendor Details (Conditional) */}
        {isVendor && (
          <div className="ep-card">
            <div className="ep-card-header">
              <InfoOutlinedIcon className="ep-icon" />
              <h3>Vendor Information</h3>
            </div>

            <div className="ep-input-group">
              <label>Account Type</label>
              <input type="text" name="acct_type" value={formData.acct_type || ''} onChange={handleChange} placeholder="e.g. Corporate" />
            </div>

            <div className="ep-input-group">
              <label>Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Describe your business..." 
                rows={3}
              />
            </div>
          </div>
        )}

        {/* STICKY FOOTER */}
        <div className="ep-sticky-footer">
          <button type="button" className="ep-btn-cancel" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="ep-btn-submit" disabled={loading}>
            {loading ? <ButtonLoader /> : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  );
}