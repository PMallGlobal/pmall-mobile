import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'
import { BASE_URL } from "../utils/config";
import { useLocation } from "react-router-dom";
import Toast from '../utils/Toast';

export default function OrderItemCard({orderItem, title, status, handleOrderPaymentStatus, orderStatus, handleOrderStatus}) {
    const user = useUser();
    const [statuses, setStatuses] = useState("");
    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [order, setOrder] = useState(location?.state?.order);
    

    const handleStatusChange = async (orderState, e) => {
        setLoading(true);
        const selectedStatus = e?.target?.value;
        console.log("Order:", orderState);
        console.log("Selected Status:", selectedStatus);
    
        const requestBody = {
            stockist_id: orderItem?.stockist?.id,
            sale_id: parseInt(orderState?.pivot?.sale_id),
            product_id: parseInt(orderState?.pivot?.product_id),
          };
          console.log(selectedStatus);
        // 👉 Check if the selected status is "push-to-stockist"
        if (selectedStatus === "push-to-stockist") {
          try {
            const response = await fetch(`${BASE_URL}/orders/push`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: "Bearer " + user?.user.token,
              },
              body: JSON.stringify(requestBody),
            });
      
            const result = await response.json();
            setLoading(false);
            if (result.status) {
              setToast({
                message: `Successful!... ${result.message}`,
                type: "success",
              });
              setTimeout(() => setToast(null), 5000);
            //   getProductDetails();
              console.log("Pushing Result:", result);
            } else {
              setToast({ message: `Failed!... ${result.message}`, type: "error" });
              setStatuses("");
              setTimeout(() => setToast(null), 5000);
            }
          } catch (error) {
            console.error("Error:", error);
            setToast({ message: `Failed... ${error}`, type: "error" });
            setTimeout(() => setToast(null), 5000);
            setLoading(false);
            setStatuses("");
            return false; //  failed
          }
        } 
        
        if (selectedStatus === "deliver-to-stockist") {
          try {
            const response = await fetch(`${BASE_URL}/orders/delivertostockist`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: "Bearer " + user?.user.token,
              },
              body: JSON.stringify(requestBody),
            });
      
            const result = await response.json();
            setLoading(false);
            if (result.status) {
              setToast({
                message: `Successful!... ${result.message}`,
                type: "success",
              });
              setTimeout(() => setToast(null), 5000);
            //   getProductDetails();
              console.log("Delivered Result:", result);
            } else {
              setToast({ message: `Failed!... ${result.message}`, type: "error" });
              setStatuses("");
              setTimeout(() => setToast(null), 5000);
            }
          } catch (error) {
            console.error("Error:", error);
            setToast({ message: `Failed... ${error}`, type: "error" });
            setTimeout(() => setToast(null), 5000);
            setLoading(false);
            setStatuses("");
            return false; //  failed
          }
        } 
    
        setLoading(false);
      };
  return (
      <>
              {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    {orderItem?.products.map((item)=>(
    <div className="cart-item flex alc w-full g-20 orderItem ">
        <div className='cartimg'>
            <img src={item?.image} alt="" />
        </div>
        <div className='w-full flex flex-col g-10'>
            <div className='cart-item-category'>
                <p>{item?.category_id}</p>
            </div>
            <div className='cart-item-name'>
            <p className='bold'> {item?.name}</p>
            </div>
            <div className='flex justsb alc'>
                <div className='cart-item-sellp flex flex-col g-10'>
                    <p className='order-num'>Order Number: {item?.pivot.sale_id}</p>
                    {user?.user.accountType == "Admin" && <p className='order-num'>Payment Status: {orderItem?.payment_status}</p>}
                    <p className='dd'>Date Delivered: {item?.date_delivered}</p>
                </div>
            </div>
        </div>
       {title != "details" ? <div>
          <Link to={`/order/${orderItem.id}/details`}> <h1 className='order-details-link'>Details</h1></Link> 
        </div> :user.user.accountType == "Vendor" ?
         <select
         name="order-status"
         className="last-name form-control"
         value={statuses} 
         onChange={(e) => handleStatusChange(item, e)}
         style={{
           marginTop: 4,
           textTransform: "capitalize",
         }}
       >
         <option value="">Manage Order</option>
         <option value="push-to-stockist">
           Push to Stockist
         </option>
         <option value="deliver-to-stockist">
           Deliver to Stockist
         </option>
       </select>:
       <h1></h1>
        
    }

    {title != "details" && user.user.accountType == "Stockist" &&

        <select
        name="pickup_location"
        className="last-name form-control"
        value={orderStatus}
        onChange={(e) => handleOrderStatus(orderItem, e)}
        style={{marginTop: 18, textTransform: 'capitalize', width: '60%', height: 37,
        padding: 10}}>
        <option value="">Manage Order</option>
        <option value="out_for_delivery">Out for Delivery</option>
        <option value="packaging">Packaging</option>
        <option value="returned">Returned</option>
        <option value="cancelled">Cancelled</option>
        <option value="confirmed">Confirmed</option>
        <option value="delivered">Delivered</option>
        <option value="customer_did_not_answer">Customer Didn't Answer Call</option>
        </select>
    }
        {orderItem?.status ?
        <div className={`delivered-btn ${orderItem?.status == "pending" ? "pending" :orderItem?.status=="ongoing" ? "ongoing" : "delivered" }`}>
            {orderItem?.status }
        </div>:
        <div className={`delivered-btn ${item?.refund ? "refund"  : "replacement" }`}>
            {item?.refund ?  <p>{status || "Refund"}</p> : <p>Replacement</p> }
        </div>
        }
        {title == "details" || title == "Rating" && 
         <div className='buy-again'>
           <p>{title == "Rating" ? "Rate this Product" : "Buy Again"}</p>
        </div>}
        {user?.user.accountType === 'Admin' && (
            <>
            <select
                name="mark_order"
                className="order-status "
                value={orderStatus}
                onChange={(e) => handleOrderPaymentStatus(orderItem, e)}
                style={{marginTop: 4, textTransform: 'capitalize', width: '60%'}}>
                <option value="">Manage Order</option>
                <option value="paid">Paid</option>
                <option value="not-paid">Not Paid</option>
            </select>
          </>
        )} 

       

    </div>
    ))}
    </>
  )
}
