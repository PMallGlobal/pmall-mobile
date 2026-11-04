import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { BASE_URL } from "../utils/config";
import Toast from '../utils/Toast';
import currency from '../utils/formatCurrency';

// Icons
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import './OrderItemCard.css';

export default function OrderItemCard({ 
  orderItem, 
  title, 
  status, 
  handleOrderPaymentStatus, 
  orderStatus, 
  handleOrderStatus 
}) {
  const { user } = useUser(); // FIX: destructure correctly
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = user?.token || localStorage.getItem("authToken");
  const accountType = user?.accountType;

  // Bug fix: ensure this doesn't crash if products is missing
  const products = orderItem?.products || [];
  
  // Derive order-level info
  const orderId = orderItem?.id || "N/A";
  const paymentStatus = orderItem?.payment_status || "pending";
  const orderStatusCode = orderItem?.status || "pending";
  const date = orderItem?.created_at 
    ? new Date(orderItem.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : "N/A";

  // Compute total from all products in the order
  const orderTotal = products.reduce((sum, p) => {
    return sum + (Number(p.selling_price || 0) * Number(p?.pivot?.quantity || 1));
  }, 0);

  const getStatusConfig = (statusCode) => {
    switch (statusCode) {
      case 'delivered': 
        return { color: '#065f46', bg: '#d1fae5', icon: <CheckCircleIcon fontSize="small" />, label: 'Delivered' };
      case 'out_for_delivery': 
        return { color: '#1e40af', bg: '#dbeafe', icon: <LocalShippingOutlinedIcon fontSize="small" />, label: 'Out for Delivery' };
      case 'packaging': 
      case 'ongoing': 
        return { color: '#92400e', bg: '#fef3c7', icon: <PendingOutlinedIcon fontSize="small" />, label: 'Packaging' };
      case 'cancelled': 
      case 'returned': 
        return { color: '#991b1b', bg: '#fee2e2', icon: <CancelOutlinedIcon fontSize="small" />, label: 'Cancelled' };
      default: 
        return { color: '#4b5563', bg: '#f3f4f6', icon: <PendingOutlinedIcon fontSize="small" />, label: statusCode.replace(/_/g, ' ') };
    }
  };

  const statusConfig = getStatusConfig(orderStatusCode);
  const handleVendorAction = async (item, e) => {
    const selectedStatus = e?.target?.value;
    if (!selectedStatus) return;
    
    setLoading(true);
    const requestBody = {
      stockist_id: orderItem?.stockist?.id,
      sale_id: parseInt(item?.pivot?.sale_id),
      product_id: parseInt(item?.pivot?.product_id),
    };

    const endpoint = selectedStatus === "push-to-stockist" ? "orders/push" : "orders/delivertostockist";
    
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      const result = await response.json();
      
      if (result.status) {
        setToast({ message: result.message, type: "success" });
      } else {
        setToast({ message: result.message, type: "error" });
      }
    } catch (error) {
      setToast({ message: "Failed to update order", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="oic-card">
        
        <div className="oic-header">
          <div>
            <p className="oic-label">Order</p>
            <p className="oic-order-id">#{orderId}</p>
          </div>
          <div 
            className="oic-status-badge"
            style={{ color: statusConfig.color, backgroundColor: statusConfig.bg }}
          >
            {statusConfig.icon}
            <span>{statusConfig.label}</span>
          </div>
        </div>

        <div className="oic-body">
          {products.length === 0 ? (
            <p className="oic-empty-text">No products in this order.</p>
          ) : (
            products.map((item, idx) => (
              <div className="oic-product" key={item.id || idx}>
                <div className="oic-img-box">
                  <img 
                    src={item?.image || '/default-image.jpg'} 
                    alt={item?.name} 
                    onError={(e) => (e.target.src = '/default-image.jpg')}
                  />
                </div>
                <div className="oic-product-info">
                  <p className="oic-product-name">{item?.name || "Unnamed Product"}</p>
                  <p className="oic-product-qty">
                    Qty: {item?.pivot?.quantity || 1} · {currency(item?.selling_price || 0)}
                  </p>
                  <p className="oic-product-date">Order #{item?.pivot?.sale_id}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="oic-meta">
          <span>Placed on {date}</span>
          <span className={`oic-payment-pill ${paymentStatus}`}>{paymentStatus}</span>
        </div>

        <div className="oic-footer-top">
          <div>
            <p className="oic-total-label">Total</p>
            <p className="oic-total-amount">{currency(orderTotal)}</p>
          </div>
          {title !== "details" && (
            <Link to={`/order/${orderItem?.id}/details`} className="oic-details-link">
              Details <ChevronRightIcon fontSize="small" />
            </Link>
          )}
        </div>

        <div className="oic-actions">
          {title === "details" && accountType === "Vendor" && (
            <select 
              className="oic-select"
              onChange={(e) => handleVendorAction(products[0], e)}
              defaultValue=""
            >
              <option value="" disabled>Manage Order</option>
              <option value="push-to-stockist">Push to Stockist</option>
              <option value="deliver-to-stockist">Deliver to Stockist</option>
            </select>
          )}

          {title !== "details" && accountType === "Stockist" && (
            <select 
              className="oic-select"
              value={orderStatus}
              onChange={(e) => handleOrderStatus(orderItem, e)}
            >
              <option value="">Manage Order</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="packaging">Packaging</option>
              <option value="returned">Returned</option>
              <option value="cancelled">Cancelled</option>
              <option value="confirmed">Confirmed</option>
              <option value="delivered">Delivered</option>
              <option value="customer_did_not_answer">Customer Didn't Answer</option>
            </select>
          )}

          {accountType === "Admin" && (
            <select 
              className="oic-select"
              value={orderStatus}
              onChange={(e) => handleOrderPaymentStatus(orderItem, e)}
            >
              <option value="">Manage Payment</option>
              <option value="paid">Mark as Paid</option>
              <option value="not-paid">Mark as Not Paid</option>
            </select>
          )}

          {(title === "details" || title === "Rating") && (
            <button 
              className="oic-action-btn primary"
              onClick={() => navigate(`/product/${products[0]?.id}`)}
            >
              {title === "Rating" ? "Rate this Product" : "Buy Again"}
            </button>
          )}
        </div>

        {(orderItem?.refund || products[0]?.refund) && (
          <div className="oic-refund-banner">
            <ReplayOutlinedIcon fontSize="small" />
            <span>{orderItem?.refund || products[0]?.refund ? "Refund / Replacement Requested" : ""}</span>
          </div>
        )}

      </div>
    </>
  );
}