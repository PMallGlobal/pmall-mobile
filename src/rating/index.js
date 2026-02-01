import React from 'react'
import Titlenback from '../components/titlenback';
import OrderItemCard from '../orders/OrderItemCard';

export default function Rating() {
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
  return (
    <div className='ratings'>
        <Titlenback title="Ratings and Review" />
        <div className='flex flex-col g-20' >
            {orders.map((item)=>(
                <OrderItemCard orderItem={item} title="Rating" />
            ))}
        </div>
    </div>
  )
}
