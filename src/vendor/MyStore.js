import React, { useEffect, useState } from 'react'
import Footer from '../components/footer';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import HeaderSearch from '../components/headerSearch';
import PlainProductGrid from '../products/PlainProductGrid';
import { useUser } from '../context/UserContext';
import { useVendorr } from '../context/VendorSignupContext';
import Toast from '../utils/Toast';
import { Link } from "react-router-dom";
import LimitWord from "../utils/limitWord";
import currency from "../utils/formatCurrency";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';



export default function MyStore() {
    const user = useUser();
    const { vendorProductAmt, wallet, orderAmt, setVendorProductAmt} = useVendorr();
    const [copied, setCopied] = useState(false);
    const [toast, setToast] = useState()
    const [products, setProducts] = useState();
    const WEB_URL = window.location.origin;
    const related=false;
    const getProducts = () => {
        if(user?.user.accountType== "Vendor"){
          fetch("https://api.pmall.com.ng/api/v1/products", {
            method: "GET",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          })
            .then((resp) => resp.json())
            .then((result) => {
              console.log(result);
              setProducts(result.data);
              setVendorProductAmt(result.data.length)
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };


    const copyToClipboard = (text) => {
    
        if (!text) return;
    
        navigator.clipboard.writeText(text)
          .then(() => {
            setCopied(true);
            // Reset "Copied!" after 2 seconds
            setTimeout(() => setCopied(false), 2000);
            setToast({
                message:"Copied to clipboard",
                type: "success"
            })
          })
          .catch((err) => {
            console.error("Failed to copy:", err);
          });
      };

      
      useEffect(() => {
        getProducts()
      }, []);

  return (
    <div className='dashboard my-store  '>
         {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <div className='flex justsb alc'>
            <div className='flex alc g-20 d-profile'>
                <div>
                    <h2 className='uppercase'>{user.user.fname} {user.user.lname}</h2>
                    <p>{user.user.storeId}</p>
                </div>

                <img src="/images/Ellipse 280.png" alt="" />
            </div>
            <div className='flex alc g-10 copy-store-link pointer' onClick={()=>copyToClipboard(`${WEB_URL}/store/${user.user.storeId}`)}>
                <ContentCopyOutlinedIcon className='copy' />
                <p>Copy my store link</p>
            </div>
        </div>

        <div className='store-name'>
            <p className='uppercase'>STORE NAME: {user.user.storeName}</p>
        </div>

        <div className='db-cards'>
            <div className='flex alc db-card bg-white justsb p-20'>
                <div className='flex flex-col justsb h-full g-20'>
                    <p>Total Products</p>
                    <h2>{vendorProductAmt}</h2>
                </div>
                <div className='bg-y'>
                    <img src="/images/shopping-bag_17390063.png" alt="" />
                </div>
            </div>
            <div className='flex alc db-card bg-white justsb p-20'>
                <div className='flex flex-col justsb h-full g-20'>
                    <p>Total Sales</p>
                    <h2>{wallet?.pv}</h2>
                </div>
                <div className='bg-p'>
                    <img src="/images/increasing_5329515.png" alt="" />
                </div>
            </div>
            <div className='flex alc db-card bg-white justsb p-20'>
                <div className='flex flex-col justsb h-full g-20'>
                    <p>Total Sold</p>
                    <h2>{orderAmt}</h2>
                </div>
                <div className='bg-p'>
                    <img src="/images/cubes_2875916.png" alt="" />
                </div>
            </div>
            <div className='flex alc db-card bg-white justsb p-20'>
                <div className='flex flex-col justsb h-full g-20'>
                    <p>Total Returned</p>
                    <h2>0.00</h2>
                </div>
                <div className='bg-y'>
                    <img src="/images/lsicon_sales-return-filled.png" alt="" />
                </div>
            </div>
        </div>

        <div className='flex flex-col g-20 vend-cat'>
            <HeaderSearch />
            {/* <PlainProductGrid /> */}
            <div style={{ width: "100%" }}>
          <div className="flex flex-col g-10 bg-white-contain">

          <div>
              <div className="carousel-wrapper">

              <div className={`carousel-container ${related && "related"}`}>
              <div className="category-items">
                  <div className={`products-grid ${related && "related"}`}>
                      {products?.map((product) => (
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
                                        <div className="flex justsb">
                                          <p className="product__name bold uppercase">
                                              {LimitWord(product.name || "Unnamed Product", 2)}

                                          </p>
                                        </div>
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
        </div>
        </div>
       
        <Footer vendorIn={true} />  

    </div>
  )
}
