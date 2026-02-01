import React, { useEffect, useState, useCallback } from 'react'
import CategoryHeader from '../components/CategoryHeader'
import { useParams, Link } from "react-router-dom";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LimitWord from '../utils/limitWord';
import SingleCategoryGrid from './SingleCategoryGrid';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext"
import { getCart } from "../utils/cartUtils";



export default function Details() {
  const [loading, setLoading] = useState(null);
  const { id } = useParams();
  const [moreImages, setMoreImages] = useState([]);
  const [value, setValue] = useState(4);
  const [detail, setDetails] = useState(null);
  const [wordLimit, setWordLimit] = useState(30);
  const [showReadMore, setShowReadMore] = useState(true);
  const [numOfItems, setNumOfItems] = useState(1)
  const navigate = useNavigate();
  const [cartMessage, setCartMessage] = useState("");
  const [cartCount, setCartCount] = useState(0)
  const [tags, setTags] = useState([])

  const [mainImage, setMainImage] = useState(detail?.image || '/default-image.jpg');

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl);
  };


  const getProductDetails = () => {
    setLoading(true);
    // getProductsCategories();
    fetch(
      `https://stage.api.pmall.com.ng/api/v1/public/products/single-product?product_id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          // Authorization: "Bearer " + user?.token,
        },
      }
    )
      .then((resp) => resp.json())
      .then((result) => {
        const product = result?.data;

        if (product) {
          let parsedImages = [];
      
          // Handle tags safely
          if (typeof product.more_images === 'string') {
            try {
              parsedImages = JSON.parse(product.more_images);
              // Make sure it's really an array after parse
              if (!Array.isArray(parsedImages)) {
                parsedImages = [];
              }
            } catch (parseErr) {
              console.error("Failed to parse tags string:", parseErr);
              parsedImages = [];
            }
          } else if (Array.isArray(product.more_images)) {
            parsedImages = product.more_images;
          }
      
          // Trim tags (optional but good)
          parsedImages = parsedImages.map(tag => 
            typeof tag === 'string' ? tag.trim() : tag
          ).filter(tag => tag !== '');
      
          // Now set detail with clean array
          setDetails({
            ...product,
            tags: parsedImages,
          });
      
          // Also set inputValues for edit form
          setDetails(prev => ({
            ...prev,
            more_images: parsedImages,
            // ... other fields
          }));

          setMoreImages(parsedImages)
          console.log(parsedImages);
        }
 
        setDetails(result?.data);

        setMainImage(result?.data?.image)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
      console.log(detail);
  };

  function countWords(text) {
    if (!text || typeof text !== 'string') return 0;
    
    // Remove extra spaces, trim, then split by whitespace
    return text
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0)
      .length;
  }

  const readMore  = () =>{
    setWordLimit(countWords(detail?.description))
  }

  const addCommasToNumberString = (numberString) =>{
    return  numberString?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
  }

  const incAmt = () => {
    if(numOfItems < Number(detail?.inStock)){
      setNumOfItems(numOfItems+1)
    }
  }

  const decAmt = () => {
    if(numOfItems > 1){
      setNumOfItems(numOfItems-1)
    }
  }


  const handleAddToCart = useCallback(() => {
    // Safety: detail must exist
    if (!detail || !detail.id) {
      console.log("Cannot add: product detail missing");
      setCartMessage(<div className="error">Product data missing</div>);
      return;
    }
  
    // Prevent adding if out of stock
    if (Number(detail?.inStock)<= 0 || detail.quantity  <= 0) {
      setCartMessage(<div className="error">Out of stock</div>);
      console.log("Out of stock")
      console.log(detail)
      return;
    }
  
    // Use the dynamic quantity from state (user can change it)
  
  
    // Get fresh cart
    let cart = getCart() || [];
  
    // Find if product already exists
    const existingItemIndex = cart.findIndex(item => item?.id === detail.id);
  
    let updatedCart;
  
    if (existingItemIndex !== -1) {
      // Update quantity of existing item
      updatedCart = [...cart];
      if(updatedCart[existingItemIndex].amtItems < Number(detail.inStock) && updatedCart[existingItemIndex].amtItems + numOfItems <= Number(detail.inStock) ){
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex], 
          amtItems: Math.max(1, (updatedCart[existingItemIndex].amtItems || 1) + numOfItems),
        };
      }
  
      setCartMessage(
        <div className="success">
          Quantity updated for <strong>{detail.name}</strong> (+{numOfItems}) <br />
          <Link to="/cart" style={{ color: "orange", textDecoration: "underline" }}>
            View Cart
          </Link>
        </div>
      );
    } else {
      // Add as new item with correct initial quantity
      updatedCart = [
        ...cart,
        { ...detail, amtItems: numOfItems } // ← use numOfItems, not hardcoded 1
      ];
  
      setCartMessage(
        <div className="success">
          <strong>{detail.name}</strong> added to cart ({numOfItems} ×) <br />
          <Link to="/cart" style={{ color: "orange", fontWeight: 700, textDecoration: "underline" }}>
            View Cart
          </Link>
        </div>
      );
    }
  
    // Save to localStorage safely
    try {
      localStorage.setItem("pmallCart", JSON.stringify(updatedCart));
      navigate('/cart')
    } catch (err) {
      console.error("Failed to save cart:", err);
      setCartMessage(<div className="error">Failed to save cart</div>);
      return;
    }
  
    // Bonus: Update global cart count if you have this function
    if (typeof setCartCount === 'function') {
      const newTotal = updatedCart.reduce((sum, item) => sum + (item.amtItems || 1), 0);
      setCartCount(newTotal);
    }
  
    // Auto-hide message
    setTimeout(() => setCartMessage(""), 7000);

    console.log(cart)
  
  }, [detail, numOfItems, setCartMessage, setCartCount]);
 
  
  useEffect(() => {
    console.log(id);
    // if(countWords(detail?.description) < 20){
    //   // setShowReadMore(false)
    //   // console.log(countWords(detail?.description))
    // }
    getProductDetails();
  }, []);

  return (
    <div className='details main'>
        <div className='details-t'>
            <CategoryHeader title='Product Details' />
            <div className="product-images-container">
              {/* Main large image */}
              <div className="main-image-wrapper">
                <img
                  src={mainImage}
                  alt={detail?.name || "Product"}
                  className="main-image"
                  onError={(e) => (e.target.src = '/default-image.jpg')}
                />
              </div>

              {/* Thumbnails */}
              {moreImages?.length > 0 && (
                <div className="moreImages">
                  <div className="moreImagesItems">
                    {/* Primary image as first thumbnail */}
                    <img
                      src={detail?.image || '/default-image.jpg'}
                      alt="Main product"
                      className={`thumbnail ${mainImage === detail?.image ? 'active' : ''}`}
                      onClick={() => handleThumbnailClick(detail?.image || '/default-image.jpg')}
                      onError={(e) => (e.target.style.display = 'none')}
                    />

                    {/* Additional images */}
                    {moreImages.map((image, index) => (
                      <img
                        key={index}
                        src={image.trim()}
                        alt={`Product view ${index + 1}`}
                        className={`thumbnail ${mainImage === image.trim() ? 'active' : ''}`}
                        onClick={() => handleThumbnailClick(image.trim())}
                        onError={(e) => (e.target.style.display = 'none')}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
        </div>
        <div className='details-b'>
            <div className='db1'>
              <div className='cat-name-container'>
                <div className='cat-name'>
                  <p>{detail?.category.name}</p>
                </div>
              </div>
              <p className='product-name'>{detail?.name}</p>
              <p className='brand-name'>Brand: {detail?.brand.name}</p>
              <p className='in-stock'><span className='num'>{detail?.inStock}</span> available in stock</p>
            </div>
            <div className='db2 flex justsb'>
              <div className='flex g-20 all-center'>
                <div>
                  {/* <img src={detail?.vendor.photo} alt="img" /> */}
                  <img src="/images/Ellipse 280.png" alt="" />
                </div>
                <div className='flex flex-col g-5'>
                  <p className='store-name'>{detail?.vendor.store_name}</p>
                  <p className='seller'>seller</p>
                </div>
              </div>
              <div className='flex all-center g-40'>
                <div className='icon-container'>
                  <ChatOutlinedIcon className='chat-icon icon' />
                </div>
                <div className='icon-container'>
                  <PhoneOutlinedIcon className='call-icon icon' />
                </div>
              </div>
            </div>
            <div className='db3 flex-col'>
              <div className='product-info' >
                <p>Product Information</p>
              </div>
              <p className='product-desc'>{LimitWord(detail?.description || "Unnamed description", wordLimit)} {showReadMore && <span onClick={readMore} className="read-more">READ MORE</span>}</p>
            </div>
            
            <div className='db4'>
              <p className='page-title'>Related Products</p>
              <div>
                <SingleCategoryGrid categoryId={detail?.category.id} related={true} />
              </div>
            </div>
        </div>
        <div className='details-footer'>
            <div className='flex-col g-10'>
              <p className='price'>&#x20A6;{addCommasToNumberString(detail?.selling_price)}</p>
              <div className='flex alc g-20'>
                <p>Quantity:</p>
                <div className='flex alc g-20'>
                  <div className={`quantity-icon ${numOfItems == 1 && "dec"}`} onClick={decAmt}>
                    <RemoveOutlinedIcon className='icon' />
                  </div>
                  <p className='quantity-num'>{numOfItems}</p>
                  <div className={`quantity-icon ${numOfItems == detail?.inStock && "dec"}`} onClick={incAmt}>
                    <AddOutlinedIcon className='icon' />
                  </div>
                </div>
              </div>
            </div>
            <div className="add-cart-btn flex alc g-20 pointer" onClick={handleAddToCart}>
              <ShoppingCartOutlinedIcon />
              <p>Add to Cart</p>
            </div>
        </div>
    </div>
  )
}

