import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import Toaster from '../utils/toaster';
import { useDebounce } from 'use-debounce';
import { useUser } from './UserContext';

const VendorSignupContext = createContext();

export const VendorSignupProvider = ({ children }) => {
    //const navigate = useNavigate();
    const [inputValues, setState]  = useState({});
    const [loading, setLoading] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const [toastType, setToastType] = useState("");
    const [submittedValues, setSubmittedValues]  = useState({});
    const [newVendorModal, setNewVendorModal] = useState(false);
    const handleModalClose = () => setNewVendorModal(false);
    const [profileDetails, setProfileDetails]  = useState(); 
    const token = localStorage.getItem("authToken");
    const [visible,setVisible] = useState(false)
    const [vendorProductAmt,setVendorProductAmt] = useState(0)
    const [wallet, setWallet] = useState()
    const [orderAmt, setOrderAmt] = useState(0)
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearch] = useDebounce(searchInput, 400);
    const [notifications, setNotifications]  = useState(); 
    const [unreadNotifs, setUnreadNotifs]  = useState(0); 
    const {user} = useUser()

    const onSubmitHandler = async(e) => {
        if (e) {
          e.preventDefault(); 
          fetch("https://api.pmall.com.ng/api/v1/register/vendor",{
            method:"POST",
            headers:{ 
            'Content-Type': 'application/json;charset=UTF-8', 
            "Accept": "application/json" 
          },
            body:JSON.stringify(inputValues)
          }).then((res)=>{
            alert("successful")
            console.log(res)
            if(res.ok){
            window.location.href ="/app/vendors"
            }
          }).catch((err)=>{
            console.log(err)
          })
        }
      };

      const onAffilateSubmitHandler = async(e) => {
        if (e) {
          e.preventDefault(); 
          fetch("https://api.pmall.com.ng/api/v1/register/affiliate",{
            method:"POST",
            headers:{ 
            'Content-Type': 'application/json;charset=UTF-8', 
            "Accept": "application/json" 
          },
            body:JSON.stringify(inputValues)
          }).then((res)=>{
            alert("successful")
            console.log(res)
            if(res.ok){
            window.location.href ="/app/affilates"
            }
          }).catch((err)=>{
            console.log(err)
          })
        }
        console.log(inputValues)
      };

     
      const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(false);
        const loginData = { ...inputValues, device_name: 1234 };
      
        try {
          const response = await fetch("https://api.pmall.com.ng/api/v1/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              "Accept": "application/json",
            },
            body: JSON.stringify(loginData),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error:", errorData);
            Toaster(errorData.message || "Login failed", "error");
            return;
          }
      
          const data = await response.json();
          const token = data.data.token;
          localStorage.setItem("userToken", token);
      
          console.log("Login successful:", data);
          Toaster("Successful", "success");
      setLoading(false);
          setTimeout(() => {
            window.location.href = "/app/dashboard";
          }, 500); // Redirect after 0.5s
        } catch (error) {
          console.error("Unexpected error:", error);
          Toaster("Something went wrong. Please try again.", "error");
          setLoading(false);
        }
      };
      

      const onForgotPasswordHandler = async(e) => {
        if (e) {
          e.preventDefault(); 
          fetch("https://api.pmall.com.ng/api/v1/forgot-password",{
            method:"POST",
            headers:{ 
            'Content-Type': 'application/json;charset=UTF-8', 
            "Accept": "application/json" 
          },
            body:JSON.stringify(inputValues)
          }).then((res)=>{
            alert("successful")
            console.log(res)
            if(res.ok){
            window.location.href ="/auth/app/verify"
            }
          }).catch((err)=>{
            console.log(err)
          })
        }
      };
      const handleResetPassword = async(e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true);
        inputValues.email = "mualiyuoox@gmail.com";
      
        // Validate credentials 
      
        fetch("https://api.pmall.com.ng/api/v1/reset-password",{
          method:"POST",
          headers:{ 
          'Content-Type': 'application/json;charset=UTF-8', 
          "Accept": "application/json" 
        },
        body:JSON.stringify(inputValues)
        }).then((res)=>{
          alert("successful")
          console.log(res)
          setLoading(false);
        }).catch((err)=>{
          console.log(err)
        })
        console.log( inputValues)
      };

      const handleVerifyToken = async(e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true);
        inputValues.email = "mualiyuoox@gmail.com";
        // Validate credentials 
      
        fetch("https://api.pmall.com.ng/api/v1/verify-code",{
          method:"POST",
          headers:{ 
          'Content-Type': 'application/json;charset=UTF-8', 
          "Accept": "application/json" 
        },
        body:JSON.stringify(inputValues)
        }).then((res)=>{
          alert("successful")
          console.log(res)
          if(res.ok){
            setLoading(false);
            window.location.href =`/auth/app/reset/`
          }
        }).catch((err)=>{
          console.log(err)
        })
        console.log( inputValues)
      };

      const onChangeHandler = e => {
          if(!e?.persist){
              setState(inputValues, ({...inputValues, [e?.target.name]: e?.target.value })); 
          }else {
              e?.persist();
              const target = e?.target;
        if (target?.name) {
          setState((inputValues) => ({
            ...inputValues,
            [target.name]: target.value,
          }));
        }
          }
      }

     
      const VendorUpdateProfile = async(e) => {
        if (e) {
          e.preventDefault(); 
          setLoading(true);
          const token = localStorage.getItem("authToken");
        try {
          const response = await fetch('https://api.pmall.com.ng/api/v1/profile/update', {
            method: 'POST',
            headers:{ 
              'Content-Type': 'application/json;charset=UTF-8', 
              "Accept": "application/json" ,
              'Authorization': `Bearer ${token}`
            },
              body:JSON.stringify(inputValues)
          });
          if (response.status) {
            setToastMsg("Successful!");
            setToastType("success")
            setInterval(() => {
              setToastMsg("");
            }, 5000);
            const data = await response.json();
            console.log('vendor:', data);
            setSubmittedValues(data)
            handleModalClose()
            setLoading(false);
          }
          else{
            const error = await response.text();
            console.error('Error editing vendor:', error);
            setToastMsg("Incorrect token, please confirm in your email")
            setToastType("error")
            setInterval(() => {
              setToastMsg("");
            }, 3000);
          }
        } catch (error) {
          console.error('Network error:', error);
        }
      }
      };

      const getProfileDetails = () => {
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
            setWallet(result?.data.user.wallet)
          })
          .catch((err) => {
            console.log(err);
          });
      };

      
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
            setOrderAmt(result.data.length)
          })
          .catch((err) => {
            console.log(err);
          });
          console.log("result");
      };

      
     const getNotifications = async () => {
      const url = `https://api.pmall.com.ng/api/v1/user/notification`;
    
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      });
    
      if (!response.ok) {
        throw new Error(`Failed to fetch notification: ${response.status} ${response.statusText}`);
      }
    
      const result = await response.json();
      const notifs = result.notifications;
      setNotifications(result.notifications)
      setUnreadNotifs(result.unread_count)
      console.log(result.notifications)
    
      if (!notifs) {
        throw new Error("No notification data returned");
      }
     
    };



      useEffect(()=>{
        getProfileDetails()
        getOrders()
        if(user.loggedIn){
          getNotifications()
        }
      },[])
  return (
    <VendorSignupContext.Provider value={{ inputValues, setState, onChangeHandler, onSubmitHandler,handleLogin,onAffilateSubmitHandler,onForgotPasswordHandler,handleResetPassword, handleVerifyToken,VendorUpdateProfile,newVendorModal,setNewVendorModal, handleModalClose,profileDetails,setProfileDetails,submittedValues,loading, setLoading,visible,setVisible,vendorProductAmt,setVendorProductAmt, wallet, setWallet, orderAmt, setOrderAmt,searchInput, setSearchInput,debouncedSearch,notifications,unreadNotifs,getNotifications}}>
      {children}
    </VendorSignupContext.Provider>
  );
      };

export const useVendor = () => {
  const context = useContext(VendorSignupContext);

  if (!context) {
    throw new Error('useVendor must be used within a VendorSignupProvider ');
  }

  return context;
};

export const useVendorr = () => {
  const context = useContext(VendorSignupContext);

  if (!context) {
    throw new Error('useVendorr must be used within a VendorSignupProvider ');
  }

  return context;
};