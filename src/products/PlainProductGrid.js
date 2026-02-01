import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LimitWord from "../utils/limitWord";
import currency from "../utils/formatCurrency";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const PRODUCTS_ENDPOINT = "https://stage.api.pmall.com.ng/api/v1/public/products/list-all";
const CATEGORIES_ENDPOINT = "https://stage.api.pmall.com.ng/api/v1/public/products/get-all-categories";

const PlainProductGrid = ({ categoryId = null }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState("");
  const [carouselIndices, setCarouselIndices] = useState({});

  const backgroundColors = ["#191970", "#6A5ACD", "#4169E1", "#008080"];

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

  const categoryBackgrounds = useMemo(
    () =>
      categories.reduce((acc, category, index) => {
        acc[category.id] = backgroundColors[index % backgroundColors.length];
        return acc;
      }, {}),
    [categories]
  );

  const handleViewAll = useCallback(
    (category) => {
      // Convert to lowercase and replace spaces/special chars with hyphens
      const slug = category.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-')      // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start
        .replace(/-+$/, '');         // Trim - from end
  
      navigate(`/category/${slug}`, { state: { category } });
    },
    [navigate]
  );

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div style={{ width: "100%" }}>
      {categories
        ?.filter((category) => productsByCategory[category.id]?.length > 0)
        .map((category) => {
          const products = shuffleArray(productsByCategory[category.id] || []);
          const categoryId = category.id;
  
          if (!(categoryId in carouselIndices)) {
            setCarouselIndices((prev) => ({ ...prev, [categoryId]: 0 }));
          }
  
          const currentIndex = carouselIndices[categoryId] || 0;
          const productsPerView = 3;
          const totalSlides = Math.ceil(products.length / productsPerView);
  
          const nextSlide = () => {
            setCarouselIndices((prev) => ({
              ...prev,
              [categoryId]: (prev[categoryId] + 1) % totalSlides,
            }));
          };
  
          const prevSlide = () => {
            setCarouselIndices((prev) => ({
              ...prev,
              [categoryId]: (prev[categoryId] - 1 + totalSlides) % totalSlides,
            }));
          };
  
          return (
            <div className="flex flex-col  g-10 bg-white-contain" key={category.id}>
              <div
                className="flex justsb style-header w-full"
                style={{ margin: 0 }}
              >
                <div className="w-full section-tabs">
                  <div className="w-full flex justsb"  style={{ color: 'black'}}>
                    <h1>{category.name}</h1>
                    {categoryId && (
                      <p className="view__all__btn pointer" onClick={() => handleViewAll(category)}>
                        See all
                      </p>
                    )}
                  </div>
                </div>
              </div>
 
              <div >
                <div className="carousel-wrapper">
                  <button
                    className="carousel-arrow left"
                    onClick={prevSlide}
                    disabled={totalSlides <= 1}
                  >
                    <ChevronLeft fontSize="large" />
                  </button>

                  <div className="carousel-container">
                    <div
                      className="carousel-track main"
                      style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                      }}
                    >
                      {products.map((product) => (
                        <div className="product-slide" key={product.id}>
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
                                    height: "180px",
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
                                      {LimitWord(product.name || "Unnamed Product", 3)}
                                    </p>
                                    <p className="product__name text-muted yyyybbb">
                                      {LimitWord(product.description, 7)}
                                    </p>
                                    <h3 className="red bold product__cost">
                                      {currency(product.selling_price || 0)}
                                      &nbsp;
                                      {product.cost_price && (
                                        <span className="cost__price">
                                          {currency(product.cost_price)}
                                        </span>
                                      )}
                                    </h3>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
  
                  <button
                    className="carousel-arrow right"
                    onClick={nextSlide}
                    disabled={totalSlides <= 1}
                  >
                    <ChevronRight fontSize="large" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
  
      {cartMessage && <p className="cart-message">{cartMessage}</p>}
    </div>
  );
};

export default PlainProductGrid;