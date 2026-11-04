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
  const [activeTab, setActiveTab] = useState('guest'); // 'guest' or 'returning'
  const [method, setMethod] = useState('pickup');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [allStockist, setAllStockist] = useState([]);
  const [selectedStockist, setSelectedStockist] = useState('');

  // Simplified Form State (No username/password)
  const [formDetails, setFormDetails] = useState({
    fname: '', lname: '', email: '', phone: '', address: '', state: '', lga: ''
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

  const processCheckout = async () => {
    if (cart.length === 0) return showToast("Cart is empty", "error");
    if (method === 'pickup' && !selectedStockist) return showToast("Please select a pickup location", "error");
    
    setLoading(true);
    
    try {
      let customerId = user?.id;
      let tokenToUse = user?.token;

      // 1. GUEST REGISTRATION (If not logged in)
      if (!user?.loggedIn) {
        if (!formDetails.email || !formDetails.phone || !formDetails.fname) {
          throw new Error("Please fill all required fields");
        }

        const credentials = generateCredentials();
        const payload = {
          ...formDetails,
          ...credentials,
          name: `${formDetails.fname} ${formDetails.lname}`.trim()
        };

        const regRes = await fetch(`${BASE_URL}/customer/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        
        const regData = await regRes.json();
        if (!regData.status) throw new Error(regData.message || "Registration failed");

        customerId = regData.customer.id;
        tokenToUse = regData.token;

        // Auto Login
        const loginRes = await fetch(`${BASE_URL}/customer/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ username: credentials.username, password: credentials.password }),
        });
        const loginData = await loginRes.json();
        if (loginData.data?.token) {
          tokenToUse = loginData.data.token;
          localStorage.setItem("userToken", tokenToUse);
        }
        
        setUser({ id: customerId, token: tokenToUse, loggedIn: true, ...formDetails });
      }

      // 2. INITIATE CHECKOUT (Create Sale)
      const checkoutRes = await fetch(`${BASE_URL}/customer/checkout/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${tokenToUse}`,
        },
        body: JSON.stringify({
          customer_id: customerId,
          stockist_id: selectedStockist,
          products: cart.map(p => ({ product_id: p.id, quantity: p.amtItems }))
        }),
      });
      
      const checkoutData = await checkoutRes.json();
      if (!checkoutData.status) throw new Error(checkoutData.message || "Checkout initiation failed");

      // 3. INITIATE PAYMENT
      const payRes = await fetch(`${BASE_URL}/customer/checkout/paystack/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${tokenToUse}`,
        },
        body: JSON.stringify({
          sale_id: checkoutData.sale.id,
          amount: checkoutData.sale.total_amount,
        }),
      });

      const payData = await payRes.json();
      if (!payData.status) throw new Error("Payment initiation failed");

      // Redirect to Paystack
      window.location.href = payData.authorization_url;
      localStorage.removeItem("pmallCart");

    } catch (error) {
      showToast(error.message || "Something went wrong during checkout", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <CategoryHeader title="Checkout" />

      <div className="checkout-content">
        
        {/* Tabs */}
        <div className="checkout-tabs">
          <button 
            className={`checkout-tab ${activeTab === 'returning' ? 'active' : ''}`}
            onClick={() => setActiveTab('returning')}
          >
            Returning Customer
          </button>
          <button 
            className={`checkout-tab ${activeTab === 'guest' ? 'active' : ''}`}
            onClick={() => setActiveTab('guest')}
          >
            Guest Checkout
          </button>
        </div>

        {/* Form Section */}
        <div className="checkout-section">
          {activeTab === 'returning' ? (
             <div className="checkout-returning">
                {/* Simplified login form - assuming your Returning component exists */}
                {/* For simplicity, we will just show a button to navigate to login */}
                <p className="text-muted text-center mb-4">Please log in to your account to continue.</p>
                <button className="btn-primary w-full" onClick={() => navigate('/login')}>
                  Log In
                </button>
             </div>
          ) : (
            <div className="checkout-form">
              <h3 className="section-title">Contact Information</h3>
              <div className="input-row">
                <input type="text" name="fname" placeholder="First Name" value={formDetails.fname} onChange={handleInputChange} />
                {/* <input type="text" name="lname" placeholder="Last Name" value={formDetails.lname} onChange={handleInputChange} /> */}
              </div>
              <div className="input-row">
              <input type="email" name="email" placeholder="Email Address" value={formDetails.email} onChange={handleInputChange} />
              <input type="tel" name="phone" placeholder="Phone Number" value={formDetails.phone} onChange={handleInputChange} />
              
              <h3 className="section-title mt-4">Delivery Address</h3>
              <input type="text" name="address" placeholder="Street Address" value={formDetails.address} onChange={handleInputChange} />
              <div className="input-row">
                <input type="text" name="state" placeholder="State" value={formDetails.state} onChange={handleInputChange} />
                <input type="text" name="lga" placeholder="LGA / City" value={formDetails.lga} onChange={handleInputChange} />
              </div>
            </div>
          )}
        </div>

        {/* Delivery Method */}
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
              <MapComponent />
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h3 className="section-title">Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>₦{subtotal.toLocaleString()}</span></div>
          <div className="summary-row"><span>VAT (7.5%)</span><span>₦{vat.toLocaleString()}</span></div>
          <div className="summary-row"><span>Delivery</span><span>₦{dFee.toLocaleString()}</span></div>
          <div className="summary-row total"><span>Total</span><span>₦{total.toLocaleString()}</span></div>
        </div>

      </div>

      {/* Sticky Bottom Bar */}
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