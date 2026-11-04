import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useVendor } from "../context/AuthContext";
import CustomerForm from "./CustomerForm";
import VendorForm from "./vendorForm";
import AffilateForm from "./affilateForm";
import Toast from "../utils/Toast";
import ButtonLoader from "../utils/buttonLoader";
import "./CustomerReg.css"; 

const CustomerReg = () => {
  
  const [activeTab, setActiveTab] = useState("vendor"); 
  const [agreed, setAgreed] = useState(false);
  
  const {
    inputValues,
    onChangeHandler,
    onCustomerSubmitHandler,
    onAffilateSubmitHandler,
    onSubmitHandler, 
    setState,
    toastMsg,
    toastType,
    loading,
  } = useVendor();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return; 
    
    if (activeTab === "vendor") {
      if (onSubmitHandler) onSubmitHandler(e);
    } else if (activeTab === "affiliate") {
      if (onAffilateSubmitHandler) onAffilateSubmitHandler(e);
    } else {
      if (onCustomerSubmitHandler) onCustomerSubmitHandler(e);
    }
  };

  return (
    <div className="signup-page">
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      {toastMsg && (
        <Toast message={toastMsg} type={toastType} onClose={() => setState({})} />
      )}

      <div className="signup-card">
        
        {/* Logo & Header */}
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
            {activeTab === "vendor" && (
              <VendorForm 
                inputValues={inputValues} 
                onChangeHandler={onChangeHandler} 
                setInputValues={setState} 
              />
            )}
            {activeTab === "affiliate" && (
              <AffilateForm 
                inputValues={inputValues} 
                onChangeHandler={onChangeHandler} 
                setInputValues={setState} 
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

          {/* Submit Button */}
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

export default CustomerReg;