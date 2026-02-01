import React, { useState, useEffect } from 'react';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import CategoryHeader from '../components/CategoryHeader'
import OrderItemCard from './OrderItemCard'
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from '../utils/config';
import { useUser } from '../context/UserContext';
import Toast from '../utils/Toast';

export default function OrderDetails() {
    const order = 
        {
          id: 1,
          name: "CARICH Cool Algal Fluoride-Free Toothpaste",
          image: "https://stage.api.pmall.com.ng/storage/productImages/40_1759017056.png",
          category_name: "PERSONAL CARE",
          order_number: "02080909",
          date_delivered: "20-10-2025",
          delivered: true,
        }

    const [loading, setLoading] = useState(null);
    const { id } = useParams();
    const [detail, setDetails] = useState(null);
    const [toast, setToast] = useState(null);
    const user = useUser()

    console.log(user)

    const getOrderDetails = () => {
        setLoading(true);
        let determinWhoseOrder = 
        user.user.accountType === "Stockist" ? "vendor/stockist" : 
        user.user.accountType === "Vendor" ? "vendor" :
        user.user.accountType === "Admin" ? "sales" : "";    
        console.log(determinWhoseOrder); 
           fetch(
            `${BASE_URL}/${determinWhoseOrder}/order/${id}`,
            {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: "Bearer " + user?.user.token,
            },
            }
        )
            .then((resp) => resp.json())
            .then((result) => {
            console.log(result?.data);
            setDetails(result?.data);
            setLoading(false);
            })
            .catch((err) => {
            console.log(err);
            setLoading(false);
            });
            console.log(detail);
        };

    const [status, setStatus] = useState("Delivered")
    useEffect(() => {
        getOrderDetails();
        }, []);    
  return (
    <div className='order-details'>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

        <div>
            <CategoryHeader title = 'Order Details' />
        </div>

        <div>
            <OrderItemCard orderItem={detail} title="details" status={status}  />
            
        </div>
        {user.user.accountType === "Vendor" ?
            <div className="flex flex-col g-40">
                <div>
                    <div className='cart-summary-container order-d'>
                        <p className='summ-title'>Payment</p>
                        <div className='cart-summary p-10'>
                            <div>
                                <div className='summ-section'>
                                    <p className='summ-left'>No of Items</p>
                                    <p className='summ-right'>{detail?.products.length}</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Placed on</p>
                                    <p className='summ-right'>{detail?.created_at}</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Amount paid</p>
                                    <p className='summ-right'>N {detail?.total_amount}</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Stock Left:</p>
                                    <p className='summ-right'>309</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Payment Type</p>
                                    <p className='summ-right'>Transfer</p>
                                </div>
                                <div className='summ-section last'>
                                    <p  className='summ-left'>Order Number</p>
                                    <div className='flex alc g-5'>
                                        <p className='summ-right'>{id}</p>
                                        <ContentCopyOutlinedIcon className='copy' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {detail?.status == "pending" ? 
                <div className='flex g-40 justsb w-full '> 
                        <button
                            className="login-btn login w-full"
                            // disabled={loading}
                            type="submit"
                            // onClick={handleLogin}
                            >
                            {/*  {loading ? <ButtonLoader /> : "Login"} */}
                            Submit
                        </button>
                        <button
                            className="login-btn cancel w-full"
                            // disabled={loading}
                            type="submit"
                            // onClick={handleLogin}
                            >
                            Cancel
                        </button>
                    </div>
                :
                    <div className='summ-section bg-white p-10 rounded-sm status'>
                        <p className='summ-left'>Status</p>
                        <p className='summ-right'>{detail?.status == "Delivered" ? "Delivered" : detail?.status == "ongoing" && "Out for Delivery" }</p>
                    </div>
                }
            </div>
            :user.user.accountType === "Stockist" ?
            <div className="flex flex-col g-40">
                <div>
                    {status == "Delivered" ? 
                    <div className='cart-summary-container order-d'>
                        <p className='summ-title'>Delivery Details</p>
                        <div className='cart-summary p-10'>
                            <div>
                                <div className='summ-section'>
                                    <p className='summ-left'>No of Items</p>
                                    <p className='summ-right'>1</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Placed on</p>
                                    <p className='summ-right'>11-10-2025</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Amount paid</p>
                                    <p className='summ-right'>N 34,000</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Stock Left:</p>
                                    <p className='summ-right'>309</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Payment Type</p>
                                    <p className='summ-right'>Transfer</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Rider's Name</p>
                                    <p className='summ-right'>Nwachu Linothy</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Rider's Number</p>
                                    <p className='summ-right'>09199283736</p>
                                </div>
                                <div className='summ-section'>
                                    <p  className='summ-left'>Order Number</p>
                                    <div className='flex alc g-5'>
                                        <p className='summ-right'>02453727</p>
                                        <ContentCopyOutlinedIcon className='copy' />
                                    </div>
                                </div>
                                <div className='summ-section last'>
                                    <p className='summ-left'>Delivery Date</p>
                                    <p className='summ-right'>10-11-2025</p>
                                </div>
                            </div>
                        </div>
                    </div>: status == "Pending" ?
                    <div className='cart-summary-container order-d'>
                    <p className='summ-title'>Delivery Details</p>
                    <div className='cart-summary p-10'>
                        <div>
                            <div className='summ-section'>
                                <p className='summ-left'>No of Items</p>
                                <p className='summ-right'>1</p>
                            </div>
                            <div className='summ-section'>
                                <p className='summ-left'>Placed on</p>
                                <p className='summ-right'>11-10-2025</p>
                            </div>
                            <div className='summ-section'>
                                <p className='summ-left'>Amount paid</p>
                                <p className='summ-right'>N 34,000</p>
                            </div>
                            <div className='summ-section'>
                                <p className='summ-left'>Stock Left:</p>
                                <p className='summ-right'>309</p>
                            </div>
                            <div className='summ-section'>
                                <p className='summ-left'>Payment Type</p>
                                <p className='summ-right'>Transfer</p>
                            </div>
                            <div className='summ-section '>
                                <p  className='summ-left'>Order Number</p>
                                <div className='flex alc g-5'>
                                    <p className='summ-right'>02453727</p>
                                    <ContentCopyOutlinedIcon className='copy' />
                                </div>
                            </div>
                            <div className='summ-section last'>
                                <p className='summ-left'>Order Date</p>
                                <p className='summ-right'>10-11-2025</p>
                            </div>
                        </div>
                    </div>
                    </div> :
                    <div className='cart-summary-container order-d'>
                        <p className='summ-title'>Dispatch Details</p>
                        <div className='cart-summary p-10'>
                            <div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Rider's Name</p>
                                    <p className='summ-right'>Nwachu Linothy</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Rider's Number</p>
                                    <p className='summ-right'>09199283736</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Amount paid</p>
                                    <p className='summ-right'>N 34,000</p>
                                </div>
                                <div className='summ-section last'>
                                    <p  className='summ-left'>Order Number</p>
                                    <div className='flex alc g-5'>
                                        <p className='summ-right'>02453727</p>
                                        <ContentCopyOutlinedIcon className='copy' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                </div>
                {status == "Pending" ? 
                    <div className='flex flex-col g-20'>
                    <div className='summ-section bg-white p-10 rounded-sm status'>
                            <p className='summ-left'>Status</p>
                            <p className='summ-right'>Pending</p>
                        </div>

                        <div className='flex g-40 justsb w-full '> 
                            <button
                                className="login-btn login w-full"
                                // disabled={loading}
                                type="submit"
                                // onClick={handleLogin}
                                >
                                {/*  {loading ? <ButtonLoader /> : "Login"} */}
                                Submit
                            </button>
                            <button
                                className="login-btn cancel w-full"
                                // disabled={loading}
                                type="submit"
                                // onClick={handleLogin}
                                >
                                Cancel
                            </button>
                        </div>
                    </div>
                :
                    <div className='summ-section bg-white p-10 rounded-sm status'>
                        <p className='summ-left'>Status</p>
                        <p className='summ-right'>{status == "Delivered" ? "Delivered" : status == "Ongoing" && "Out for Delivery" }</p>
                    </div>
                }
            </div> :
            <div className="flex flex-col g-40">
                <div>
                    <div className='cart-summary-container order-d'>
                        <p className='summ-title'>Payment</p>
                        <div className='cart-summary'>
                            <div>
                                <div className='summ-section'>
                                    <p className='summ-left'>No of Items</p>
                                    <p className='summ-right'>1</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Placed on</p>
                                    <p className='summ-right'>11-10-2025</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Amount</p>
                                    <p className='summ-right'>N 34,000</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Delivery Fee</p>
                                    <p className='summ-right'>N1,500</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Total Amount:</p>
                                    <p className='summ-right'>N 35,500</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Payment Type</p>
                                    <p className='summ-right'>Transfer</p>
                                </div>
                                <div className='summ-section'>
                                    <p className='summ-left'>Package Type</p>
                                    <p className='summ-right'>N/A</p>
                                </div>
                                <div className='summ-section last'>
                                    <p  className='summ-left'>Order Number</p>
                                    <div className='flex alc g-5'>
                                        <p className='summ-right'>02453727</p>
                                        <ContentCopyOutlinedIcon className='copy' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='order-addy-container'>
                    <p className='head bold'>Address</p>
                    <div className='order-addy'>
                        <p>House 24, Opposite NNPC Filling Station, Lifecamp, FCT Abuja.</p>

                        <p>House 24, Opposite NNPC Filling Station, Lifecamp, FCT Abuja.</p>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}
