import React from 'react'
import CartItemCard from '../components/CartItemCard'
import CategoryHeader from '../components/CategoryHeader'

export default function Wishlist() {
    // dummyCartItems.js
    const dummyCartItems = [
    {
      id: 1,
      name: "CARICH Cool Algal Fluoride-Free Toothpaste",
      image: "https://api.pmall.com.ng/storage/productImages/40_1759017056.png",
      category_name: "PERSONAL CARE",
      selling_price: 3360,
      cost_price: 5000,
      inStock: true,
      quantity: 2
    },
    {
      id: 67,
      name: "Wireless Bluetooth Headphones Pro",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      category_name: "ELECTRONICS",
      selling_price: 24500,
      cost_price: 32000,
      inStock: true,
      quantity: 1
    },
    {
      id: 89,
      name: "Organic Cotton T-Shirt – Black",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      category_name: "FASHION",
      selling_price: 8500,
      cost_price: 12000,
      inStock: false,
      quantity: 1
    },
    {
      id: 124,
      name: "Smart LED Bulb – 10W RGB",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      category_name: "HOME & LIVING",
      selling_price: 4800,
      cost_price: 6500,
      inStock: true,
      quantity: 3
    },
    {
      id: 203,
      name: "Premium Stainless Steel Water Bottle 1L",
      image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800",
      category_name: "KITCHEN & DINING",
      selling_price: 9200,
      cost_price: 11500,
      inStock: true,
      quantity: 1
    }
  ];
  return (
    <div className='cart'>
        <div className='cart-main'>
            <CategoryHeader title="My Wishlist" />
            <div className="">
                <div className='flex flex-col g-20'> 
                    {dummyCartItems.map((item)=>(
                        <CartItemCard cartItem={item} title='wishlist' />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}
