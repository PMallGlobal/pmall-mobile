import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useVendor } from "../context/AuthContext";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ButtonLoader from "../utils/buttonLoader";
import Toast from "../utils/Toast";
import "./Login.css"; // Make sure to import the new CSS

const Login = () => {
  const [toast, setToast] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    inputValues,
    onChangeHandler,
    handleLogin,
    loading,
    toastMsg,
    toastType,
  } = useVendor();

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    handleLogin(e);
  };

  return (
    <div className="login-page">
      {/* Decorative Background Orbs */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      {toastMsg && (
        <Toast 
          message={toastMsg} 
          type={toastType} 
          onClose={() => setToast(null)} 
        />
      )}

      <div className="login-card">
        
        {/* Header Section */}
        <div className="login-header">
          <img src="/images/new PMALL logo.png" alt="PMALL" className="login-logo" />
          <h1 className="login-title">Hello again!</h1>
          <p className="login-subtitle">Welcome back, you've been missed!</p>
        </div>

        
        <form className="login-form" onSubmit={onSubmitHandler}>
          
          
          <div className="input-group">
            <label>Username</label>
            <div className="input-wrapper">
              <PersonOutlineIcon className="input-icon" />
              <input
                type="text"
                name="username"
                onChange={onChangeHandler}
                placeholder="Enter username or email"
                value={inputValues.username || ""}
                autoComplete="username"
                required
              />
            </div>
          </div>

          
          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <LockOutlinedIcon className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={onChangeHandler}
                value={inputValues.password || ""}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              <button 
                type="button" 
                className="toggle-password" 
                onClick={togglePassword}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
              </button>
            </div>
          </div>

          
          <div className="login-options">
            <Link to="/auth/app/reset-account" className="forgot-link">
              Forgot Password?
            </Link>
            <Link to="/" className="back-link">
              Back to Mall
            </Link>
          </div>

          
          <button
            className="login-submit-btn"
            disabled={loading}
            type="submit"
          >
            {loading ? <ButtonLoader /> : "Login"}
          </button>
        </form>

        
        <div className="login-footer">
          <p>Don't have an account yet?</p>
          <Link to="/auth/sign-up" className="register-btn">
            Register Now
          </Link>
        </div>
        
        <div className="login-watermark">
          <img src="/pmall-logo 1.png" alt="Pmall Watermark" />
        </div>

      </div>
    </div>
  );
};

export default Login;