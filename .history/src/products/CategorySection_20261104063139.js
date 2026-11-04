import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import currency from '../utils/formatCurrency'; 
import LazyImage from '../utils/LazyImage';
import Toast from '../utils/Toast';
import { getCart } from '../utils/cartUtils';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CategorySection = ({ categoryId, categoryName, products }) => {
  const [toast, setToast] = useState(null);
  const [addedId, setAddedId] = useState(null); // Track which product was just added

  // 👇 THE MISSING HANDLER FUNCTION 👇
  const handleAddToCart = (e, product) => {
    e.preventDefault(); 
    e.stopPropagation();
    const stock = Number(product.quantity ?? 0);
    if (stock <= 0) {
      setToast({ message: 'This item is out of stock', type: 'error' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    let cart = getCart() || [];
    const idx = cart.findIndex((item) => item?.id === product.id);

    if (idx !== -1) {
      const existing = cart[idx];
      const currentQty = existing.amtItems || 1;
      
      if (currentQty >= stock) {
        setToast({ message: `Only ${stock} available in stock`, type: 'error' });
        setTimeout(() => setToast(null), 3000);
        return;
      }
      
      cart[idx] = { ...existing, amtItems: currentQty + 1 };
    } else {
      cart = [...cart, { ...product, amtItems: 1 }];
    }

    try {
      localStorage.setItem('pmallCart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      
      setAddedId(product.id);
      setToast({ message: `${product.name} added to cart`, type: 'success' });
      
      setTimeout(() => {
        setAddedId(null);
        setToast(null);
      }, 2000);
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to add to cart', type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <section className="sf-category-section">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <div className="sf-section-header">
        <h3 className="sf-section-title">{categoryName}</h3>
        <Link to={`/category/${categoryId}`} className="sf-see-all-pill">See all</Link>
      </div>

      <div className="sf-product-scroll-wrapper">
        <div className="sf-product-scroll">
          {products.map((product) => {
            const hasDiscount = Number(product.cost_price) > Number(product.selling_price);
            const discountPct = hasDiscount 
              ? Math.round(((Number(product.cost_price) - Number(product.selling_price)) / Number(product.cost_price)) * 100) 
              : 0;
            
            const isOutOfStock = Number(product.quantity ?? 0) <= 0;
            const isAdded = addedId === product.id;

            return (
              <div key={product.id} className="sf-product-card">
                <Link to={`/product/${product.id}`} className="sf-card-img-box">
                  <LazyImage src={product.image} alt={product.name} />
                  
                  {hasDiscount && (
                    <span className="sf-discount-badge">-{discountPct}%</span>
                  )}

                  {isOutOfStock && (
                    <span className="sf-out-of-stock-badge">Out of stock</span>
                  )}
                </Link>

               
                <div className="sf-card-content">
                  <Link to={`/product/${product.id}`} className="sf-card-title">
                    {product.name}
                  </Link>
                  
                  <div className="sf-card-bottom">
                    <div className="sf-card-price">
                      <span className="sf-price-current">{currency(product.selling_price)}</span>
                      {hasDiscount && (
                        <span className="sf-price-old">{currency(product.cost_price)}</span>
                      )}
                    </div>
                    
                    <button 
                      className={`sf-quick-add-btn ${isAdded ? 'added' : ''} ${isOutOfStock ? 'disabled' : ''}`}
                      aria-label="Add to cart"
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={isOutOfStock}
                    >
                      {isAdded ? (
                        <CheckCircleIcon fontSize="small" />
                      ) : (
                        <AddShoppingCartIcon fontSize="small" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="sf-scroll-fade"></div>
      </div>
    </section>
  );
};

export default CategorySection;