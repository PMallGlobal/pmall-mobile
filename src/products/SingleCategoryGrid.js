import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LimitWord from "../utils/limitWord";
import currency from "../utils/formatCurrency";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const PRODUCTS_ENDPOINT = "https://stage.api.pmall.com.ng/api/v1/public/products/list-all";
const CATEGORIES_ENDPOINT = "https://stage.api.pmall.com.ng/api/v1/public/products/get-all-categories";

const SingleCategoryGrid = ({ categoryId = null, related=false }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState("");
  const [carouselIndices, setCarouselIndices] = useState({});


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
      }else{
        
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

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, [fetchCategoriesAndProducts]);



  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div style={{ width: "100%" }}>
      {categories
        ?.filter((category) => productsByCategory[category.id]?.length > 0)
        .map((category) => {
          const products = shuffleArray(productsByCategory[category.id] || []);
          const categoryId = category.id;
  
          // Initialize index for this category if not exists
          if (!(categoryId in carouselIndices)) {
            setCarouselIndices((prev) => ({ ...prev, [categoryId]: 0 }));
          }
          return (
            <div className="flex flex-col g-10 bg-white-contain" key={category.id}>
  
              <div>
                <div className="carousel-wrapper">

                  <div className={`carousel-container ${related && "related"}`}>
                  <div className="category-items">
                    <div className={`products-grid ${related && "related"}`}>
                        {products.map((product) => (
                        <div className="product-grid-item" key={product.id}>
                            <div className="product-cart-wrap">
                            <div className="product-badges product-badges-position product-badges-mrg"></div>

                            <div className="product-info default-cover card">
                                <Link to={`/product/${product.id}`} className="img-bg">
                                <img
                                    src={product.image || "/default-image.jpg"}
                                    alt={product.name || "Product Image"}
                                    className="product__image"
                                    style={{
                                    width: "100%",
                                    height: "200px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    }}
                                    onError={(e) => (e.target.src = "/default-image.jpg")}
                                />
                                </Link>

                                <Link to={`/product/${product.id}`} className="no__underline">
                                <div className="product_desc" style={{ padding: "12px 8px" }}>
                                    <div className="flex-col g-5">
                                    <p className="product__name bold uppercase">
                                        {LimitWord(product.name || "Unnamed Product", 2)}
                                    </p>
                                    <p className="product__name text-muted yyyybbb">
                                        {LimitWord(product.description, 4)}
                                    </p>
                                    <h3 className="red bold product__cost">
                                        {currency(product.selling_price || 0)}
                                        &nbsp;
                                        {product.cost_price && (  // Fixed typo: ccst_price → cost_price
                                        <span className="cost__price">
                                            {currency(product.cost_price)}
                                        </span>
                                        )}
                                    </h3>
                                    </div>
                                </div>
                                </Link>
                                <div className="add-cart">
                                  <p>Add to Cart</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
  
      {cartMessage && <p className="cart-message">{cartMessage}</p>}
    </div>
  );
};

export default SingleCategoryGrid;