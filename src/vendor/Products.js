import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LimitWord from "../utils/limitWord";
import currency from "../utils/formatCurrency";
import CategoryHeader from '../components/CategoryHeader'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useUser } from "../context/UserContext";
import { useVendor } from "../context/AuthContext";
import { useVendorr } from "../context/VendorSignupContext";


export default function Products({categoryId = null,related=false }) {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState();
    const [newProduct, setNewProduct] = useState();
    const user = useUser()
    console.log(user.user)

      const {
        setToastMsg,
        loading,
        setLoading,
        toastMsg,
        setToastType,
      } = useVendor();

      const { vendorProductAmt,setVendorProductAmt} = useVendorr();

      const getProducts = () => {
        if(user?.user.accountType== "Vendor"){
          fetch("https://stage.api.pmall.com.ng/api/v1/products", {
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
              // for (const item of result) {
              //   if (item.status === 0) {
              //     publishedCount++;
              //   }
              // }
            })
            .catch((err) => {
              console.log(err);
            });
        }else{
          fetch("https://api.pmall.com.ng/api/v1/products/?store_id=" + user.user.storeId, {
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
              // for (const item of result) {
              //   if (item.status === 0) {
              //     publishedCount++;
              //   }
              // }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };

      const deleteProduct = (productId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');
        if (isConfirmed) {
          fetch("https://stage.api.pmall.com.ng/api/v1/products/delete-account?product_id=" + productId, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          })
            .then((resp) => resp.json())
            .then((result) => {
              if(result.status){
                setToastMsg("Great! Product deleted successfully");
                setToastType("success")
                setInterval(() => {
                  setToastMsg("");
         }, 5000);
                console.log(result);
                setNewProduct(result)
              }else{
                setToastMsg("Oops! there seems to be an error. Try again")
                setToastType("error")
                setInterval(() => {
                  setToastMsg("");
         }, 3000);
          }
            })
          .catch((err) => {
            console.log(err);
          });
        }
      };

      useEffect(() => {
        // fetchCategoriesAndProducts();
        getProducts()
      }, [newProduct]);
  return (
    <div className="products">
        <CategoryHeader title="Products" />
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
                                          <DeleteOutlineOutlinedIcon className="p-delete" onClick={()=>deleteProduct(product.id)} />
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
                              <div className="approved">
                                  <p>Approved</p>
                              </div>
                              <Link to={`/edit-product/${product.id}`} >
                                <div className="edit">
                                  <EditOutlinedIcon />
                                </div>
                              </Link>
                          </div>
                      ))}
                  </div>
              </div>
              </div>
              </div>
          </div>
          </div>
        </div>
        <div className="add-product">
            <AddOutlinedIcon />
        </div>
    </div>
  )
}
