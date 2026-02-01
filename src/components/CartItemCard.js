import React, { useState } from 'react'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import currency from '../utils/formatCurrency';


export default function CartItemCard({cartItem, title,handleDeleteItem, handleQuantityChange}) {
    console.log(cartItem)
  
   
  return (
    <div className={`cart-item flex alc w-full g-20 ${cartItem.inStock == "0" && "oos"}`}>
        <div className='cartimg'>
            <img src={cartItem.image} alt="" />
        </div>
        <div className='w-full flex flex-col g-10'>
            <div className='cart-item-name'>
               <p> {cartItem.name}</p>
            </div>
            <div className='cart-item-category'>
                <p>{cartItem.category_name}</p>
            </div>
            <div className='flex justsb alc'>
                <div className='cart-item-sellp'>
                    <p> {currency(cartItem.selling_price)}</p>
                    <div className='flex alc g-5'>
                        <p className='cart-item-costp'> {currency(cartItem.cost_price)}</p>
                        <div>
                            <p className='discount'>30%</p>
                        </div>
                    </div>
                </div>
                {cartItem.inStock ? (
                    title === 'wishlist' ? (
                        <div className="wishlist-cart-btn">
                        <p>Add to Cart</p>
                        </div>
                    ) : (
                        <div className="flex alc quant-btn g-10 justsb">
                        <div className="icon" onClick={() => handleQuantityChange(cartItem.id, -1)}>
                            <RemoveOutlinedIcon className="ic" />
                        </div>
                        <p className="ic">{cartItem.amtItems}</p>
                        <div className="icon" onClick={() => handleQuantityChange(cartItem.id, 1)}>
                            <AddOutlinedIcon className="ic" />
                        </div>
                        </div>
                    )
                    ) : (
                    <div className='oos-btn'>
                      <p>Out of Stock</p>  
                    </div> 
                )}
            </div>
        </div>
        <div className='delete-cartitem' onClick={() => handleDeleteItem(cartItem.id)}>
            <DeleteOutlineOutlinedIcon />
        </div>
    </div>
  )
}
