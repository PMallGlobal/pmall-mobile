import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader';
import Toast from '../utils/Toast';
import ButtonLoader from '../utils/buttonLoader';
import { useUser } from '../context/UserContext';
import { useVendorr } from '../context/VendorSignupContext';
import { BASE_URL } from '../utils/config';

// Icons
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './Withdraw.css';

export default function Withdraw() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { wallet } = useVendorr();
  
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  const [method, setMethod] = useState('Bank Transfer');
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');

  const availableBalance = Number(wallet?.amount || 0);
  const numericAmount = Number(amount) || 0;
  const isInsufficient = numericAmount > availableBalance;
  const isValid = numericAmount > 0 && !isInsufficient;

  const formatCurrency = (val) => Number(val || 0).toLocaleString();

  const handleQuickSelect = (value) => {
    if (value === 'max') {
      setAmount(availableBalance.toString());
    } else {
      setAmount(value.toString());
    }
  };

  const makeWithdrawal = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/withdrawal/request?wallet_id=${wallet?.id}&amount=${amount}&method=${method}&remarks=${remarks}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setToast({ message: 'Withdrawal request submitted successfully!', type: 'success' });
        setAmount('');
        setRemarks('');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        let errorMsg = 'Failed to submit request.';
        if (typeof data?.message === 'string') errorMsg = data.message;
        else if (data?.errors) {
          const firstError = Object.values(data.errors)[0];
          errorMsg = Array.isArray(firstError) ? firstError[0] : firstError;
        }
        setToast({ message: errorMsg, type: 'error' });
      }
    } catch (error) {
      console.error('Network error:', error);
      setToast({ message: 'Network error. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wd-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <CategoryHeader title="Withdraw Funds" image="true" />

      <form className="wd-form" onSubmit={makeWithdrawal}>
        
        <div className="wd-balance-card">
          <div className="wd-balance-icon">
            <AccountBalanceWalletOutlinedIcon />
          </div>
          <div className="wd-balance-info">
            <p>Available Balance</p>
            <h2>₦{formatCurrency(availableBalance)}</h2>
          </div>
        </div>

        <div className="wd-section">
          <label className="wd-label">Amount to Withdraw</label>
          <div className={`wd-amount-wrapper ${isInsufficient ? 'error' : ''}`}>
            <span className="wd-currency-symbol">₦</span>
            <input
              type="number"
              className="wd-amount-input"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              max={availableBalance}
            />
          </div>
          
          {isInsufficient ? (
            <p className="wd-error-text">
              <InfoOutlinedIcon fontSize="small" /> Insufficient balance. You can only withdraw up to ₦{formatCurrency(availableBalance)}.
            </p>
          ) : (
            <p className="wd-helper-text">Enter an amount between ₦100 and ₦{formatCurrency(availableBalance)}.</p>
          )}

          <div className="wd-quick-chips">
            {[1000, 5000, 10000].map((val) => (
              <button 
                key={val} 
                type="button" 
                onClick={() => handleQuickSelect(val)}
                className={amount === val.toString() ? 'active' : ''}
              >
                ₦{formatCurrency(val)}
              </button>
            ))}
            <button 
              type="button" 
              onClick={() => handleQuickSelect('max')}
              className={amount === availableBalance.toString() ? 'active' : ''}
            >
              Max
            </button>
          </div>
        </div>
        <div className="wd-section">
          <label className="wd-label">Withdrawal Method</label>
          <div className="wd-methods">
            <div 
              className={`wd-method-card ${method === 'Bank Transfer' ? 'selected' : ''}`}
              onClick={() => setMethod('Bank Transfer')}
            >
              <div className="wd-method-icon">
                <AccountBalanceOutlinedIcon />
              </div>
              <div>
                <h4>Bank Transfer</h4>
                <p>Direct to your bank</p>
              </div>
            </div>

            <div 
              className={`wd-method-card ${method === 'Wallet' ? 'selected' : ''}`}
              onClick={() => setMethod('Wallet')}
            >
              <div className="wd-method-icon">
                <PhoneAndroidOutlinedIcon />
              </div>
              <div>
                <h4>Wallet</h4>
                <p>To your Pmall wallet</p>
              </div>
            </div>
          </div>
        </div>

        {/* REMARKS SECTION */}
        <div className="wd-section">
          <label className="wd-label">Remark (Optional)</label>
          <textarea
            className="wd-textarea"
            placeholder="Add a note for this withdrawal..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={3}
          />
        </div>

        {/* STICKY FOOTER */}
        <div className="wd-sticky-footer">
          <button type="button" className="wd-btn-cancel" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button 
            type="submit" 
            className="wd-btn-submit" 
            disabled={!isValid || loading}
          >
            {loading ? <ButtonLoader /> : 'Initiate Withdrawal'}
          </button>
        </div>
      </form>
    </div>
  );
}