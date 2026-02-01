import { useState, useEffect, useCallback } from "react";
import CategoryHeader from '../components/CategoryHeader'
import OrderItemCard from './OrderItemCard';
import { useUser } from "../context/UserContext";
import { BASE_URL } from "../utils/config"; 

export default function Orders() {
  const [loading, setLoading] = useState(false)
  const [allOrders, setAllOrders] = useState([]);
  const [allCustOrders, setAllCustOrders] = useState([]);
  const statuses = [{name: "delivered"}, {name: "ongoing"}, {name: "pending"} ]
  const [filterStatus, setFilterStatus] = useState();
  const [toast, setToast] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");
  const user = useUser();
  console.log(user.user.accountType)
    const orders = [
        {
          id: 1,
          name: "CARICH Cool Algal Fluoride-Free Toothpaste",
          image: "https://api.pmall.com.ng/storage/productImages/40_1759017056.png",
          category_name: "PERSONAL CARE",
          order_number: "02080909",
          date_delivered: "20-10-2025",
          delivered: true,
        },
        {
          id: 67,
          name: "Wireless Bluetooth Headphones Pro",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
          category_name: "ELECTRONICS",
          order_number: "02080909",
          date_delivered: "20-10-2025",
          delivered: true,
        },
        {
          id: 89,
          name: "Organic Cotton T-Shirt – Black",
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
          category_name: "FASHION",
          order_number: "02080909",
          date_delivered: "20-10-2025",
          delivered: true,
        },
        {
          id: 124,
          name: "Smart LED Bulb – 10W RGB",
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          category_name: "HOME & LIVING",
          order_number: "02080909",
          date_delivered: "20-10-2025",
          delivered: true,
        },
        {
          id: 203,
          name: "Premium Stainless Steel Water Bottle 1L",
          image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800",
          category_name: "KITCHEN & DINING",
          order_number: "02080909",
          date_delivered: "20-10-2025",
          delivered: true,
        }
      ];
      const getMyOrder = async () => {
        setLoading(true);
        console.log(user);
      let determinWhoseOrder = 
      user?.user.accountType === "Stockist" ? "stockist/allorder" : 
      user?.user.accountType === "Vendor" ? "sales/vendorsales" : 
      user?.user.accountType === "Admin" ? "sales" : "customer/sales/history";
      console.log(determinWhoseOrder);
        try {
          const response = await fetch(`${BASE_URL}/${determinWhoseOrder}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              Accept: "application/json",
              Authorization: `Bearer ${user?.user.token}`,
            },
          });
      
          const result = await response.json();
          console.log(result);
          if(result.status) {
            setAllOrders(result?.data || []);
            setAllCustOrders(result?.sales || []);
          }
          
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };
      const getOrderByStatus = async (status) => {
        setLoading(true);

      if (user?.user.accountType === "Admin"){ 
        try {
          const response = await fetch(`${BASE_URL}/sales/status/${status}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              Accept: "application/json",
              Authorization: `Bearer ${user?.user.token}`,
            },
          });
      
          const result = await response.json();
          console.log(result);
          if(result.status) {
            if(status == "all"){
              getMyOrder()
            }else{
            setAllOrders(result?.data || []);
            }
          }
          
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      }
      };

      const handleOrderStatus = async (orderStatus, e) => {
        setLoading(true);
        const selectedStatus = e?.target?.value;
        console.log("Order:", orderStatus);
        console.log("Selected Status:", selectedStatus);
    
        const requestBody = {
          status: selectedStatus,
          // stockist_id: orderStatus.order.stockist_id
        };
      
        try {
          const response = await fetch(`${BASE_URL}/order/${orderStatus?.id}/status`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              Accept: "application/json",
              Authorization: "Bearer " + user?.user.token,
            },
            body: JSON.stringify(requestBody),
          });
      
          const result = await response.json();
          setLoading(false);
          if(result.status) {
            setToast({ message: `Successful!... ${result.message}`, type: "success" });
              setTimeout(() => setToast(null), 5000);
              getMyOrder();
          console.log("Upating Order:", result);
          }else {
            setToast({ message: `Failed!... ${result.message}`, type: "error" });
            setOrderStatus("");
            setTimeout(() => setToast(null), 5000);
        console.log("Error Upating Order:", result);
          }
        } catch (error) {
          console.error("Error:", error);
          setToast({ message: `Failed... ${error}`, type: "error" });
              setTimeout(() => setToast(null), 5000);
              setLoading(false);
              setOrderStatus("");
              return false; //  failed
        }
        setLoading(false);
      };
      

      const handleOrderPaymentStatus = async( orderStatus, e)=> {
        setLoading(true);
        const selectedStatus = e?.target?.value;
        console.log("Order:", orderStatus);
        console.log("Selected Status:", selectedStatus);
    
        const requestBody = {
          payment_status: selectedStatus
        };
      
        try {
          const response = await fetch(`${BASE_URL}/sales/updatepayment/${orderStatus?.id}`, {
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
          if(result.status) {
            setToast({ message: `Successful!... ${result.message}`, type: "success" });
              setTimeout(() => setToast(null), 5000);
              getMyOrder();
          console.log("Upating Order:", result);
          }else {
            setToast({ message: `Failed!... ${result.message}`, type: "error" });
            setOrderStatus("");
            setTimeout(() => setToast(null), 5000);
        console.log("Error Upating Order:", result);
          }
        } catch (error) {
          console.error("Error:", error);
          setToast({ message: `Failed... ${error}`, type: "error" });
              setTimeout(() => setToast(null), 5000);
              setLoading(false);
              setOrderStatus("");
              return false; //  failed
        }
        setLoading(false);
      }

      const changeStatus =  (status) =>{
        setFilterStatus(status)
        console.log("Filter status changed to:", status);
      }

      useEffect(()=>{
          getMyOrder()  
 
      },[])
  return (
    <div className='orders'>
        <CategoryHeader title = 'My Orders' />
        <div className='flex flex-col g-20'>
            <div className='flex alc justsb g-20'>
                <p className=''>Filter by:</p>
                <select
                      name="pickup_location"
                      className="last-name form-control"
                      value={orderStatus}
                      onChange={(e) => getOrderByStatus(e.target.value)}
                      style={{marginTop: 18, textTransform: 'capitalize', width: '60%', height: 37,
                      padding: 10}}>
                    <option >Filter Order</option>
                    <option value="all">All</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="packaging">Packaging</option>
                    <option value="returned">Returned</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="delivered">Delivered</option>
                    <option value="customer_did_not_answer">Customer Didn't Answer Call</option>
                </select>
            </div>
            <div className='flex flex-col g-20' >
                {allOrders?.map((item)=>(
                   <OrderItemCard orderItem={item} handleOrderPaymentStatus={handleOrderPaymentStatus} orderStatus={orderStatus} handleOrderStatus={handleOrderStatus} />
                ))}
                 {allCustOrders?.map((item)=>(
                   <OrderItemCard orderItem={item} handleOrderPaymentStatus={handleOrderPaymentStatus} orderStatus={orderStatus} handleOrderStatus={handleOrderStatus} />
                ))}
            </div>
        </div>
    </div>
  )
}
