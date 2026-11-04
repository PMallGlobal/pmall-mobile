import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useVendor } from "../context/AuthContext";
import Toast from "../utils/Toast";
import ButtonLoader from "../utils/buttonLoader";

// Icons
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import './StockistLogin.css'; 

const StockistLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const {
    inputValues,
    onChangeHandler,
    stockistLogin,
    loading,
    toastMsg,
    toastType,
  } = useVendor();

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    stockistLogin(e);
  };

  return (
    <div className="stockist-login-page">
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>

      {toastMsg && (
        <Toast message={toastMsg} type={toastType} onClose={() => setToast(null)} />
      )}

      <div className="stockist-card">
        
        <div className="stockist-header">
          <div className="stockist-badge">
            <LocalShippingOutlinedIcon fontSize="small" />
            <span>Stockist Portal</span>
          </div>
          <img src="/images/new PMALL logo.png" alt="PMALL" className="stockist-logo" />
          <h1 className="stockist-title">Welcome Back</h1>
          <p className="stockist-subtitle">Log in to manage your hub and inventory.</p>
        </div>

        <form className="stockist-form" onSubmit={onSubmitHandler}>
          
          <div className="stockist-input-group">
            <label>Username or Email</label>
            <div className="stockist-input-wrapper">
              <PersonOutlineIcon className="stockist-input-icon" />
              <input
                type="text"
                name="email"
                onChange={onChangeHandler}
                placeholder="Enter your email"
                value={inputValues.email || ""}
                required
              />
            </div>
          </div>

          <div className="stockist-input-group">
            <label>Password</label>
            <div className="stockist-input-wrapper">
              <LockOutlinedIcon className="stockist-input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={onChangeHandler}
                value={inputValues.password || ""}
                placeholder="Enter your password"
                required
              />
              <button 
                type="button" 
                className="stockist-toggle-pwd" 
                onClick={togglePassword}
              >
                {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
              </button>
            </div>
          </div>

          <div className="stockist-options">
            <Link to="/auth/app/reset-account" className="stockist-forgot-link">
              Forgot Password?
            </Link>
            <Link to="/" className="stockist-back-link">
              Back to Mall
            </Link>
          </div>

          <button
            className="stockist-submit-btn"
            disabled={loading}
            type="submit"
          >
            {loading ? <ButtonLoader /> : "Access Dashboard"}
          </button>
        </form>

        <div className="stockist-footer">
          <p>Don't have a stockist account?</p>
          <Link to="/auth/sign-up" className="stockist-register-btn">
            Register Now
          </Link>
        </div>

      </div>
    </div>
  );
};

export default StockistLogin;