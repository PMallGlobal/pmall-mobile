import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import { useQueries } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce'; 
import axios from 'axios';
import LimitWord from "../utils/limitWord";
import currency from "../utils/formatCurrency";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useVendorr } from "../context/VendorSignupContext";

const PRODUCTS_ENDPOINT = "https://api.pmall.com.ng/api/v1/public/products/list-all";
const CATEGORIES_ENDPOINT = "https://api.pmall.com.ng/api/v1/public/products/get-all-categories";

const ProductGrid = ({ categoryId = null }) => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState("");
  const [carouselIndices, setCarouselIndices] = useState({});
  const { searchInput,debouncedSearch} = useVendorr();

  const backgroundColors = ["#191970", "#6A5ACD", "#4169E1", "#008080"];

  const fetchCategories = async () => {
    const { data } = await axios.get(CATEGORIES_ENDPOINT);
    if (!data?.data || !Array.isArray(data.data)) {
      throw new Error("Invalid category data format");
    }
    return data.data; 
  };
  
  // const fetchProducts = async () => {

  //     const { data } = {storeId ? await axios.get("https://api.pmall.com.ng/api/v1/public/products/list-all-by-vendor?store_id=" + storeId) : await axios.get(PRODUCTS_ENDPOINT)};
   
  //   if (!data?.data || !Array.isArray(data.data)) {
  //     throw new Error("Invalid product data format");
  //   }
  //   return data.data; 
  // };

  const fetchProducts = async () => {
    let response;
  
    if (storeId) {
      response = await axios.get(
        `https://api.pmall.com.ng/api/v1/public/products/list-all-by-vendor?store_id=${storeId}`
      );
    } else {
      response = await axios.get(PRODUCTS_ENDPOINT);
    }
  
    const { data } = response;
  
    if (!data?.data || !Array.isArray(data.data)) {
      throw new Error("Invalid product data format");
    }
  
    return data.data;
  };
  
  const getStoreProducts = () => {
       
    fetch("https://api.pmall.com.ng/api/v1/public/products/list-all-by-vendor?store_id=" + storeId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      //   Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        // setProducts(result.data);
        // setVendorProductAmt(result.data.length)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const results = useQueries({
    queries: [
      {
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 1000 * 60 * 10, 
        gcTime:   1000 * 60 * 60,  
      },
      {
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5,  
        gcTime:   1000 * 60 * 30,  
      },
    ],
  });

  const [categoriesQuery, productsQuery] = results;

  const {
    data: categories = [],
    isPending: isCategoriesPending,
    isError: isCategoriesError,
    error: categoriesError,
  } = categoriesQuery;

  const {
    data: products = [],
    isPending: isProductsPending,
    isError: isProductsError,
    error: productsError,
  } = productsQuery;

 
  const productsByCategory = useMemo(() => {
    return products.reduce((acc, product) => {
      if (!product.category_id) return acc;
      acc[product.category_id] = acc[product.category_id] || [];
      acc[product.category_id].push(product);
      return acc;
    }, {});
  }, [products]);


  const displayedProducts = categoryId
    ? productsByCategory[categoryId] || []
    :
      products;


  const isAnyPending = isCategoriesPending || isProductsPending;
  const hasError = isCategoriesError || isProductsError;
  const errorMessage = isCategoriesError
    ? categoriesError?.message
    : isProductsError
      ? productsError?.message
      : null;


  const categoryBackgrounds = useMemo(
    () =>
      categories.reduce((acc, category, index) => {
        acc[category.id] = backgroundColors[index % backgroundColors.length];
        return acc;
      }, {}),
    [categories]
  );


  const filteredProducts = products.filter(p =>
      p.name?.toLowerCase().includes(debouncedSearch) ||
      p.description?.toLowerCase().includes(debouncedSearch) ||
      p.category_name?.toLowerCase().includes(debouncedSearch)
    );

    console.log(filteredProducts)


  const handleViewAll = useCallback(
    (category) => {
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

  if (hasError) {
    return (
      <div className="p-6 text-red-600">
        Failed to load: {errorMessage || "Unknown error"}
        <button
          onClick={() => {
            categoriesQuery.refetch();
            productsQuery.refetch();
          }}
          className="ml-4 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      {isAnyPending ? 
      <div class="products-grid">
        <div class="product-card skeleton">
          <div class="product-image"></div>
            <div class="product-info">
              <div class="skeleton-line title"></div>
              <div class="skeleton-line price"></div>
              <div class="skeleton-line rating"></div>
              <div class="skeleton-button"></div>
            </div>
          </div>
          <div class="product-card skeleton">
          <div class="product-image"></div>
            <div class="product-info">
              <div class="skeleton-line title"></div>
              <div class="skeleton-line price"></div>
              <div class="skeleton-line rating"></div>
              <div class="skeleton-button"></div>
            </div>
          </div>
          <div class="product-card skeleton">
          <div class="product-image"></div>
            <div class="product-info">
              <div class="skeleton-line title"></div>
              <div class="skeleton-line price"></div>
              <div class="skeleton-line rating"></div>
              <div class="skeleton-button"></div>
            </div>
          </div>
          <div class="product-card skeleton">
          <div class="product-image"></div>
            <div class="product-info">
              <div class="skeleton-line title"></div>
              <div class="skeleton-line price"></div>
              <div class="skeleton-line rating"></div>
              <div class="skeleton-button"></div>
            </div>
          </div>
        </div>
         :
        <>
      {categories
        ?.filter((category) => productsByCategory[category.id]?.length > 0)
        .map((category) => {
          const products = shuffleArray(productsByCategory[category.id] || []);
          const categoryId = category.id;
  
          // Initialize index for this category if not exists
          if (!(categoryId in carouselIndices)) {
            setCarouselIndices((prev) => ({ ...prev, [categoryId]: 0 }));
          }
  
          const currentIndex = carouselIndices[categoryId] || 0;
          const productsPerView = 2;
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
            <div className="flex flex-col g-10 bg-white-contain" key={category.id}>
              {searchInput !== "" && 
                <div className="search-modal">
                  {filteredProducts.map((product) => (
                    <div className="w-full" key={product.id}>
                      <div className="">
                        <div className="product-badges product-badges-position product-badges-mrg"></div>
                        {products ? 
                          <div className="product-info default-cover card w-full">
                            <Link to={`/product/${product.id}`} className="img-bg">
                              <img
                                src={product.image || "https://placehold.net/400x400.png"}
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
                          </div> :
                          <div>
                            <img src="https://placehold.net/400x400.png" alt="" />
                          </div>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              }
              {/* Category Header */}
              <div
                className="flex justsb style-header"
                style={{ backgroundColor: categoryBackgrounds[category.id] }}
              >
                <div className="w-full section-tabs">
                  <div className="w-full flex justsb">
                    <h1>{category.name}</h1>
                    {categoryId && (
                      <p className="view__all__btn pointer" onClick={() => handleViewAll(category)}>
                        See all
                      </p>
                    )}
                  </div>
                </div>
              </div>
  
              {/* Carousel Section */}
              <div style={{ padding: "25px", paddingTop: "0px" }}>
                <div className="carousel-wrapper">
                  {/* Left Arrow */}
                  <button
                    className="carousel-arrow left"
                    onClick={prevSlide}
                    disabled={totalSlides <= 1}
                  >
                    <ChevronLeft fontSize="large" />
                  </button>
  
                  {/* Products Track */}
                  <div className="carousel-container">
                    <div
                      className="carousel-track flex"
                      style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                      }}
                    >
                      {products.map((product) => (
                        <div className="product-slide w-full" key={product.id}>
                          <div className="product-cart-wrap">
                            <div className="product-badges product-badges-position product-badges-mrg"></div>
                            {products ? 
                              <div className="product-info default-cover card">
                                <Link to={`/product/${product.id}`} className="img-bg">
                                  <img
                                    src={product.image || "https://placehold.net/400x400.png"}
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
                                      <h3 className=" bold product__cost">
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
                              </div> :
                              <div>
                                <img src="https://placehold.net/400x400.png" alt="" />
                              </div>
                            }
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
  
                  {/* Right Arrow */}
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
        </>
      }
      
      {cartMessage && <p className="cart-message">{cartMessage}</p>}
    </div>
  );
};

export default ProductGrid;