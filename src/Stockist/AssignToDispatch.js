import React, { useState } from 'react'
import CategoryHeader from '../components/CategoryHeader'
import { useVendor } from '../context/AuthContext'
import OrderItemCard from '../orders/OrderItemCard'
import { useUser } from "../context/UserContext";
import { BASE_URL } from "../utils/config";
import ButtonLoader from '../utils/buttonLoader';


export default function AssignToDispatch() {
    const order = 
    {
      id: 1,
      name: "CARICH Cool Algal Fluoride-Free Toothpaste",
      image: "https://api.pmall.com.ng/storage/productImages/40_1759017056.png",
      category_name: "PERSONAL CARE",
      order_number: "02080909",
      date_delivered: "20-10-2025",
      delivered: true,
    }
    const [status, setStatus] = useState("Pending") 
    const user = useUser();
    const [toast, setToast] = useState(null);
    const [statuses, setStatuses] = useState("");

    const {
        inputValues,
        setState,
        onChangeHandler,
        setToastMsg,
        loading,
        setLoading,
        toastMsg,
        setToastType,
      } = useVendor();
    

      const handleStatusChange = async (orderState, e) => {
        setLoading(true);
        const selectedStatus = e?.target?.value;
        console.log("Order:", orderState);
        console.log("Selected Status:", selectedStatus);
    
        const requestBody = {
            stockist_id: order?.stockist?.id,
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
                Authorization: "Bearer " + user?.token,
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
                Authorization: "Bearer " + user?.token,
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
    
    // const handleAddStockist = async(e) => {
    //     if (e) {
    //       e.preventDefault(); 
    //       setLoading(true)
    //     try {
    //       const response = await fetch('https://stage.api.pmall.com.ng/api/v1/orders/push', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json;charset=UTF-8",
    //             Accept: "application/json",
    //             Authorization: "Bearer " + localStorage.getItem("authToken"),
    //           },
    //           body:JSON.stringify(inputValues)
    //       });
    //       console.log(inputValues)
    //       if (response.ok) {
    //         const data = await response.json();
    //         setToastMsg("Great! Dispatch assigned successfully");
    //         setToastType("success")
    //         setInterval(() => {
    //           setToastMsg("");
    //         }, 5000);
    //         setLoading(false)
    //         console.log(data)
    //         // window.location.href = "/affilate/my-stockist";
    //         // setNewProduct(data)
    //       } else {
    //         const error = await response.text();
    //         console.error('Error posting product:', error);
    //         setLoading(false)
    //         setToastMsg("Oops! there seems to be an error. Fill in correct credentials")
    //         setToastType("error")
    //         setInterval(() => {
    //           setToastMsg("");
    //  }, 3000);
    //       }
    //     } catch (error) {
    //       console.error('Network error:', error);
    //     }
    //   }
    //   };
  return (
    <div className='order-details atd'>
        <div>
            <CategoryHeader title = 'Assign Order to Dispatch' image="true" />
        </div>
        <div>
            <OrderItemCard orderItem={order} title="details" status={status}  />
        </div>

        <form action="" className='flex flex-col g-20' onSubmit={handleStatusChange}>
            <div className="pos-rel flex flex-col g-10">
                <label className="abs py-10">First Name  </label>
                <input
                    type="text"
                    name="fname"
                    className="last-name form-control w-full"
                    // onChange={onChangeHandler}
                    // value={inputValues.lname || ""}
                    placeholder="ROY"
                />
            </div>
            <div className="pos-rel flex flex-col g-10">
                <label className="abs py-10"> Last Name</label>
                <input
                    type="lname"
                    name="lname"
                    className="form-control w-full"
                    // onChange={onChangeHandler}
                    // value={inputValues.phone || ""}
                    placeholder="LINUS"
                />
            </div>
            <div className="pos-rel flex flex-col g-10">
                <label className="abs py-10"> Rider's Email </label>
                <input
                    type="email"
                    name="email"
                    className="last-name form-control w-full"
                    // onChange={onChangeHandler}
                    // value={inputValues.lname || ""}
                    placeholder="Input price"
                />
            </div>
            <div className="pos-rel phone flex flex-col g-10">
                <label className="abs py-10">  Rider's Number</label>
                <input
                    type="number"
                    name="phone"
                    className="form-control w-full"
                    // onChange={onChangeHandler}
                    // value={inputValues.phone || ""}
                    placeholder="Input price"
                    autoComplete="false"
                />
            </div>
        </form>

        <div className='flex flex-col g-20'>
            <div className='flex g-40 justsb w-full '> 
                <button
                    className="login-btn login w-full"
                    disabled={loading}
                    type="submit"
                    // onClick={handleLogin}
                    >
                     {loading ? <ButtonLoader /> : "Assign"}
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
    </div>
  )
}
