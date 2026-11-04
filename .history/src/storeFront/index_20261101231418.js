import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import Carousel from '../components/Carousel';
import useProductCategories from "../hooks/useProductCategories";
import CategorySection from '../products/CategorySection'; // We will create this next
import './StoreFront.css';

const StoreFront = () => {
  const fetchAllCategories = async () => {
    const response = await fetch("https://api.pmall.com.ng/api/v1/public/products/get-all-categories", {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Failed to fetch categories: ${response.status}`);
    const result = await response.json();
    return result.data;   
  };

  const { data: productCategories, isPending } = useQuery({
    queryKey: ['product-categories'],  
    queryFn: fetchAllCategories,      
    staleTime: 1000 * 60 * 10,         
  });

  // Skeleton array for loading state
  const skeletonCategories = Array(6).fill({ id: 'sk' });

  return ( 
    <div className="store-container">
      {/* Top Header / Search / Banner */}
      <div className="store-header-section">
        <Carousel />
      </div>

      {/* Category Pills */}
      <div className="store-categories-wrap">
        <div className="store-section-header">
          <h3>Shop by Category</h3>
          <Link to="/category" className="see-all-link">See all</Link>
        </div>
        
        <div className="category-pills-scroll">
          {isPending ? (
            skeletonCategories.map((_, i) => (
              <div key={i} className="category-pill-skeleton">
                <div className="skeleton-circle" />
                <div className="skeleton-text" />
              </div>
            ))
          ) : (
            productCategories?.map((category) => (
              <Link key={category.id} to={`/category/${category.id}`} className="category-pill">
                <div className="category-pill-icon">
                  <img src={category.category_image} alt={category.name} loading="lazy" />
                </div>
                <p>{category.name}</p>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Product Sections */}
      <div className="store-sections-wrap">
        {isPending ? (
          <div className="p-4 text-center">Loading products...</div>
        ) : (
          productCategories?.map((category) => (
             // CategorySection fetches its own products based on the categoryId
            <CategorySection 
              key={category.id} 
              categoryId={category.id} 
              categoryName={category.name} 
            />
          ))
        )}
      </div>
    </div>
  );
}
 
export default StoreFront;