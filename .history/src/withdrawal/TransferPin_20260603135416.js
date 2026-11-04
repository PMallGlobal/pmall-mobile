// TransferPinPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import CategoryHeader from '../components/CategoryHeader';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function TransferPinPage() {
  const [pin, setPin] = useState('');
  const maxLength = 4;
  const inputRef = useRef(null);

  // Auto-focus hidden input on mount (helps mobile keyboard)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleDigit = (digit) => {
    if (pin.length < maxLength) {
      const newPin = pin + digit;
      setPin(newPin);

      // Vibration feedback on mobile (optional)
      if (navigator.vibrate) navigator.vibrate(30);

      // Auto-submit / next step when 4 digits are entered
      if (newPin.length === maxLength) {
        console.log('PIN entered:', newPin);
        // → Here you would call your transfer confirmation API
        // Example: confirmTransfer(newPin);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <div className="pin-page">

        <CategoryHeader title="Transfer Pin" />

      <div className="main-content">
        <p className="subtitle">
          Enter your 4-digit transaction pin.
        </p>

        {/* PIN dots */}
        <div className="pin-dots">
          {Array.from({ length: maxLength }).map((_, i) => (
            <div
              key={i}
              className={`dot ${i < pin.length ? 'filled' : ''}`}
            />
          ))}
        </div>

        {/* Hidden input – captures physical keyboard */}
        <input
          ref={inputRef}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={maxLength}
          value={pin}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            setPin(val);
          }}
          className="hidden-input"
          autoFocus
        />

        {/* Keypad */}
        <div className="keypad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              className="key"
              onClick={() => handleDigit(num.toString())}
            >
              {num}
            </button>
          ))}

          <div className="key empty" /> {/* spacer */}

          <button className="key" onClick={() => handleDigit('0')}>
            0
          </button>

          <button className="key delete" onClick={handleDelete}>
            <CancelOutlinedIcon />
          </button>
        </div>
      </div>
      <div className='flex g-40 justsb w-full '> 
            <button
                className="login-btn login w-full"
                // disabled={loading}
                type="submit"
                // onClick={handleLogin}
                >
                {/*  {loading ? <ButtonLoader /> : "Login"} */}
                Transfer
            </button>
            <button
                className="login-btn cancel w-full"
                // disabled={loading}
                type="submit"
                // onClick={handleLogin}
                >
                Close
            </button>
        </div>
    </div>
  );
}