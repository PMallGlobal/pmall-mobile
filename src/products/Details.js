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
import Toast from '../utils/Toast';
import { useQuery } from '@tanstack/react-query';



export default function Details() {
  const [loading, setLoading] = useState(null);
  const { id } = useParams();
  const [moreImages, setMoreImages] = useState([]);
  const [value, setValue] = useState(4);
 
  const [wordLimit, setWordLimit] = useState(30);
  const [showReadMore, setShowReadMore] = useState(true);
  const [numOfItems, setNumOfItems] = useState(1)
  const navigate = useNavigate();
  const [cartMessage, setCartMessage] = useState("");
  const [cartCount, setCartCount] = useState(0)
  const [tags, setTags] = useState([])
  const [toast, setToast] = useState()
 
 const fetchProductById = async (productId) => {
  const url = `https://api.pmall.com.ng/api/v1/public/products/single-product?product_id=${productId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json",
      // Authorization: `Bearer ${user?.token || ''}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  const product = result?.data;

  if (!product) {
    throw new Error("No product data returned");
  }

  // Parse more_images safely
  let parsedImages= [];

  if (typeof product.more_images === 'string') {
    try {
      parsedImages = JSON.parse(product.more_images);
      if (!Array.isArray(parsedImages)) parsedImages = [];
    } catch (err) {
      console.error("Failed to parse more_images:", err);
      parsedImages = [];
    }
  } else if (Array.isArray(product.more_images)) {
    parsedImages = product.more_images;
  }

  // Clean up
  parsedImages = parsedImages
    .map((tag) => (typeof tag === 'string' ? tag.trim() : ''))
    .filter((tag) => tag !== '');

  // Return enriched product
  return {
    ...product,
    more_images: parsedImages,   // consistent array
    tags: parsedImages,          // if you want both fields
  };
};

const {
  data: product,
  isPending,
  isError,
  error,
  isFetching,
} = useQuery({
  queryKey: ['product', id],
  queryFn: () => fetchProductById(id),
  enabled: !!id,
  staleTime: 1000 * 60 * 5,    // 5 min
  gcTime: 1000 * 60 * 30,
});


const [mainImage, setMainImage] = useState('https://placehold.net/400x400.png');


useEffect(() => {
  if (product?.image) {
    setMainImage(product.image);
  }
}, [product?.image]);

const handleThumbnailClick = (imageUrl) => {
  setMainImage(imageUrl);
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
    setWordLimit(countWords(product?.description))
  }

  const addCommasToNumberString = (numberString) =>{
    return  numberString?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
  }

  const incAmt = () => {
    if(numOfItems < Number(product?.inStock)){
      setNumOfItems(numOfItems+1)
    }
  }

  const decAmt = () => {
    if(numOfItems > 1){
      setNumOfItems(numOfItems-1)
    }
  }


  const handleAddToCart = useCallback(() => {
    // Safety: product must exist
    if (!product || !product.id) {
      console.log("Cannot add: product product missing");
      setCartMessage(<div className="error">Product data missing</div>);
      setToast({
        message:cartMessage,
        type: "error"
      })
      return;
    }
  
    // Prevent adding if out of stock
    if (Number(product?.inStock)<= 0 || product.quantity  <= 0) {
      setCartMessage(<div className="error">Out of stock</div>);
      console.log("Out of stock")
      console.log(product)

      setToast({
        message:cartMessage,
        type: "error"
      })

      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
      return;
    }
  

    let cart = getCart() || [];
  
    const existingItemIndex = cart.findIndex(item => item?.id === product.id);
  
    let updatedCart;
  
    if (existingItemIndex !== -1) {
      // Update quantity of existing item
      updatedCart = [...cart];
      if(updatedCart[existingItemIndex].amtItems < Number(product.inStock) && updatedCart[existingItemIndex].amtItems + numOfItems <= Number(product.inStock) ){
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex], 
          amtItems: Math.max(1, (updatedCart[existingItemIndex].amtItems || 1) + numOfItems),
        };
      }
  
      setCartMessage(
        <div className="success">
          Quantity updated for <strong>{product.name}</strong> (+{numOfItems}) <br />
          <Link to="/cart" style={{ color: "orange", textDecoration: "underline" }}>
            View Cart
          </Link>
        </div>
      );
    } else {
      updatedCart = [
        ...cart,
        { ...product, amtItems: numOfItems }
      ];
  
      setCartMessage(
        <div className="success">
          <strong>{product.name}</strong> added to cart ({numOfItems} ×) <br />
          <Link to="/cart" style={{ color: "orange", fontWeight: 700, textDecoration: "underline" }}>
            View Cart
          </Link>
        </div>
      );
    }
  
    try {
      localStorage.setItem("pmallCart", JSON.stringify(updatedCart));
      navigate('/cart')
    } catch (err) {
      console.error("Failed to save cart:", err);
      setCartMessage(<div className="error">Failed to save cart</div>);
      return;
    }
  

    if (typeof setCartCount === 'function') {
      const newTotal = updatedCart.reduce((sum, item) => sum + (item.amtItems || 1), 0);
      setCartCount(newTotal);
    }
  
    setTimeout(() => setCartMessage(""), 7000);

    console.log(cart)
  
  }, [product, numOfItems, setCartMessage, setCartCount]);

  if (isPending) {
    return (
      <div className="p-6 animate-pulse space-y-6">
        <div className="h-80 w-full bg-gray-200 rounded-xl" />
        <div className="h-10 w-3/4 bg-gray-200 rounded" />
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  
  if (isError || !product) {
    return (
      <div className="p-6 text-red-600">
        {error?.message || "Product not found"}
        <button onClick={() => window.location.reload()} className="ml-4 underline">
          Retry
        </button>
      </div>
    );
  }
  
  const { image: primaryImage, more_images = [], name, price, description } = product;
  return (
    <div className='details main'>
      {toast && <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} /> }
        <div className='details-t'>
            <CategoryHeader title='Product Details' />
            <div className="product-images-container">
              {/* Main large image */}
              <div className="main-image-wrapper"> 
                <img
                  src={mainImage}
                  alt={product?.name || "Product"}
                  className="main-image"
                  onError={(e) => (e.target.src = 'https://placehold.net/400x400.png')}
                />
              </div>

              {/* Thumbnails */}
              {moreImages?.length > 0 && (
                <div className="moreImages">
                  <div className="moreImagesItems">
                    {/* Primary image as first thumbnail */}
                    <img
                      src={product?.image || '/default-image.jpg'}
                      alt="Main product"
                      className={`thumbnail ${mainImage === product?.image ? 'active' : ''}`}
                      onClick={() => handleThumbnailClick(product?.image || '/images/image-skelet0n.webp')}
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
                  <p>{product?.category.name}</p>
                </div>
              </div>
              <p className='product-name'>{product?.name}</p>
              <p className='brand-name'>Brand: {product?.brand.name}</p>
              <p className='in-stock'><span className='num'>{product?.inStock}</span> available in stock</p>
            </div>
            <div className='db2 flex justsb'>
              <div className='flex g-20 all-center'>
                <div>
                  <img src={product?.vendor.photo} alt="img" />
                  {/* <img src="/images/Ellipse 280.png" alt="" /> */}
                </div>
                <div className='flex flex-col g-5'>
                  <p className='store-name'>{product?.vendor.store_name}</p>
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
              <p className='product-desc'>{LimitWord(product?.description || "Unnamed description", wordLimit)} {showReadMore && <span onClick={readMore} className="read-more">READ MORE</span>}</p>
            </div>
            
            <div className='db4'>
              <p className='page-title'>Related Products</p>
              <div>
                <SingleCategoryGrid categoryId={product?.category.id} related={true} />
              </div>
            </div>
        </div>
        <div className='details-footer'>
            <div className='flex-col g-10'>
              <p className='price'>&#x20A6;{addCommasToNumberString(product?.selling_price)}</p>
              <div className='flex alc g-20'>
                <p>Quantity:</p>
                <div className='flex alc g-20'>
                  <div className={`quantity-icon ${numOfItems == 1 && "dec"}`} onClick={decAmt}>
                    <RemoveOutlinedIcon className='icon' />
                  </div>
                  <p className='quantity-num'>{numOfItems}</p>
                  <div className={`quantity-icon ${numOfItems == product?.inStock && "dec"}`} onClick={incAmt}>
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

