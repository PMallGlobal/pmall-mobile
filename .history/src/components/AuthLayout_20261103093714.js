import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="auth-layout" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;