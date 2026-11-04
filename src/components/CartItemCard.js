import React from 'react';
import { Link } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export default function CartItemCard({ cartItem, handleDeleteItem, handleQuantityChange }) {
  const hasDiscount = Number(cartItem.cost_price) > Number(cartItem.selling_price);
  
  return (
    <div className="cart-item-card">
      <Link to={`/product/${cartItem.id}`} className="cart-item-img-box">
        <img 
          src={cartItem.image || '/default-image.jpg'} 
          alt={cartItem.name} 
          onError={(e) => (e.target.src = '/default-image.jpg')}
        />
      </Link>

    
      <div className="cart-item-info">
        <Link to={`/product/${cartItem.id}`} className="cart-item-title">
          {cartItem.name}
        </Link>
        
        <div className="cart-item-price-row">
          <span className="cart-price-current">₦{Number(cartItem.selling_price).toLocaleString()}</span>
          {hasDiscount && (
            <span className="cart-price-old">₦{Number(cartItem.cost_price).toLocaleString()}</span>
          )}
        </div>

        <div className="cart-item-actions">
          <div className="cart-qty-stepper">
            <button 
              className="qty-btn" 
              onClick={() => handleQuantityChange(cartItem.id, -1)}
              disabled={cartItem.amtItems <= 1}
            >
              <RemoveIcon fontSize="small" />
            </button>
            <span className="qty-value">{cartItem.amtItems}</span>
            <button 
              className="qty-btn" 
              onClick={() => handleQuantityChange(cartItem.id, 1)}
            >
              <AddIcon fontSize="small" />
            </button>
          </div>

          <button 
            className="cart-delete-btn"
            onClick={() => handleDeleteItem(cartItem.id)}
            aria-label="Remove item"
          >
            <DeleteOutlineOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
}