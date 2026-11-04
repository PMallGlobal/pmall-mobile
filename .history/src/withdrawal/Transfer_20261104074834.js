import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader';
import Toast from '../utils/Toast';
import ButtonLoader from '../utils/buttonLoader';
import { useUser } from '../context/UserContext';
import { useVendorr } from '../context/VendorSignupContext';
import { BASE_URL } from '../utils/config';
import { useDebounce } from 'use-debounce';

// Icons
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './Transfer.css';

export default function Transfer() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { wallet } = useVendorr();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [accountType, setAccountType] = useState('pmall');
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  
  const [recipientName, setRecipientName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedUsername] = useDebounce(username, 500);

  const availableBalance = Number(wallet?.amount || 0);
  const numericAmount = Number(amount) || 0;
  const isInsufficient = numericAmount > availableBalance;
  const isValid = numericAmount > 0 && !isInsufficient && recipientName !== '';

  const formatCurrency = (val) => Number(val || 0).toLocaleString();
  useEffect(() => {
    if (!debouncedUsername) {
      setRecipientName('');
      return;
    }

    const verifyUser = async () => {
      setIsSearching(true);
      try {
        setTimeout(() => {
          if (debouncedUsername.toLowerCase() === 'roy') {
            setRecipientName('Roy Theophilus');
          } else if (debouncedUsername.toLowerCase() === 'admin') {
            setRecipientName('System Admin');
          } else {
            setRecipientName('');
          }
          setIsSearching(false);
        }, 500);
      } catch (err) {
        setRecipientName('');
        setIsSearching(false);
      }
    };

    verifyUser();
  }, [debouncedUsername]);

  const handleQuickSelect = (value) => {
    if (value === 'max') {
      setAmount(availableBalance.toString());
    } else {
      setAmount(value.toString());
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);

    try {
      const payload = {
        account_type: accountType,
        username: username,
        amount: amount,
        remarks: remarks
      };

      const response = await fetch(`${BASE_URL}/wallet/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Accept: 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setToast({ message: 'Transfer successful!', type: 'success' });
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        let errorMsg = 'Transfer failed. Please try again.';
        if (typeof data?.message === 'string') errorMsg = data.message;
        setToast({ message: errorMsg, type: 'error' });
        setLoading(false);
      }
    } catch (error) {
      console.error('Network error:', error);
      setToast({ message: 'Network error. Please try again.', type: 'error' });
      setLoading(false);
    }
  };

  return (
    <div className="tf-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <CategoryHeader title="Transfer Funds" image="true" />

      <form className="tf-form" onSubmit={handleTransfer}>
        
        {/* HERO BALANCE CARD */}
        <div className="tf-balance-card">
          <div className="tf-balance-icon">
            <AccountBalanceWalletOutlinedIcon />
          </div>
          <div className="tf-balance-info">
            <p>Available Balance</p>
            <h2>₦{formatCurrency(availableBalance)}</h2>
          </div>
        </div>

        <div className="tf-section">
          <label className="tf-label">Recipient Details</label>
          
          <div className="tf-input-group">
            <select 
              className="tf-select" 
              value={accountType} 
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option value="pmall">Pmall Wallet User</option>
              <option value="affiliate">Affiliate Network</option>
            </select>
          </div>

          <div className="tf-username-wrapper">
            <div className="tf-input-icon">
              <PersonSearchOutlinedIcon />
            </div>
            <input
              type="text"
              className="tf-input"
              placeholder="Enter recipient username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {isSearching && <div className="tf-spinner"></div>}
          </div>

          {recipientName ? (
            <div className="tf-resolved-user">
              <VerifiedUserOutlinedIcon className="text-green" />
              <span>{recipientName}</span>
            </div>
          ) : username && !isSearching ? (
            <p className="tf-error-text">
              <InfoOutlinedIcon fontSize="small" /> User not found. Check the username.
            </p>
          ) : null}
        </div>

        <div className="tf-section">
          <label className="tf-label">Amount to Transfer</label>
          <div className={`tf-amount-wrapper ${isInsufficient ? 'error' : ''}`}>
            <span className="tf-currency-symbol">₦</span>
            <input
              type="number"
              className="tf-amount-input"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              max={availableBalance}
            />
          </div>
          
          {isInsufficient ? (
            <p className="tf-error-text">
              <InfoOutlinedIcon fontSize="small" /> Insufficient balance.
            </p>
          ) : (
            <div className="tf-quick-chips">
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
          )}
        </div>

        {/* REMARKS SECTION */}
        <div className="tf-section">
          <label className="tf-label">Remark (Optional)</label>
          <textarea
            className="tf-textarea"
            placeholder="What is this transfer for?"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={2}
          />
        </div>

        {/* STICKY FOOTER */}
        <div className="tf-sticky-footer">
          <button type="button" className="tf-btn-cancel" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button 
            type="submit" 
            className="tf-btn-submit" 
            disabled={!isValid || loading}
          >
            {loading ? <ButtonLoader /> : (
              <>
                <SendOutlinedIcon style={{ fontSize: 18, marginRight: 8 }} />
                Send Money
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}