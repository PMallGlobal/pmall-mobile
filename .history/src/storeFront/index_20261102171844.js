import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import Carousel from '../components/Carousel';
import CategorySection from '../products/CategorySection'; 
import './StoreFront.css';

const StoreFront = () => {
  const fetchAllCategories = async () => {
    const response = await fetch("https://api.pmall.com.ng/api/v1/public/products/get-all-categories", {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Failed to fetch categories`);
    const result = await response.json();
    return result.data;   
  };


  const fetchAllProducts = async () => {
    const response = await fetch("https://api.pmall.com.ng/api/v1/public/products/list-all", {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Failed to fetch products`);
    const result = await response.json();
    return result.data;   
  };

  const { data: productCategories, isPending: catPending } = useQuery({
    queryKey: ['product-categories'],  
    queryFn: fetchAllCategories,      
    staleTime: 1000 * 60 * 10,         
  });

  const { data: allProducts, isPending: prodPending } = useQuery({
    queryKey: ['all-products'],  
    queryFn: fetchAllProducts,      
    staleTime: 1000 * 60 * 10,         
  });


  const productsByCategory = useMemo(() => {
    if (!allProducts) return {};
    return allProducts.reduce((acc, product) => {
      if (!product.category_id) return acc;
      acc[product.category_id] = acc[product.category_id] || [];
      acc[product.category_id].push(product);
      return acc;
    }, {});
  }, [allProducts]);

  const isLoading = catPending || prodPending;

  return ( 
    <div className="store-container">
      <div className="store-header-section">
        <Carousel />
      </div>

      <div className="store-categories-wrap">
        <div className="store-section-header">
          <h3>Shop by Category</h3>
          <Link to="/category" className="see-all-link">See all</Link>
        </div>
        
        <div className="category-pills-scroll">
          {catPending ? (
            Array(6).fill(0).map((_, i) => (
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

      <div className="store-sections-wrap">
        {isLoading ? (
          <div className="p-4 text-center">Loading products...</div>
        ) : (
          productCategories?.map((category) => {
            const categoryProducts = (productsByCategory[category.id] || []).slice(0, 10);
            if (categoryProducts.length === 0) return null;

            return (
              <CategorySection 
                key={category.id} 
                categoryId={category.id} 
                categoryName={category.name} 
                products={categoryProducts} 
              />
            );
          })
        )}
      </div>
    </div>
  );
}
 
export default StoreFront;