import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer';
import { useUser } from '../context/UserContext';

const DashboardLayout = () => {
  const { user } = useUser();
  const vendorIn = user?.accountType === 'Vendor';

  return (
    <div className="dashboard-layout">
      {/* Note: Dashboard pages usually have their own CategoryHeader (like "My Profile" or "Genealogy"). 
          So we don't put a global header here. */}
      <main className="dashboard-main">
        <Outlet />
      </main>
      
      <Footer vendorIn={vendorIn} stockist={user?.accountType === 'Stockist'} />
    </div>
  );
};

export default DashboardLayout;