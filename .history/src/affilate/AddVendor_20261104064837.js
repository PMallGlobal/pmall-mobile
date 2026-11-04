import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader';
import { useUser } from '../context/UserContext';
import Toast from '../utils/Toast';
import { BASE_URL } from "../utils/config"; 
import ButtonLoader from '../utils/buttonLoader';

// Icons
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import './AddVendor.css';

export default function AddVendor() {
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  
  const [allAffiliates, setAllAffiliates] = useState([]);
  const [vendorPackages, setVendorPackages] = useState([]);
  const [selectParent, setSelectParent] = useState("yes");

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    store_name: "",
    ref_id: "",
    package_id: "",
  });

  // Generate URL preview based on store name
  const storeUrlPreview = formData.store_name
    ? `https://pmall.ng/${formData.store_name.toLowerCase().replace(/\s+/g, '_')}`
    : 'https://pmall.ng/your_store_name';

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Optimized fetch with Promise.all
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        setDataLoading(true);
        const token = user?.token || localStorage.getItem("authToken");

        const [affiliatesRes, packagesRes] = await Promise.all([
          fetch(`${BASE_URL}/get-all-affiliates`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
          }),
          fetch(`${BASE_URL}/account-packages/all`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
          }),
        ]);

        const affiliatesData = await affiliatesRes.json();
        const packagesData = await packagesRes.json();

        setAllAffiliates(affiliatesData?.data?.affiliates || []);

        const filteredPackages = (packagesData?.data?.packages || []).filter(
          (pkg) => pkg.type === "Vendor"
        );
        setVendorPackages(filteredPackages);

        // Auto-select first package
        if (filteredPackages.length > 0) {
          setFormData((prev) => ({ ...prev, package_id: filteredPackages[0].id }));
        }
      } catch (err) {
        console.error(err);
        setToast({ message: "Failed to load form data", type: "error" });
      } finally {
        setDataLoading(false);
      }
    };

    fetchFormData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = user?.token || localStorage.getItem("authToken");

    try {
      const response = await fetch(`${BASE_URL}/register/vendor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        let errorMsg = "Failed to register vendor";
        if (typeof result?.message === 'string') errorMsg = result.message;
        else if (result?.errors) {
          const firstError = Object.values(result.errors)[0];
          errorMsg = Array.isArray(firstError) ? firstError[0] : firstError;
        }
        setToast({ message: errorMsg, type: "error" });
        setLoading(false);
      } else {
        setToast({ message: "Vendor registered! Redirecting to payment...", type: "success" });
        
        // Safely redirect to Paystack
        if (result.data?.payment?.original?.authorization_url) {
          setTimeout(() => {
            window.location.href = result.data.payment.original.authorization_url;
          }, 1500);
        } else {
          setTimeout(() => navigate('/affiliate/my-vendors'), 1500);
        }
      }
    } catch (error) {
      console.error(error);
      setToast({ message: "Network error. Please try again.", type: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="av-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <CategoryHeader title="Add New Vendor" image="true" />

      <form className="av-form" onSubmit={handleSubmit}>
        
        {/* CARD 1: Personal Information */}
        <div className="av-card">
          <div className="av-card-header">
            <PersonOutlineIcon className="av-header-icon" />
            <h3>Personal Information</h3>
          </div>

          <div className="av-row">
            <div className="av-input-group">
              <label>First Name *</label>
              <input 
                type="text" 
                name="fname" 
                onChange={onChangeHandler} 
                value={formData.fname} 
                placeholder="e.g. Adamu" 
                required 
              />
            </div>
            <div className="av-input-group">
              <label>Last Name *</label>
              <input 
                type="text" 
                name="lname" 
                onChange={onChangeHandler} 
                value={formData.lname} 
                placeholder="e.g. Norris" 
                required 
              />
            </div>
          </div>

          <div className="av-input-group">
            <label>Email Address *</label>
            <input 
              type="email" 
              name="email" 
              onChange={onChangeHandler} 
              value={formData.email} 
              placeholder="email@domain.com" 
              required 
            />
          </div>

          <div className="av-input-group">
            <label>Phone Number *</label>
            <input 
              type="tel" 
              name="phone" 
              onChange={onChangeHandler} 
              value={formData.phone} 
              placeholder="e.g. 0803 000 0000" 
              required 
            />
          </div>
        </div>

        {/* CARD 2: Store Details */}
        <div className="av-card">
          <div className="av-card-header">
            <StorefrontOutlinedIcon className="av-header-icon" />
            <h3>Store Details</h3>
          </div>

          <div className="av-input-group">
            <label>Store Name *</label>
            <input 
              type="text" 
              name="store_name" 
              onChange={onChangeHandler} 
              value={formData.store_name} 
              placeholder="e.g. Hooli Stores" 
              required 
            />
          </div>

          <div className="av-input-group">
            <label>Store URL (Auto-generated)</label>
            <div className="av-url-preview">
              <LinkOutlinedIcon className="av-url-icon" />
              <span>{storeUrlPreview}</span>
            </div>
          </div>
        </div>


        <div className="av-card">
          <div className="av-card-header">
            <AccountTreeOutlinedIcon className="av-header-icon" />
            <h3>Network & Package</h3>
          </div>

          <div className="av-input-group">
            <label>Do you want to assign a Parent Affiliate?</label>
            <div className="av-segmented-control">
              <button 
                type="button" 
                className={selectParent === 'yes' ? 'active' : ''} 
                onClick={() => setSelectParent('yes')}
              >
                Yes, select parent
              </button>
              <button 
                type="button" 
                className={selectParent === 'no' ? 'active' : ''} 
                onClick={() => setSelectParent('no')}
              >
                No, use custom ID
              </button>
            </div>
          </div>

          {selectParent === "yes" ? (
            <div className="av-input-group mt-4">
              <label>Choose Parent Affiliate</label>
              <select name="ref_id" onChange={onChangeHandler} value={formData.ref_id}>
                <option value="">-- Choose an affiliate --</option>
                {allAffiliates.map((affiliate) => (
                  <option key={affiliate.id} value={affiliate.my_ref_id}>
                    {affiliate.fname} {affiliate.lname} ({affiliate.my_ref_id})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="av-input-group mt-4">
              <label>Custom Affiliate ID</label>
              <input 
                type="text" 
                name="ref_id" 
                onChange={onChangeHandler} 
                value={formData.ref_id} 
                placeholder="e.g. PM-000000" 
              />
            </div>
          )}

          <div className="av-input-group mt-4">
            <label>Vendor Package *</label>
            <select 
              name="package_id" 
              onChange={onChangeHandler} 
              value={formData.package_id} 
              required
            >
              <option value="" disabled>Select a Package</option>
              {vendorPackages.map((pack) => (
                <option key={pack.id} value={pack.id}>
                  {pack.name} — ₦{Number(pack.price).toLocaleString()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="av-sticky-footer">
          <button type="button" className="av-btn-cancel" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button 
            type="submit" 
            className="av-btn-submit" 
            disabled={loading || dataLoading}
          >
            {loading ? <ButtonLoader /> : "Register Vendor"}
          </button>
        </div>
      </form>
    </div>
  );
}