import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LimitWord from "../utils/limitWord";
import currency from "../utils/formatCurrency";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { getCart } from "../utils/cartUtils"; 

const PRODUCTS_ENDPOINT = "https://api.pmall.com.ng/api/v1/public/products/list-all";
const CATEGORIES_ENDPOINT = "https://api.pmall.com.ng/api/v1/public/products/get-all-categories";

const SingleCategoryGrid = ({ categoryId = null, related = false }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategoriesAndProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: categoryData } = await axios.get(CATEGORIES_ENDPOINT);
      if (!categoryData?.data || !Array.isArray(categoryData.data)) {
        throw new Error("Invalid category data format");
      }
      setCategories(categoryData.data);

      const { data: productData } = await axios.get(PRODUCTS_ENDPOINT);
      if (!productData?.data || !Array.isArray(productData.data)) {
        throw new Error("Invalid product data format");
      }

      const groupedProducts = productData.data.reduce((acc, product) => {
        if (!product.category_id) return acc;
        acc[product.category_id] = acc[product.category_id] || [];
        acc[product.category_id].push(product);
        return acc;
      }, {});

      setProductsByCategory(categoryId ? { [categoryId]: groupedProducts[categoryId] || [] } : groupedProducts);
    } catch (err) {
      console.error("API Fetch Error:", err.message);
      setError("Failed to load categories or products.");
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, [fetchCategoriesAndProducts]);

  const handleAddToCart = (e, product) => {
    e.preventDefault(); 
    
    if (!product || product.quantity <= 0) return;
    
    let cart = getCart() || [];
    const idx = cart.findIndex(item => item?.id === product.id);
    
    if (idx !== -1) {
      cart[idx].amtItems = (cart[idx].amtItems || 1) + 1;
    } else {
      cart.push({ ...product, amtItems: 1 });
    }
    
    localStorage.setItem("pmallCart", JSON.stringify(cart));
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="pd-related__scroll">
         {[1, 2, 3].map(i => (
            <div key={i} className="pd-rel-card" style={{ opacity: 0.5 }}>
               <div className="pd-rel-card__img-wrap" style={{ background: '#eee' }} />
               <div style={{ height: 16, background: '#eee', marginTop: 10, borderRadius: 4 }} />
               <div style={{ height: 16, background: '#eee', marginTop: 6, width: '60%', borderRadius: 4 }} />
            </div>
         ))}
      </div>
    );
  }
  
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div style={{ width: "100%" }}>
      {categories
        ?.filter((category) => productsByCategory[category.id]?.length > 0)
        .map((category) => {
          const products = [...productsByCategory[category.id]].sort(() => Math.random() - 0.5).slice(0, related ? 10 : undefined);
          
          return (
            <div key={category.id}>
              <div className={related ? "pd-related__scroll" : "standard-products-grid"}>
                {products.map((product) => (
                  
                  <div className="pd-rel-card" key={product.id}>
                    <Link to={`/product/${product.id}`} className="pd-rel-card__img-wrap">
                      <img
                        src={product.image || "/default-image.jpg"}
                        alt={product.name || "Product"}
                        className="pd-rel-card__img"
                        loading="lazy"
                        onError={(e) => (e.target.src = "/default-image.jpg")}
                      />
                    </Link>

                    <div className="pd-rel-card__content">
                      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                        <h3 className="pd-rel-card__title">{product.name}</h3>
                      </Link>
                      
                      <div className="pd-rel-card__price-row">
                        <span className="pd-rel-card__price">
                          {currency(product.selling_price || 0)}
                        </span>
                        {product.cost_price && (
                          <span className="pd-rel-card__old-price">
                            {currency(product.cost_price)}
                          </span>
                        )}
                      </div>

                      <button 
                        className="pd-rel-card__add" 
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        <AddOutlinedIcon fontSize="small" />
                        Add
                      </button>
                    </div>
                  </div>

                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SingleCategoryGrid;