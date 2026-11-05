import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useUser } from '../context/UserContext';
import { useVendorr } from '../context/VendorSignupContext';
import Toast from '../utils/Toast';
import LimitWord from "../utils/limitWord";
import currency from "../utils/formatCurrency";
import Footer from '../components/footer';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import UserAvatar from '../utils/UserAvatar'; 
import './MyStore.css';

export default function MyStore() {
  const { user } = useUser(); 
  const { wallet, orderAmt, setVendorProductAmt } = useVendorr();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const WEB_URL = window.location.origin;

  useEffect(() => {
    const getProducts = async () => {
      if (user?.accountType !== "Vendor") return;
      
      try {
          
        const res = await fetch(`https://api.pmall.com.ng/api/v1/products/list-all-by-vendor?store_id=PMS-182950`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        });
        const result = await res.json();
        setProducts(result.data || []);
        if (setVendorProductAmt) setVendorProductAmt(result.data?.length || 0);
      } catch (err) {
        console.error(err);
        setToast({ message: "Failed to load products", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [user]);

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setToast({ message: "Store link copied!", type: "success" });
    }).catch(() => {
      setToast({ message: "Failed to copy link", type: "error" });
    });
  };

  const filteredProducts = products.filter(p => 
    p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ms-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="ms-header-card">
        <div className="ms-profile-info">
          <UserAvatar name={user?.storeName || user?.fname} size={56} />
          <div className="ms-profile-text">
            <h2 className="ms-store-name">{user?.storeName || "My Store"}</h2>
            <p className="ms-owner-name">{user?.fname} {user?.lname}</p>
            <p className="ms-store-id">ID: {user?.storeId}</p>
          </div>
        </div>
        
        <button 
          className={`ms-copy-btn ${copied ? 'copied' : ''}`}
          onClick={() => copyToClipboard(`${WEB_URL}/store/${user?.storeId}`)}
        >
          {copied ? <CheckCircleIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
          {copied ? 'Copied' : 'Copy Link'}
        </button>
      </div>


      <div className="ms-stats-grid">
        <div className="ms-stat-card">
          <div className="ms-stat-icon bg-purple"><Inventory2OutlinedIcon /></div>
          <div>
            <p>Total Products</p>
            <h3>{products.length}</h3>
          </div>
        </div>
        <div className="ms-stat-card">
          <div className="ms-stat-icon bg-yellow"><TrendingUpOutlinedIcon /></div>
          <div>
            <p>Total Sales</p>
            <h3>{wallet?.pv || 0}</h3>
          </div>
        </div>
        <div className="ms-stat-card">
          <div className="ms-stat-icon bg-blue"><LocalMallOutlinedIcon /></div>
          <div>
            <p>Total Sold</p>
            <h3>{orderAmt || 0}</h3>
          </div>
        </div>
        <div className="ms-stat-card">
          <div className="ms-stat-icon bg-red"><ReplayOutlinedIcon /></div>
          <div>
            <p>Returned</p>
            <h3>0</h3>
          </div>
        </div>
      </div>

      
      <div className="ms-action-bar">
        <div className="ms-search-wrap">
          <SearchIcon className="ms-search-icon" />
          <input 
            type="text" 
            placeholder="Search my products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link to="/new-product" className="ms-add-btn">
          <AddIcon />
        </Link>
      </div>

      
      <div className="ms-products-section">
        <h3 className="ms-section-title">My Inventory</h3>
        
        {loading ? (
          <div className="ms-loading">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="ms-empty">
            <Inventory2OutlinedIcon style={{ fontSize: 60, color: '#d1d5db' }} />
            <h4>No products found</h4>
            <p>Add products to start selling in your store.</p>
          </div>
        ) : (
          <div className="ms-product-grid">
            {filteredProducts.map((product) => {
              const hasDiscount = Number(product.cost_price) > Number(product.selling_price);
              return (
                <div className="ms-product-card" key={product.id}>
                  <Link to={`/product/${product.id}`} className="ms-product-img-box">
                    <img 
                      src={product.image || "/default-image.jpg"} 
                      alt={product.name} 
                      onError={(e) => (e.target.src = "/default-image.jpg")}
                    />
                    {hasDiscount && <span className="ms-discount-badge">SALE</span>}
                  </Link>
                  
                  <div className="ms-product-info">
                    <Link to={`/product/${product.id}`} className="ms-product-title">
                      {product.name}
                    </Link>
                    
                    <div className="ms-product-price-row">
                      <span className="ms-price-current">{currency(product.selling_price)}</span>
                      {hasDiscount && (
                        <span className="ms-price-old">{currency(product.cost_price)}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer vendorIn={true} />  
    </div>
  );
}