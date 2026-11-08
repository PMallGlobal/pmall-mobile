import React from 'react';
import { Link } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader';
import { useVendorr } from '../context/VendorSignupContext';

import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './FundWithdrawal.css';

export default function FundWithdrawal() {
  const { wallet } = useVendorr(); 

  const addCommas = (val) => Number(val || 0).toLocaleString();

  return (
    <div className="fw-page">
      <CategoryHeader title="Fund Withdrawal" image="true" />

      <div className="fw-hero-card">
        <div className="fw-hero-icon">
          <AccountBalanceWalletOutlinedIcon fontSize="large" />
        </div>
        <div className="fw-hero-content">
          <p>Available Balance</p>
          <h1>
            <span className="currency">₦</span>
            {addCommas(wallet?.amount)}
          </h1>
        </div>
      </div>

      <div className="fw-section-title">
        <h3>Move your money</h3>
      </div>

      <div className="fw-actions-container">
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

      <div className="fw-info-note">
        <p>🔒 Transactions are secured and processed instantly.</p>
      </div>
    </div>
  );
}