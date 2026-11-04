import React from 'react';
import { Link } from 'react-router-dom';
import currency from '../utils/formatCurrency';

// Icons
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function OrderItemCard({ orderItem, handleOrderStatus, handleOrderPaymentStatus }) {
  // Extract order details safely
  const orderId = orderItem?.id || orderItem?.order_number || "N/A";
  const date = orderItem?.created_at 
    ? new Date(orderItem.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : "N/A";
  
  const status = orderItem?.status || 'pending';
  const paymentStatus = orderItem?.payment_status || 'unpaid';
  
  // Get primary product (handling if it's a single product or an array of items in the order)
  const product = orderItem?.product || orderItem?.products?.[0] || {};
  const productName = product?.name || "Order Items";
  const productImage = product?.image || "/default-image.jpg";
  const totalAmount = orderItem?.total_amount || product?.selling_price || 0;

  // Status Badge Logic
  const getStatusConfig = (status) => {
    switch (status) {
      case 'delivered': return { color: '#10b981', bg: '#d1fae5', icon: <CheckCircleOutlineIcon fontSize="small"/>, label: 'Delivered' };
      case 'out_for_delivery': return { color: '#0284c7', bg: '#e0f2fe', icon: <LocalShippingOutlinedIcon fontSize="small"/>, label: 'Out for Delivery' };
      case 'cancelled': return { color: '#ef4444', bg: '#fee2e2', icon: <CancelOutlinedIcon fontSize="small"/>, label: 'Cancelled' };
      case 'packaging': return { color: '#d97706', bg: '#fef3c7', icon: <PendingOutlinedIcon fontSize="small"/>, label: 'Packaging' };
      default: return { color: '#6b7280', bg: '#f3f4f6', icon: <PendingOutlinedIcon fontSize="small"/>, label: status.replace(/_/g, ' ') };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className="order-card">
      
      {/* HEADER */}
      <div className="order-card-header">
        <div>
          <p className="order-label">Order ID</p>
          <p className="order-id">#{orderId}</p>
        </div>
        <div className={`order-status-badge`} style={{ color: statusConfig.color, backgroundColor: statusConfig.bg }}>
          {statusConfig.icon}
          <span>{statusConfig.label}</span>
        </div>
      </div>

      {/* BODY (Product Info) */}
      <div className="order-card-body">
        <div className="order-img-box">
          <img src={productImage} alt={productName} onError={(e) => (e.target.src = "/default-image.jpg")} />
        </div>
        <div className="order-details">
          <h4 className="order-product-name">{productName}</h4>
          <p className="order-date">Placed on {date}</p>
          <div className="order-price-row">
            <span className="order-price">{currency(totalAmount)}</span>
            <span className={`payment-badge ${paymentStatus}`}>{paymentStatus}</span>
          </div>
        </div>
      </div>

      {/* FOOTER (Actions) */}
      <div className="order-card-footer">
        <Link to={`/order/${orderId}/details`} className="order-action-btn secondary">
          View Details
        </Link>
        
        {/* Only show "Track Order" if it's out for delivery */}
        {status === 'out_for_delivery' && (
          <button className="order-action-btn primary">
            Track Order
          </button>
        )}

        {/* Admin/Vendor controls (Optional: uncomment if you want inline status updates) */}
        {/* 
        <select onChange={(e) => handleOrderStatus(orderItem, e.target.value)}>
          <option value="">Update Status</option>
          <option value="delivered">Mark Delivered</option>
        </select> 
        */}
      </div>
    </div>
  );
}