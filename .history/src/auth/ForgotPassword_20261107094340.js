import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useVendor } from "../context/AuthContext";
import Toast from "../utils/Toast";
import './ForgotPassword.css'; 

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const {
    inputValues,
    onChangeHandler,
    ForgotPasswordHandler,
    loading,
  } = useVendor();


  const onSubmitHandler = (e) => {
    e.preventDefault();
    ForgotPasswordHandler(e);
  };


  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-card text-center">
          <div className="success-icon">✉️</div>
          <h2>Check your email</h2>
          <p className="auth-subtitle">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <Link to="/auth/sign-in" className="auth-submit-btn text-center-btn">
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Forgot Password?</h2>
          <p className="auth-subtitle">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={onSubmitHandler} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="auth-submit-btn" 
            disabled={loading || !email}
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/auth/sign-in" className="back-link">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}