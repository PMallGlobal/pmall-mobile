import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { calculateSubtotal, getCart, vat, dFee } from '../utils/cartUtils';
import currency from '../utils/formatCurrency';

export default function CartSummary({title, handleClearCart}) {
    const navigate = useNavigate();
    
    const handleCheck = () => {
        navigate('/checkout');
      };
      
      const cart = getCart()

    const subtotal = useMemo(() => {
    return calculateSubtotal(cart); 
  }, [cart]);
  
  const Total = useMemo(() => {
    return subtotal + vat + dFee;  
  }, [cart]);
   
console.log(vat  )

  return (
    <div className='cart-summary-container check'>
        <p className='summ-title'>Cart Summary</p>
        <div className='cart-summary'>
            <div>
                <div className='summ-section'>
                    <p className='summ-left'>Subtotal</p>
                    <p className='summ-right'>{currency(subtotal)}</p>
                </div>
                <div className='summ-section'>
                    <p className='summ-left'>VAT(7.5%)</p>
                    <p className='summ-right'>{currency(subtotal * 0.075)}</p>
                </div>
                <div className='summ-section'>
                    <p className='summ-left'>Discount</p>
                    <p className='summ-right'>{currency(0.00)}</p>
                </div>
                <div className='summ-section'>
                    <p className='summ-left'>Delivery fee(0.8%)</p>
                    <p className='summ-right'>{currency(dFee)}</p>
                </div>
                <div className='summ-section last'>
                    <p  className='summ-left'>Total</p>
                    <p className='summ-right'>{currency(Total)}</p>
                </div>
            </div>
            {title !== "checkout" &&
                <div className='cart-btns'>
                    <p className='checkout-btn cart-btn pointer' onClick={handleCheck}>Checkout</p>
                    <p className='clear-btn cart-btn pointer' onClick={handleClearCart}>Clear Cart</p>
                </div>
            }
        </div>
    </div>
  )
}
