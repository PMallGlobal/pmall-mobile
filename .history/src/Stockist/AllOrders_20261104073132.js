import React, { useEffect, useState } from 'react'
import CategoryHeader from '../components/CategoryHeader';
import { useUser } from '../context/UserContext';
import OrderItemCard from '../orders/OrderItemCard';
import { BASE_URL } from "../utils/config"; 


export default function AllOrders() {
  const { user, setUser } = useUser();
      const [allOrders, setAllOrders] = useState([]);
      const [loading, setLoading] = useState(false)

        const getMyOrder = async () => {
          setLoading(true);
          console.log(user);
          let determinWhoseOrder = 
         user.user.accountType === "Stockist" ? "stockist/allorder" : 
         user.user.accountType === "Vendor" ? "sales/vendorsales" : 
         user.user.accountType === "Admin" ? "sales" : "";
          console.log(determinWhoseOrder);
          try {
            const response = await fetch(`${BASE_URL}/${determinWhoseOrder}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: `Bearer ${user?.token}`,
              },
            });
        
            const result = await response.json();
            console.log(result);
            if(result.status) {
              setAllOrders(result?.data || []);
            }
            
          } catch (error) {
            console.error("Error fetching orders:", error);
          } finally {
            setLoading(false);
          }
        };
  
        useEffect(()=>{
          getMyOrder()
        },[])
  return (
    <div className='orders'>
    <CategoryHeader title = 'All Orders' />
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
            {orderss.map((item)=>(
               <OrderItemCard orderItem={item} />
            ))}
        </div>
    </div>
</div>
  )
}
