import React, { useEffect, useState } from 'react'
import CategoryHeader from '../components/CategoryHeader'
import OrderItemCard from '../orders/OrderItemCard';

export default function VendorOrders() {
    
      const [orders, setOrders] = useState();

      const getOrders = () => {
          fetch("https://api.pmall.com.ng/api/v1/sales/vendorsales",{
            method: "GET",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          })
            .then((resp) => resp.json())
            .then((result) => {
              console.log(result.data);
              setOrders(result.data)
            })
            .catch((err) => {
              console.log(err);
            });
            console.log("result");
        };
  
        useEffect(()=>{
          getOrders()
        },[])
  
  return (
    <div className='orders'>
        <CategoryHeader title = 'Orders/Transactions' />
        <div className='flex flex-col g-20'>
            <div className='flex alc justsb g-20'>
                <p className=''>Filter by:</p>
                <select
                    name="package_id"
                    className="last-name form-control "
                    // onChange={onChangeHandler}
                    >
                    {
                        // affiliatePackages.map((pack)=>(
                        //   <option value={pack.id}>{pack.name} - {pack.price} </option>
                        // ))
                    }
                </select>
            </div>
            <div className='flex flex-col g-20' >
                {orders?.map((item)=>(
                   <OrderItemCard orderItem={item}  />
                ))}
            </div>
        </div>
    </div>
  )
}
