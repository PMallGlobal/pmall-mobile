import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader';
import Toast from '../utils/Toast';

// Icons
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import './IRecharge.css';

export default function IRecharge() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNotify = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setToast({ message: "Please enter a valid email address", type: "error" });
      return;
    }
    
    setSubscribed(true);
    setToast({ message: "Awesome! We'll notify you when iRecharge launches.", type: "success" });
  };

  const features = [
    { icon: <PhoneAndroidOutlinedIcon />, label: "Airtime" },
    { icon: <WifiOutlinedIcon />, label: "Data" },
    { icon: <ElectricBoltOutlinedIcon />, label: "Electricity" },
    { icon: <TvOutlinedIcon />, label: "Cable TV" },
  ];

  return (
    <div className="rc-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <CategoryHeader title="iRecharge" image="true" />

      <div className="rc-content">
        <div className="rc-hero-wrap">
          <div className="rc-pulse-ring"></div>
          <div className="rc-pulse-ring delay"></div>
          <div className="rc-hero-icon">
            <PhoneAndroidOutlinedIcon fontSize="inherit" />
          </div>
          <div className="rc-badge">
            <AutoAwesomeIcon fontSize="small" />
            <span>Coming Soon</span>
          </div>
        </div>

        <div className="rc-text-content">
          <h1>Something big is coming.</h1>
          <p>
            We're building a faster, cheaper, and more reliable way to recharge 
            your phone, pay for data, and settle bills — all in one place.
          </p>
        </div>

        <div className="rc-features">
          {features.map((feature, idx) => (
            <div className="rc-feature-chip" key={idx}>
              <div className="rc-feature-icon">{feature.icon}</div>
              <span>{feature.label}</span>
            </div>
          ))}
        </div>

        {!subscribed ? (
          <form className="rc-notify-form" onSubmit={handleNotify}>
            <div className="rc-notify-input-wrap">
              <input
                type="email"
                placeholder="Enter your email for early access"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rc-notify-input"
                required
              />
              <button type="submit" className="rc-notify-btn" aria-label="Notify me">
                <NotificationsActiveOutlinedIcon />
              </button>
            </div>
            <p className="rc-notify-hint">Get notified the moment we launch.</p>
          </form>
        ) : (
          <div className="rc-subscribed-msg">
            <AutoAwesomeIcon />
            <p>You're on the list! We'll be in touch.</p>
          </div>
        )}

        <button className="rc-back-btn" onClick={() => navigate(-1)}>
          <ArrowBackIcon style={{ fontSize: 18, marginRight: 8 }} />
          Go Back
        </button>
      </div>
    </div>
  );
}