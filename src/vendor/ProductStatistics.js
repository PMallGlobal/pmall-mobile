import React, { useEffect, useState } from 'react'
import CategoryHeader from '../components/CategoryHeader'
import { useParams, Link } from "react-router-dom";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LimitWord from '../utils/limitWord';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';
import SingleCategoryGrid from '../products/SingleCategoryGrid';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Rating from '@mui/material/Rating';
import Footer from '../components/footer';



export default function ProductStatistics() {
  const [loading, setLoading] = useState(null);
  const { id } = useParams();
  const [moreImages, setMoreImages] = useState([]);
  const [value, setValue] = useState(4);
  const [detail, setDetails] = useState(null);
  const [wordLimit, setWordLimit] = useState(30);
  const [showReadMore, setShowReadMore] = useState(true);
  const [numOfItems, setNumOfItems] = useState(1)
  const navigate = useNavigate();

  const [vendorForm, setVendorForm] = useState(true);

  const getProductDetails = () => {
    setLoading(true);
    // getProductsCategories();
    fetch(
      `https://api.pmall.com.ng/api/v1/public/products/single-product?product_id=${id}`,
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
        console.log(result);
        setDetails(result?.data);
        setMoreImages(result?.data?.more_images?.split(","));
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
    if(numOfItems <= detail?.inStock){
      setNumOfItems(numOfItems+1)
    }
  }

  const decAmt = () => {
    if(numOfItems > 1){
      setNumOfItems(numOfItems-1)
    }
  }

const handleAddToCart = () => {
  navigate('/cart');
};
  
  useEffect(() => {
    console.log(id);
    // if(countWords(detail?.description) < 20){
    //   // setShowReadMore(false)
    //   // console.log(countWords(detail?.description))
    // }
    getProductDetails();
  }, []);
  return (
    <div className='details statistics'>
        <div className='details-t'>
            <CategoryHeader title='Product Statistics' />
            <div>
              <img src={detail?.image} alt="" className='main-image' />
              <div className='moreImages'>
                <div className='moreImagesItems'>
                  {moreImages?.map((image) => (
                    <img src={image} alt="" />
                  ))}
                </div>
              </div>
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
            </div>
        </div>
        <div className='px-20'>
            <div className="vendor-affilate-container flex w-full ">
                <div className="vendor-affilate flex justsb alc  w-full">
                    <div className={`w-full flex all-center ${vendorForm && "active"} `}>
                        <p
                            className="pointer"
                            onClick={() => {
                            setVendorForm(true);
                            }}>
                            Reviews
                        </p>
                    </div>
                    <div  className={`w-full flex all-center ${!vendorForm && "active"} `}>
                        <p
                            className="pointer"
                            onClick={() => {
                            setVendorForm(false);
                            }}>
                            Statistics
                        </p>
                    </div>
                </div>
                <span className={`line  ${!vendorForm && "affilate"}`}></span>
            </div>
            {vendorForm  ?
            <div className='p-10 flex flex-col'>
            
                <div className='flex alc g-10 justsb  rating-head'>
                    <div className='flex g-10 alc '>
                        <p>Product Rating & Reviews</p>
                        <Rating
                            name="product-rating"
                            value={3}
                            readOnly={true}
                            size="small"
                            sx={{
                            '& .MuiRating-iconFilled': {
                                color: '#F9CE4E', // Amazon-style orange, or any color you want
                            }
                            }}
                        />
                        <p className='rating-amt'>(10 ratings)</p>
                    </div>
                    <ArrowForwardIosOutlinedIcon className='arr-ic' />
                </div>
                <div className='rating-items'>
                    <div className='flex flex-col g-10 rating-item'>
                        <div className='flex justsb'>
                            <Rating
                                name="product-rating"
                                value={3}
                                readOnly={true}
                                size="small"
                                sx={{
                                '& .MuiRating-iconFilled': {
                                    color: '#F9CE4E', // Amazon-style orange, or any color you want
                                }
                                }}
                            />
                            <p className='by'>By Ali Judy</p>
                        </div>
                        <p className='rating-desc'>Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem itsu mLorem ipsum Lorem ipsum</p>
                        <div className='date'>
                            <p>21-10-2024</p>
                        </div>
                    </div>
                    <div className='flex flex-col g-10 rating-item'>
                        <div className='flex justsb'>
                            <Rating
                                name="product-rating"
                                value={3}
                                readOnly={true}
                                size="small"
                                sx={{
                                '& .MuiRating-iconFilled': {
                                    color: '#F9CE4E', // Amazon-style orange, or any color you want
                                }
                                }}
                            />
                            <p className='by'>By Ali Judy</p>
                        </div>
                        <p className='rating-desc'>Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem itsu mLorem ipsum Lorem ipsum</p>
                        <div className='date'>
                            <p>21-10-2024</p>
                        </div>
                    </div>
                    <div className='flex flex-col g-10 rating-item'>
                        <div className='flex justsb'>
                            <Rating
                                name="product-rating"
                                value={3}
                                readOnly={true}
                                size="small"
                                sx={{
                                '& .MuiRating-iconFilled': {
                                    color: '#F9CE4E', // Amazon-style orange, or any color you want
                                }
                                }}
                            />
                            <p className='by'>By Ali Judy</p>
                        </div>
                        <p className='rating-desc'>Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem itsu mLorem ipsum Lorem ipsum</p>
                        <div className='date'>
                            <p>21-10-2024</p>
                        </div>
                    </div>
                </div>
            </div>  : 
        <div className='p-10 flex flex-col  '>
                <div className='flex alc g-10 justsb  rating-head'>
                        <p>Product Statistics</p>
                </div>
                <div className='rating-items'>
                    <div className='flex justsb g-10 rating-item'>
                            <p className='by'>Likes</p>
                            <p>23</p>
                    </div>
                    <div className='flex justsb g-10 rating-item'>
                            <p className='by'>Views</p>
                            <p>120</p>
                    </div>
                    <div className='flex justsb g-10 rating-item'>
                            <p className='by'>In stock</p>
                            <p>10</p>
                    </div>
                    <div className='flex justsb g-10 rating-item'>
                            <p className='by'>Sold</p>
                            <p>58</p>
                    </div>
                    <div className='flex justsb g-10 rating-item'>
                            <p className='by'>Shares</p>
                            <p>156</p>
                    </div>
                    <div className='flex justsb g-10 rating-item'>
                            <p className='by'>Reach</p>
                            <p>156</p>
                    </div>
                </div>
            </div>
            }
        </div>
        <Footer vendorIn={true} />
    </div>
  )
}

