import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateSubtotal, getCart, vat, dFee } from '../utils/cartUtils';
import CategoryHeader from '../components/CategoryHeader';
import { useUser } from '../context/UserContext';
import { BASE_URL } from '../utils/config';
import MapComponent from '../components/MapComponent';
import Toast from "../utils/Toast";
import './Checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [activeTab, setActiveTab] = useState('guest'); 
  const [method, setMethod] = useState('pickup');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [allStockist, setAllStockist] = useState([]);
  const [selectedStockist, setSelectedStockist] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState(null);

  const [formDetails, setFormDetails] = useState({
    fname: '', lname: 'dennis', email: '', phone: '', address: '', state: '', lga: ''
  });

  const cart = getCart();
  const subtotal = calculateSubtotal(cart);
  const total = subtotal + vat + dFee;

  useEffect(() => {
    // Fetch pickup locations
    fetch(`${BASE_URL}/stockists/fetchstockist`, {
      headers: { Accept: "application/json" }
    })
      .then(res => res.json())
      .then(res => setAllStockist(res?.data || []))
      .catch(err => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const showToast = (message, type = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Auto-generate hidden credentials for Guest Checkout
  const generateCredentials = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return {
      username: `guest_${Date.now()}_${randomSuffix}`,
      password: `Pass@${randomSuffix}!${Date.now()}`,
      password_confirmation: `Pass@${randomSuffix}!${Date.now()}`
    };
  };

  const processCheckout = async () =>

  return (
    <div className="checkout-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="checkout-content">
        <div className="checkout-section">
            <div className="checkout-form">
              <h3 className="section-title">Customer Information</h3>
              {/* <div className="input-row"> */}
                <input type="text" name="fname" placeholder="First Name" value={formDetails.fname} onChange={handleInputChange} />
                {/* <input type="text" name="lname" placeholder="Last Name" value={formDetails.lname} onChange={handleInputChange} /> */}
              {/* </div> */}
              <div className="input-row">
              <input type="email" name="email" placeholder="Email Address" value={formDetails.email} onChange={handleInputChange} />
              <input type="tel" name="phone" placeholder="Phone Number" value={formDetails.phone} onChange={handleInputChange} />
              </div>
              <h3 className="section-title mt-4">Delivery Address</h3>
              <input type="text" name="address" placeholder="Street Address" value={formDetails.address} onChange={handleInputChange} />
              <div className="input-row">
                <input type="text" name="state" placeholder="State" value={formDetails.state} onChange={handleInputChange} />
                <input type="text" name="lga" placeholder="LGA / City" value={formDetails.lga} onChange={handleInputChange} />
              </div>
            </div>
          {/* )} */}
        </div>

       
        <div className="checkout-section">
          <h3 className="section-title">Delivery Method</h3>
          <div className="segmented-control">
            <button className={`segment ${method === 'pickup' ? 'active' : ''}`} onClick={() => setMethod('pickup')}>Pickup</button>
            <button className={`segment ${method === 'delivery' ? 'active' : ''}`} onClick={() => setMethod('delivery')}>Delivery</button>
          </div>

          {method === 'pickup' ? (
            <div className="mt-4">
              <label className="input-label">Select Pickup Location</label>
              
              <select className="custom-select" value={selectedStockist} onChange={(e) => setSelectedStockist(e.target.value)}>
                <option value="">-- Choose a location --</option>
                {allStockist.map(s => (
                  <option key={s.id} value={s.id}>{s.state} - ({s.city})</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="mt-4">
              <MapComponent onLocationSelect={setDeliveryAddress} />
            </div>
          )}
        </div>

     
        <div className="checkout-summary">
          <h3 className="section-title">Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>₦{subtotal.toLocaleString()}</span></div>
          <div className="summary-row"><span>VAT (7.5%)</span><span>₦{vat.toLocaleString()}</span></div>
          <div className="summary-row"><span>Delivery</span><span>₦{dFee.toLocaleString()}</span></div>
          <div className="summary-row total"><span>Total</span><span>₦{total.toLocaleString()}</span></div>
        </div>

      </div>

  
      <div className="checkout-sticky-footer">
        <div className="checkout-total">
          <p>Total Amount</p>
          <h2>₦{total.toLocaleString()}</h2>
        </div>
        <button className="btn-primary checkout-pay-btn" onClick={processCheckout} disabled={loading}>
          {loading ? 'Processing...' : 'Proceed to Pay'}
        </button>
      </div>
    </div>
  );
}