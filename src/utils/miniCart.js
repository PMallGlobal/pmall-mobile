import React, { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";

const MiniCart = ({ cartInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
   
    <div className="cart____information">
      
      {cartInfo?.length > 0 && (
      <div>
        <div className="product_information_in_cart">
        {cartInfo?.length === 0 && (<h1 className="text-center"> Cart is empty! </h1>)}
        {cartInfo?.length > 0 && (<h1>{ cartInfo?.length } Item(s) now in Cart</h1>)}
        <Link to="/checkout" className="text-light">Checkout</Link>
        {cartInfo?.length > 0 && (
        <p className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "Hide Cart" : "View Cart"}
              </p>
        )}
          </div>

        <div className="cart flex flex-col pad-20">
          <div className="g-20 flex flex-col">
            <div className="w-full minicart">
              {/* Collapsible Cart Content */}
              <div className={`minicart-items ${isOpen ? "open" : "collapsed"}`}>
                {cartInfo.map((pro) => (
                  <div className="minicart-item cart____item" key={pro.id}>
                    <div className="flex items-center g-10" style={{justifyContent: 'space-between'}}>
                      <img src={pro.image} alt="" style={{ width: "80px" }} />
                      <div>
                        <p className="f-12 bold title-case">{pro.name}</p>
                        <p className="f-12">NGN&nbsp;{pro.selling_price}</p>
                     </div>
                      <p className="f-16 pointer lite" 
                      // onClick={() => deleteCartItem(pro.id)}
                      >
                                    <DeleteOutlineIcon className="trash___can"/>
                                    </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default MiniCart;