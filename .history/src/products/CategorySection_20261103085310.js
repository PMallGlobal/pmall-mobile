import React from 'react';
import { Link } from 'react-router-dom';
import currency from '../utils/formatCurrency'; 
import LazyImage from '../utils/LazyImage';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const CategorySection = ({ categoryId, categoryName, products }) => {
  return (
    <section className="sf-category-section">
      
      {/* Section Header */}
      <div className="sf-section-header">
        <h3 className="sf-section-title">{categoryName}</h3>
        <Link to={`/category/${categoryId}`} className="sf-see-all-pill">See all</Link>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="sf-product-scroll-wrapper">
        <div className="sf-product-scroll">
          {products.map((product) => {
            // Calculate discount percentage if cost_price exists and is higher
            const hasDiscount = Number(product.cost_price) > Number(product.selling_price);
            const discountPct = hasDiscount 
              ? Math.round(((Number(product.cost_price) - Number(product.selling_price)) / Number(product.cost_price)) * 100) 
              : 0;

            return (
              <div key={product.id} className="sf-product-card">
                {/* Image Container */}
                <Link to={`/product/${product.id}`} className="sf-card-img-box">
                  <LazyImage src={product.image} alt={product.name} />
                  
                  {/* Discount Badge */}
                  {hasDiscount && (
                    <span className="sf-discount-badge">-{discountPct}%</span>
                  )}
                </Link>

                {/* Info Container */}
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
                    
                    {/* Quick Add Button */}
                    <button className="sf-quick-add-btn" aria-label="Add to cart">
                      <AddShoppingCartIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Right Fade Gradient to indicate scrollability */}
        <div className="sf-scroll-fade"></div>
      </div>
    </section>
  );
};

export default CategorySection;