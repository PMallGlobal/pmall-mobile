import React from 'react';
import { Link } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader';
import { useVendorr } from '../context/VendorSignupContext'; // To get wallet balance

// Modern Icons
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './FundWithdrawal.css';

export default function FundWithdrawal() {
  const { wallet } = useVendorr(); // Pulls wallet data

  const addCommas = (val) => Number(val || 0).toLocaleString();

  return (
    <div className="fw-page">
      <CategoryHeader title="Fund Withdrawal" image="true" />

      {/* HERO BALANCE CARD */}
      <div className="fw-hero-card">
        <div className="fw-hero-icon">
          <AccountBalanceWalletOutlinedIcon fontSize="large" />
        </div>
        <div className="fw-hero-content">
          <p>Available Balance</p>
          <h1>
            <span className="currency">₦</span>
            {addMonths ? addCommas(wallet?.amount) : "0.00"}
          </h1>
        </div>
      </div>

      <div className="fw-section-title">
        <h3>How would you like to move money?</h3>
      </div>

      {/* ACTION CARDS */}
      <div className="fw-actions-container">
        
        {/* Withdraw Card */}
        <Link to="/withdraw" className="fw-action-card withdraw">
          <div className="fw-card-icon-wrap">
            <AccountBalanceWalletOutlinedIcon fontSize="large" />
          </div>
          <div className="fw-card-text">
            <h3>Withdraw Funds</h3>
            <p>Transfer directly to your linked bank account.</p>
          </div>
          <ChevronRightIcon className="fw-card-arrow" />
        </Link>

        {/* Transfer Card */}
        <Link to="/transfer" className="fw-action-card transfer">
          <div className="fw-card-icon-wrap">
            <SwapHorizOutlinedIcon fontSize="large" />
          </div>
          <div className="fw-card-text">
            <h3>Transfer Funds</h3>
            <p>Send money instantly to another Pmall user.</p>
          </div>
          <ChevronRightIcon className="fw-card-arrow" />
        </Link>

      </div>

      {/* EXTRA CONTEXT / FOOTER */}
      <div className="fw-info-note">
        <p>🔒 Transactions are secured and processed instantly.</p>
      </div>
    </div>
  );
}