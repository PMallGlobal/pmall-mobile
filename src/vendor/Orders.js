import React, { useEffect, useState } from 'react'
import CategoryHeader from '../components/CategoryHeader'
import OrderItemCard from '../orders/OrderItemCard';

export default function VendorOrders() {
    const orderss = [
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
