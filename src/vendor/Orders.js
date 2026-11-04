import React, { useEffect, useState } from 'react';
import CategoryHeader from '../components/CategoryHeader';
import OrderItemCard from '../orders/OrderItemCard';
import { BASE_URL } from '../utils/config';
import Toast from '../utils/Toast';

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import './VendorOrders.css';

export default function VendorOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const getOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/sales/vendorsales`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      });
      const result = await response.json();
      
      const fetchedOrders = result?.data || result?.sales || [];
      setOrders(fetchedOrders);
    } catch (err) {
      console.error(err);
      setToast({ message: "Failed to load orders", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => {
    return sum + Number(order?.total_amount || 0);
  }, 0);

  const filterTabs = [
    { key: "all", label: "All Orders" },
    { key: "paid", label: "Paid" },
    { key: "pending", label: "Pending" },
    { key: "delivered", label: "Delivered" },
    { key: "cancelled", label: "Cancelled" },
  ];

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === "all") return true;
    return (
      order?.payment_status?.toLowerCase() === activeFilter || 
      order?.status?.toLowerCase() === activeFilter
    );
  });

  const handleOrderStatus = (order, e) => {
    console.log("Stockist action not applicable here", order, e);
  };
  const handleOrderPaymentStatus = (order, e) => {
    console.log("Admin action not applicable here", order, e);
  };

  return (
    <div className="vendor-orders-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="vo-stats-grid">
        <div className="vo-stat-card">
          <div className="vo-stat-icon bg-purple">
            <ShoppingBagOutlinedIcon />
          </div>
          <div>
            <p>Total Orders</p>
            <h3>{loading ? "..." : totalOrders}</h3>
          </div>
        </div>
        <div className="vo-stat-card">
          <div className="vo-stat-icon bg-green">
            <PaymentsOutlinedIcon />
          </div>
          <div>
            <p>Revenue</p>
            <h3>₦{totalRevenue.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="vo-filter-tabs">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            className={`vo-filter-tab ${activeFilter === tab.key ? "active" : ""}`}
            onClick={() => setActiveFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="vo-list-container">
        {loading ? (
          <div className="vo-loading">
            <div className="vo-spinner"></div>
            <p>Fetching your transactions...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="vo-empty-state">
            <ShoppingBagOutlinedIcon style={{ fontSize: 64, color: '#d1d5db' }} />
            <h3>No orders found</h3>
            <p>
              {activeFilter === "all" 
                ? "You haven't received any orders yet." 
                : `No orders match the "${activeFilter}" filter.`}
            </p>
          </div>
        ) : (
          filteredOrders.map((item) => (
            <OrderItemCard 
              key={item.id} 
              orderItem={item} 
              title="details" 
              handleOrderStatus={handleOrderStatus}
              handleOrderPaymentStatus={handleOrderPaymentStatus}
            />
          ))
        )}
      </div>
    </div>
  );
}