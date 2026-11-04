import React, { useEffect, useMemo, useState } from 'react'
import { calculateSubtotal, getCart, vat, dFee } from '../utils/cartUtils';
import CartSummary from '../components/CartSummary';
import CategoryHeader from '../components/CategoryHeader'
import { useUser } from '../context/UserContext';
import New from './new';
import ProfileCard from './profileCard';
import Returning from './returning';
import Toaster from "../utils/toaster";
import Toast from "../utils/Toast";
import { useVendor } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import MapComponent from '../components/MapComponent';


export default function Checkout() {
    const [vendorForm, setVendorForm] = useState(true);
    const [toast, setToast] = useState(null);
    const [btnLoader, setBtnLoader] = useState(false);
    const [customer, setCustomer] = useState()
    const [loading, setLoading] = useState(false)
    const { user, setUser } = useUser();
    const [checkoutMessage, setCheckoutMessage] = useState("");
    const [stockists, setStockists] = useState(null);
    const [allStockist, setAllStockist] = useState(null);
    const [selectedStockist, setSelectedStockist] = useState(null);
    const [method, setMethod] = useState('pickup');

    const handleSelectedStockist = (e) => {
      const selectedValue = e.target.value;
      setSelectedStockist(parseInt(selectedValue));
      console.log("Selected stockist id:", selectedValue);
    };

    const getProfile = () => {
        fetch("https://api.pmall.com.ng/api/v1/profile",{
            method: "GET",
            headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
        })
            .then((resp) => resp.json())
            .then((result) => {
            console.log(result.data.user);
            // setProfile(result.data.user)
            })
            .catch((err) => {
            console.log(err);
            });
        };
        useEffect(()=>{
            getProfile()
          }, [])
    // const user = useUser();
    console.log(user)
    const addCommasToNumberString = (numberString) =>{
        return  numberString?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
      }

      const {
        inputValues,
        onChangeHandler,
        customerLogin,
        toastMsg,
        toastType,
        onCustomerSubmitHandler,
        setState
      } = useVendor();

      const [formDetails, setFormDetails] = useState({
        fname: '',
        lname: '',
        username: '',
        email: '',
        phone: '',
        address: '',
        state: '',
        lga: '',
        password: '',
        password_confirmation: ''
    });

      const registerUser = async () => {
        if (user?.loggedIn) return user; // If logged in, return user data.
    
        console.log("User not logged in, attempting registration...");
        setToast({ message: "Attempting registration...", type: "warning" });
        setTimeout(() => setToast(null), 5000);
        try {
            const response = await fetch(`${BASE_URL}/customer/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Accept: "application/json",
                },
                body: JSON.stringify(formDetails),
            });
    
            const result = await response.json();
    
            if (!result.status) {
                setToast({ message: `Registration Failed... ${result}`, type: "error" });
                setTimeout(() => setToast(null), 5000);
                return false; // Registration failed
            }
    
            setCustomer(result);

            const newUserLoggedIn = {
                username: result?.customer?.username,
                password: formDetails?.password
            }
            // autoLogin User
            try {
                const response = await fetch(`${BASE_URL}/customer/login`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Accept": "application/json",
                  },
                  body:  JSON.stringify(newUserLoggedIn)
                });
                console.log(response);
                if (!response.ok) {
                  const errorData = await response.json();
                  console.error("Error:", errorData);
                  Toaster(errorData.message || "Login failed", "error");
                  return;
                }
               
            
                const data = await response.json();
                const token = data?.data?.token;
                localStorage.setItem("userToken", token);
            setToast({ message: "User registered... attempting checkout...", type: "success" });
            setTimeout(() => setToast(null), 5000);
              } catch (error) {
                console.error("Unexpected error:", error);
                Toaster("Something went wrong. Please try again.", "error");
                setLoading(false);
              }
            console.log(result);
            localStorage.setItem("authToken", result?.token);
            setUser({
                id: result?.customer.id,
                username: result?.customer.username,
                email: result.customer.email,
                token: result?.token,
                loggedIn: true,
                fname: result?.customer.fname,
                lname: result?.customer.lname,
                regDate: result?.customer.created_at,
              });
            
            // setCheckoutMessage(handleErrors(result));
            return result; // Return newly registered customer data
    
        } catch (error) {
            setToast({ message: `Error during registration: ${error}`, type: "error" });
        setTimeout(() => setToast(null), 5000);
            setCheckoutMessage(handleErrors(error));
            return false;
        }
    };

    const handleErrors = (errorResponse) => {
      if (!errorResponse?.message) return "An unknown error occurred.";
  
      const errorMessages = Object.entries(errorResponse.message).map(
          ([field, messages]) => `${field}: ${messages.join(", ")}`
      );
  
      return errorMessages.join("\n"); // Joining all error messages for display
  };

  const getStockistLocation = () => {
    setLoading(true);
    fetch(`${BASE_URL}/stockists`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + user?.token,
        },


    })
        .then((resp) => resp.json())
        .then((result) => {
            console.log(result)
            setStockists(result?.data || []);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
        });
};

const getStockist = () => {
  setLoading(true);
          fetch(`${BASE_URL}/stockists/fetchstockist`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                  Accept: "application/json",
              },
          })
              .then((resp) => resp.json())
              .then((result) => {
          console.log(result);
                  setAllStockist(result?.data || []);
                  setLoading(false);
              })
              .catch((err) => {
                  setLoading(false);
              });
  };
    

    const initiateCheckout = async (customerData) => {
      const tokenToUse = user?.loggedIn ? user?.token : customerData?.token;
      const customerId = user?.loggedIn ? user?.id : customerData?.customer.id;
      
      if (!tokenToUse || !customerId) {
          setToast({ message: "Token or Customer ID missing! Cannot proceed. Kindly login again as we couldn't verify the user", type: "error" });
          setTimeout(() => setToast(null), 5000);
          return false;
      }
  
      const checkingOutProducts = JSON.parse(localStorage.getItem('pmallCart')) || [];
      if (checkingOutProducts.length === 0) {
          setToast({ message: "Cart is empty! Cannot proceed.", type: "error" });
          setTimeout(() => setToast(null), 5000);
          console.error("Cart is empty! Cannot proceed.");
          return false;
      }
  
      const requestBody = {
          customer_id: customerId,
          stockist_id : selectedStockist,
          products: checkingOutProducts.map(product => ({
              product_id: product.id,
              quantity: product.amtItems,
          }))
      };
  
      console.log("Checkout Request Body:", requestBody);
  
      try {
          const response = await fetch(`${BASE_URL}/customer/checkout/initiate`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                  Accept: "application/json",
                  Authorization: "Bearer " + tokenToUse,
              },
              body: JSON.stringify(requestBody),
          });
  
          const result = await response.json();
          console.log("Checkout Result:", result);
  
          if (!result.status) {
              if(result.message?.stockist_id == "The stockist id field is required."){
                setToast({ message: `Choose a pickup location`, type: "error" });
              }else{
                setToast({ message: `Checkout initiation failed`, type: "error" });
              }
          setTimeout(() => setToast(null), 5000);
              console.error("Checkout initiation failed:", result);
              return false;
          }
          setToast({ message: "Product(s) mapped to user... Initiating payment...", type: "warning" });
          setTimeout(() => setToast(null), 5000);
          return result.sale; // Return sale data for payment
  
      } catch (error) {
          setToast({ message: "Error during checkout initiation:", type: "error" });
          setTimeout(() => setToast(null), 5000);
          console.error("Error during checkout initiation:", error);
          return false;
      }
  };

  const initiatePayment = async (saleData, customerData) => {
    const tokenToUse = user?.loggedIn ? user?.token : customerData?.token;
    if (!tokenToUse) {
        setToast({ message: "Token is missing! Cannot proceed.", type: "error" });
        setTimeout(() => setToast(null), 5000);
        console.error("Token is missing! Cannot proceed.");
        return false;
    }

    const paymentData = {
        sale_id: saleData.id,
        amount: saleData.total_amount,
    };

    console.log("Payment Request Body:", paymentData);

    try {
        const response = await fetch(`${BASE_URL}/customer/checkout/paystack/initiate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: "Bearer " + tokenToUse,
            },
            body: JSON.stringify(paymentData),
        });

        const result = await response.json();
        console.log("Payment Result:", result);

        if (!result.status) {
            setToast({message: `Payment initiation failed: ${result.message}`, type: "error" });
        setTimeout(() => setToast(null), 5000);
            console.error("Payment initiation failed:", result);
            return false;
        }

        console.log("Redirecting to payment page...");
        window.location.href = result.authorization_url;
        localStorage.removeItem("pmallCart");
        return true; // Payment initiated successfully

    } catch (error) {
        setToast({message: `Error during payment initiation: ${error}`, type: "error" });
        setTimeout(() => setToast(null), 5000);
        console.error("Error during payment initiation:", error);
        return false;
    }
};

