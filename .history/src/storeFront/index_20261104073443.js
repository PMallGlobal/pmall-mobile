import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import Carousel from '../components/Carousel';
import CategorySection from '../products/CategorySection'; 
import { useUser } from '../context/UserContext';
import { getCart } from '../utils/cartUtils';
import './StoreFront.css';

import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

const StoreFront = () => {
  const { user } = useUser();
  const cartCount = (getCart() || []).reduce((sum, item) => sum + (item.amtItems || 1), 0);

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
    <div className="sf-page">

      <div className="sf-banner-wrap">
        <Carousel />
      </div>

            <div className="sf-categories-wrap">
        <div className="sf-section-header">
          <h3>Shop by Category</h3>
          <Link to="/category" className="sf-see-all-pill">See all</Link>
        </div>
        
        <div className="sf-category-scroll">
          {catPending ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="sf-cat-item skeleton">
                <div className="sf-cat-icon skeleton-box" />
                <div className="sf-cat-text-skeleton" />
              </div>
            ))
          ) : (
            productCategories?.map((category) => (
              <Link key={category.id} to={`/category/${category.id}`} className="sf-cat-item">
                <div className="sf-cat-icon">
                  <img src={category.category_image} alt={category.name} loading="lazy" />
                </div>
                <p className="sf-cat-name">{category.name}</p>
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="sf-sections">
        {isLoading ? (
          <div className="sf-loading">Loading amazing products...</div>
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