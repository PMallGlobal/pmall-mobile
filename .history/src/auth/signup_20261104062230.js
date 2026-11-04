import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useVendor } from "../context/AuthContext";
import VendorForm from "./vendorForm";
import AffilateForm from "./affilateForm";
import Toast from "../utils/Toast";
import ButtonLoader from "../utils/buttonLoader";
import "./CustomerReg.css"; // We reuse the same premium CSS!

const SignUp = () => {
  // Use a string state for the tabs instead of boolean (cleaner logic)
  const [activeTab, setActiveTab] = useState("vendor"); 
  const [agreed, setAgreed] = useState(false);

  const {
    inputValues,
    onChangeHandler,
    onSubmitHandler,
    onAffilateSubmitHandler,
    toastMsg,
    toastType,
    setToast,
    loading,
    completeReg, 
  } = useVendor();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return; 

    if (activeTab === "vendor") {
      onSubmitHandler(e);
    } else {
      onAffilateSubmitHandler(e);
    }
  };

  return (
    <div className="signup-page">
      
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      {toastMsg && (
        <Toast message={toastMsg} type={toastType} onClose={() => setToast(null)} />
      )}

      <div className="signup-card">
        
        
        <div className="signup-header">
          <img src="/images/new PMALL logo.png" alt="PMALL" className="signup-logo" />
          <h1 className="signup-title">
            {activeTab === "vendor" ? "Become a Vendor" : "Become an Affiliate"}
          </h1>
          <p className="signup-subtitle">Connecting people and services</p>
        </div>

        
        <div className="signup-tabs">
          <button 
            type="button"
            className={`tab-btn ${activeTab === "vendor" ? "active" : ""}`}
            onClick={() => setActiveTab("vendor")}
          >
            Vendor
          </button>
          <button 
            type="button"
            className={`tab-btn ${activeTab === "affiliate" ? "active" : ""}`}
            onClick={() => setActiveTab("affiliate")}
          >
            Affiliate
          </button>
        </div>

        {/* Form Area */}
        <form className="signup-form" onSubmit={handleSubmit}>
          
          <div className="form-fields">
            {activeTab === "vendor" ? (
              <VendorForm
                inputValues={inputValues}
                onChangeHandler={onChangeHandler}
                completeReg={completeReg}
              />
            ) : (
              <AffilateForm
                inputValues={inputValues}
                onChangeHandler={onChangeHandler}
              />
            )}
          </div>

          {/* Terms & Conditions */}
          <label className="terms-wrapper">
            <div className={`custom-checkbox ${agreed ? 'checked' : ''}`}>
              <input 
                type="checkbox" 
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
              />
              <svg viewBox="0 0 24 24" className="check-icon">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <span className="terms-text">
              I agree to the <Link to="/app/Terms">Terms</Link> and <Link to="/app/Conditions">Conditions</Link> of Pmall Nigeria.
            </span>
          </label>

          {/* Submit Action */}
          <div className="signup-actions">
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={loading || !agreed}
            >
              {loading ? <ButtonLoader /> : "Continue"}
            </button>
            
            <p className="login-link-text">
              Already have an account? <Link to="/auth/sign-in">Login</Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SignUp;