const onSubmit = async () => {
    try {
        setBtnLoader(true);
        const customerData = await registerUser();
        if (!customerData) {
            setToast({message: `Registration step failed!`, type: "error" });
        setTimeout(() => setToast(null), 5000);
            console.error("Registration step failed!");
            setBtnLoader(false);
            return;
        }

        const saleData = await initiateCheckout(customerData);
        if (!saleData) {
            // setToast({message: `Oops! Not your fault, try logging back in again`, type: "error" });
        setTimeout(() => setToast(null), 9000);
            console.error("Checkout step failed!");
            setBtnLoader(false);
            return;
        }

        const paymentSuccess = await initiatePayment(saleData, customerData);
        if (!paymentSuccess) {
            setToast({message: `Payment step failed!`, type: "error" });
            setTimeout(() => setToast(null), 5000);
            console.error("Payment step failed!");
            setBtnLoader(false);
        }
        
    } catch (error) {
        setToast({message: `Error during submission: ${error}`, type: "error" });
            setTimeout(() => setToast(null), 5000);
        console.error("Error during submission:", error);
    } finally {
        setBtnLoader(false);
    }
};
const cart = getCart()

    const subtotal = useMemo(() => {
    return calculateSubtotal(cart); 
  }, [cart]);
  
  const Total = useMemo(() => {
    return subtotal + vat + dFee;  
  }, [cart]);

  useEffect(()=>{ 
            getCart();
            getStockist();
            getStockistLocation();
  },[])

  return (
    <div className='checkout'>
       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <div className=''>
            <CategoryHeader title="Checkout" />
        </div>
    
        <div className="vendor-affilate-container flex w-full">
            <div className="vendor-affilate flex justsb alc  w-full">
                <div className={`w-full flex all-center ${vendorForm && "active"} `}>
                    <p
                        className="pointer"
                        onClick={() => {
                        setVendorForm(true);
                        }}>
                        Returning Customer
                    </p>
              </div>
              <div  className={`w-full flex all-center ${!vendorForm && "active"} `}>
                <p
                    className="pointer"
                    onClick={() => {
                    setVendorForm(false);
                    }}>
                    New Customer
                </p>
              </div>
            </div>
            <span className={`line  ${!vendorForm && "affilate"}`}></span>
        </div>
        <div>
            {vendorForm ? (
                !user.loggedIn ? (
                <Returning
                    inputValues={inputValues}
                    onChangeHandler={onChangeHandler}
                    onSubmitHandler={customerLogin}
                    setVendorForm={setVendorForm}
                />
                ) : (
                <ProfileCard user={user} />
                )
            ) : (
                <New
                inputValues={inputValues}
                onChangeHandler={onChangeHandler}
                onCustomerSubmitHandler={onCustomerSubmitHandler}
                setInputValues={setState}
                />
            )}
            </div>
            <div className="flex items-center g-10 my-6">
                <label className="flex items-center g-5 cursor-pointer">
                    <input
                    type="radio"
                    name="delivery_method"
                    value="pickup"
                    checked={method === 'pickup'}
                    onChange={() => setMethod('pickup')}
                    className="w-5 h-5 accent-blue-600"
                    />
                    <span className={`font-medium ${method === 'pickup' ? 'text-blue-700' : 'text-gray-700'}`}>
                    Pickup
                    </span>
                </label>

                <label className="flex items-center g-5 cursor-pointer">
                    <input
                    type="radio"
                    name="delivery_method"
                    value="delivery"
                    checked={method === 'delivery'}
                    onChange={() => setMethod('delivery')}
                    className="w-5 h-5 accent-blue-600"
                    />
                    <span className={`font-medium ${method === 'delivery' ? 'text-blue-700' : 'text-gray-700'}`}>
                    Delivery
                    </span>
                </label>
            </div>
            {method === 'pickup' && <p className='red'>Disclaimer: Delivery fee not included</p>}
            {method === 'pickup' ?
                <div className="form-group w-full">
                    <label>Select Pickup Location</label>
                    <select
                    name="pickup_location"
                    className="last-name form-control"
                    onChange={handleSelectedStockist}
                    style={{marginTop: 4, textTransform: 'capitalize'}}>
                        <option>Pickup Location</option>
                    {
                        allStockist?.map((stockist)=>(
                            <option value={stockist.id}>
                                {stockist.state} - ({stockist.city}) 
                            </option>
                        ))
                        }
                    </select>
                    
                </div> : 
                <div>
                     <MapComponent />
                </div>
            }
          
        <div>
            <CartSummary title="checkout" />
        </div>
        <div className='details-footer'>
            <div className='flex-col g-10'>
              <p className='price'>&#x20A6; {addCommasToNumberString(Total)}</p>
              <div className='flex alc g-20'>
                <p>Total Amount</p> 
              </div>
            </div>
            <div className="add-cart-btn flex alc g-20 pointer" onClick={onSubmit}> 
              <p>Proceed to Pay</p>
            </div>
        </div>
    </div>
  )
}
