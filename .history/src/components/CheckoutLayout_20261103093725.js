import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CheckoutLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="checkout-layout" style={{ minHeight: '100vh', background: '#f8f9fa', paddingBottom: '80px' }}>
      <header style={{ padding: '16px', background: '#fff', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid #eee' }}>
         <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <ArrowBackIcon />
         </button>
         <h3 style={{ margin: 0 }}>Secure Checkout</h3>
      </header>
      <Outlet />
    </div>
  );
};

export default CheckoutLayout;