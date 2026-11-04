import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader';
import { useUser } from '../context/UserContext';
import Toast from '../utils/Toast';
import { BASE_URL } from "../utils/config"; 
import ButtonLoader from '../utils/buttonLoader';
// Icons
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTree';
import './AddAffiliate.css';

export default function AddAffiliate() {
  const { user } = useUser(); // Fixed: useUser returns { user }
  const navigate = useNavigate();
  
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  
  const [affiliatePackages, setAffiliatePackages] = useState([]);
  const [allAffiliates, setAllAffiliates] = useState([]);
  
  const [selectParent, setSelectParent] = useState("yes");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    ref_id: "",
    package_id: "",
  });

  // Optimized Data Fetching using Promise.all
  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        const token = user?.token || localStorage.getItem("authToken");

        const [affiliatesRes, packagesRes] = await Promise.all([
          fetch(`${BASE_URL}/get-all-affiliates`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
          }),
          fetch(`${BASE_URL}/account-packages/all`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
          })
        ]);

        const affiliatesData = await affiliatesRes.json();
        const packagesData = await packagesRes.json();

        setAllAffiliates(affiliatesData?.data?.affiliates || []);
        
        const filteredPackages = (packagesData?.data?.packages || []).filter(pkg => pkg.type === "Affiliate");
        setAffiliatePackages(filteredPackages);
        
        // Set default package if available
        if (filteredPackages.length > 0) {
          setFormData(prev => ({ ...prev, package_id: filteredPackages[0].id }));
        }

      } catch (err) {
        console.error(err);
        setToast({ message: "Failed to load form data", type: "error" });
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = user?.token || localStorage.getItem("authToken");

    try {

      const response = await fetch(`${BASE_URL}/payments/initialize-affiliate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      if (result.authorization_url) {
        window.location.href = result.authorization_url; 
      }

      

      if (!response.ok) {
        setToast({ message: result.message || "Failed to register affiliate", type: "error" });
        setLoading(false);
      } else {
        setToast({ message: result.message || "Affiliate registered successfully!", type: "success" });
        
        // Redirect to payment
        if (result.data?.payment?.original?.authorization_url) {
          window.location.href = result.data.payment.original.authorization_url;
        } else {
          setTimeout(() => navigate('/affiliate/my-affiliates'), 2000);
        }
      }
    } catch (error) {
      console.error(error);
      setToast({ message: "Network error. Please try again.", type: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="af-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <CategoryHeader title="Add New Affiliate" image="true" />

      <form className="af-form" onSubmit={handleSubmit}>
        
        {/* CARD 1: Personal Info */}
        <div className="af-card">
          <div className="af-card-header">
            <PersonOutlineIcon className="af-header-icon" />
            <h3>Personal Information</h3>
          </div>
          
          <div className="af-row">
            <div className="af-input-group">
              <label>First Name *</label>
              <input type="text" name="fname" onChange={onChangeHandler} value={formData.fname} placeholder="e.g. Ahmed" required />
            </div>
            <div className="af-input-group">
              <label>Last Name *</label>
              <input type="text" name="lname" onChange={onChangeHandler} value={formData.lname} placeholder="e.g. Peter" required />
            </div>
          </div>

          <div className="af-input-group">
            <label>Email Address *</label>
            <input type="email" name="email" onChange={onChangeHandler} value={formData.email} placeholder="email@domain.com" required />
          </div>

          <div className="af-input-group">
            <label>Phone Number *</label>
            <input type="tel" name="phone" onChange={onChangeHandler} value={formData.phone} placeholder="e.g. 0803 000 0000" required />
          </div>
        </div>

        {/* CARD 2: Account Credentials */}
        <div className="af-card">
          <div className="af-card-header">
            <LockOutlinedIcon className="af-header-icon" />
            <h3>Account Security</h3>
          </div>

          <div className="af-input-group">
            <label>Username *</label>
            <input type="text" name="username" onChange={onChangeHandler} value={formData.username} placeholder="Create a unique username" required />
          </div>

          <div className="af-input-group">
            <label>Password *</label>
            <div className="af-password-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                onChange={onChangeHandler} 
                value={formData.password} 
                placeholder="Create a strong password" 
                required 
              />
              <button type="button" className="af-toggle-pwd" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* CARD 3: Network Setup */}
        <div className="af-card">
          <div className="af-card-header">
            <AccountTreeOutlinedIcon className="af-header-icon" />
            <h3>Network Setup</h3>
          </div>

          <div className="af-input-group">
            <label>Do you want to assign a Parent Affiliate?</label>
            <div className="af-segmented-control">
              <button type="button" className={selectParent === 'yes' ? 'active' : ''} onClick={() => setSelectParent('yes')}>Yes, select parent</button>
              <button type="button" className={selectParent === 'no' ? 'active' : ''} onClick={() => setSelectParent('no')}>No, use custom ID</button>
            </div>
          </div>

          {selectParent === "yes" ? (
            <div className="af-input-group mt-4">
              <label>Select Parent Affiliate</label>
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
            <div className="af-input-group mt-4">
              <label>Custom Referral ID</label>
              <input type="text" name="ref_id" onChange={onChangeHandler} value={formData.ref_id} placeholder="e.g. PM-000000" />
            </div>
          )}

          <div className="af-input-group mt-4">
            <label>Package Type *</label>
            <select name="package_id" onChange={onChangeHandler} value={formData.package_id} required>
              <option value="" disabled>Select a Package</option>
              {affiliatePackages.map((pack) => (
                <option key={pack.id} value={pack.id}>
                  {pack.name} — ₦{Number(pack.price).toLocaleString()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* STICKY FOOTER */}
        <div className="af-sticky-footer">
          <button type="button" className="af-btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="af-btn-submit" disabled={loading || dataLoading}>
            {loading ? <ButtonLoader /> : "Register Affiliate"}
          </button>
        </div>
      </form>
    </div>
  );
}