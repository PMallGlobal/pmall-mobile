import React from 'react';
import { Link } from 'react-router-dom';
import currency from '../utils/formatCurrency'; 

const CategorySection = ({ categoryId, categoryName, products }) => {
  return (
    <div className="category-section">
      <div className="store-section-header">
        <h3>{categoryName}</h3>
        <Link to={`/category/${categoryId}`} className="see-all-link">See all</Link>
      </div>

      <div className="product-scroll-container">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="sf-product-card">
            <div className="sf-card-img-wrap">
              {/* loading="lazy" ensures images off-screen don't load until scrolled */}
              <img src={product.image} alt={product.name} loading="lazy" />
            </div>
            <div className="sf-card-info">
              <p className="sf-card-title">{product.name}</p>
              <div className="sf-card-price">
                <span className="current">{currency(product.selling_price)}</span>
                {product.cost_price && (
                  <span className="old">{currency(product.cost_price)}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;