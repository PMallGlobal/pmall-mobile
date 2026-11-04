import React, { useState, useEffect } from "react";
import CategoryHeader from '../components/CategoryHeader';
import OrderItemCard from './OrderItemCard';
import { useUser } from "../context/UserContext";
import { BASE_URL } from "../utils/config"; 
import Toast from "../utils/Toast";
import { ShoppingBagOutlined, PendingActionsOutlined, LocalShippingOutlined } from '@mui/icons-material';
import './Orders.css';

export default function Orders() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [activeStatus, setActiveStatus] = useState("all");

  const token = user?.token || localStorage.getItem("authToken");

  // Filter Tabs Configuration
  const filterTabs = [
    { key: "all", label: "All Orders" },
    { key: "pending", label: "Pending" },
    { key: "packaging", label: "Packaging" },
    { key: "out_for_delivery", label: "Out for Delivery" },
    { key: "delivered", label: "Delivered" },
    { key: "cancelled", label: "Cancelled" },
  ];

  const getMyOrder = async (status = "all") => {
    setLoading(true);
    
    // Determine endpoint based on user role
    let endpoint = "customer/sales/history";
    if (user?.accountType === "Stockist") endpoint = "stockist/allorder";
    else if (user?.accountType === "Vendor") endpoint = "sales/vendorsales";
    else if (user?.accountType === "Admin") endpoint = "sales";

    // If a specific status is selected (and user is Admin), use the status endpoint
    let url = `${BASE_URL}/${endpoint}`;
    if (status !== "all" && user?.accountType === "Admin") {
      url = `${BASE_URL}/sales/status/${status}`;
    }

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      const result = await response.json();
      
      if (result.status) {
        const fetchedOrders = result?.data || result?.sales || [];
        setOrders(fetchedOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setToast({ message: "Failed to load orders", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (status) => {
    setActiveStatus(status);
    getMyOrder(status);
  };

  const handleOrderStatus = async (order, selectedStatus) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/order/${order?.id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: selectedStatus }),
      });
      const result = await response.json();
      
      if (result.status) {
        setToast({ message: result.message, type: "success" });
        getMyOrder(activeStatus); // Refresh
      } else {
        setToast({ message: result.message, type: "error" });
      }
    } catch (error) {
      setToast({ message: "Failed to update status", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleOrderPaymentStatus = async (order, selectedStatus) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/sales/updatepayment/${order?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ payment_status: selectedStatus }),
      });
      const result = await response.json();
      
      if (result.status) {
        setToast({ message: result.message, type: "success" });
        getMyOrder(activeStatus); 
      } else {
        setToast({ message: result.message, type: "error" });
      }
    } catch (error) {
      setToast({ message: "Failed to update payment status", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyOrder();
  }, []);

  // Derived Stats
  const totalOrders = orders.length;
  const activeOrders = orders.filter(o => 
    ["pending", "packaging", "out_for_delivery"].includes(o?.status)
  ).length;

  return (
    <div className="orders-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
  
      <div className="orders-stats-grid">
        <div className="orders-stat-card">
          <div className="stat-icon bg-purple"><ShoppingBagOutlined /></div>
          <div>
            <p>Total Orders</p>
            <h3>{totalOrders}</h3>
          </div>
        </div>
        <div className="orders-stat-card">
          <div className="stat-icon bg-yellow"><LocalShippingOutlined /></div>
          <div>
            <p>Active Orders</p>
            <h3>{activeOrders}</h3>
          </div>
        </div>
      </div>

      {/* SCROLLABLE FILTER TABS */}
      <div className="orders-filter-tabs">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            className={`filter-tab ${activeStatus === tab.key ? "active" : ""}`}
            onClick={() => handleFilterChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ORDERS LIST */}
      <div className="orders-list-container">
        {loading ? (
          <div className="orders-loading">
            <div className="spinner"></div>
            <p>Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="orders-empty">
            <ShoppingBagOutlined style={{ fontSize: 64, color: '#d1d5db' }} />
            <h3>No orders found</h3>
            <p>You don't have any {activeStatus !== 'all' ? activeStatus.replace(/_/g, ' ') : ''} orders yet.</p>
          </div>
        ) : (
          orders.map((item) => (
            <OrderItemCard 
              key={item.id} 
              orderItem={item} 
              handleOrderPaymentStatus={handleOrderPaymentStatus} 
              handleOrderStatus={handleOrderStatus} 
            />
          ))
        )}
      </div>
    </div>
  );
}