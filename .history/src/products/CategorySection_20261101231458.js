import React, { useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import currency from '../utils/formatCurrency'; // Assuming you have this

const CategorySection = ({ categoryId, categoryName }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // 1. Only fetch when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Start loading 200px before it enters the screen
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const fetchProducts = async () => {
    // Replace with your actual endpoint that filters by category
    const res = await fetch(`https://api.pmall.com.ng/api/v1/public/products/list-all?category_id=${categoryId}`);
    const result = await res.json();
    // Limit to 10 items for the storefront
    return result.data.slice(0, 10); 
  };

  const { data: products, isPending } = useQuery({
    queryKey: ['category-products', categoryId],
    queryFn: fetchProducts,
    enabled: isVisible, // Only run when visible!
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="category-section" ref={ref}>
      <div className="store-section-header">
        <h3>{categoryName}</h3>
        <Link to={`/category/${categoryId}`} className="see-all-link">See all</Link>
      </div>

      <div className="product-scroll-container">
        {(!isVisible || isPending) ? (
          // Skeletons while loading
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="sf-product-card skeleton">
              <div className="img-skeleton" />
              <div className="text-skeleton" />
              <div className="text-skeleton short" />
            </div>
          ))
        ) : (
          products?.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="sf-product-card">
              <div className="sf-card-img-wrap">
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
          ))
        )}
      </div>
    </div>
  );
};

export default CategorySection;