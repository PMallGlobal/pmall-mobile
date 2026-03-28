import React, { createContext, useContext, useEffect, useState } from "react";
import Toaster from "../utils/toaster";
import Toast from "../utils/Toast";
import { useUser } from "./UserContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [inputValues, setState] = useState({});
  const [submittedValues, setSubmittedValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("");
  const [toast, setToast] = useState(null);
  const [packages, setPackages] = useState({});
  const [customer, setCustomer] = useState(null); // Store user data

  const { setUser } = useUser();

  // Vendor Registration
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    inputValues.device_name = 1234;
    console.log(JSON.stringify(inputValues));
    fetch("https://api.pmall.com.ng/api/v1/register/vendor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((resp) => resp.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status) {
          setToastMsg("Awesome! Registration was successful");
          setToastType("success");
          setTimeout(() => {
            setToastMsg("");
            window.location.href = result.data.payment.original.authorization_url;
            // window.location.href = result?.data?.payment.authorization_url;
          }, 2000);

          setLoading(false);
        } else {
          setToastMsg(result.message);
          setToastType("error");
          setLoading(false);
          setTimeout(() => {
            setToastMsg("");
          }, 5000);
        }
      })
      .catch((err) => {
        console.log(err);
        setToastMsg(err.message);
        setToastType("error");
        setTimeout(() => {
          setToastMsg("");
        }, 3000);
        setLoading(false);
      });
  };

  // Start Affiliate Registration
  const onAffilateSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    inputValues.device_name = 1234;

    fetch("https://api.pmall.com.ng/api/v1/register/affiliate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
        setLoading(false);
        console.log(result);
        if (result.status) {
          setToastMsg("Awesome! Registration was successful");
          setToastType("success");
          setTimeout(() => {
            setToastMsg("");
            // window.location.href = result?.data?.payment.authorization_url;
            window.location.href = result.data.payment.original.authorization_url;
          }, 2000);

          setLoading(false);
        } else {
          console.log(result.message);
          setToastMsg(result.message);
          setToastType("error");
          setLoading(false);
          setTimeout(() => {
            setToastMsg("");
          }, 5000);
        }
      })
      .catch((err) => {
        console.log(err);
        setToastMsg(err.message);
        setToastType("error");
        setTimeout(() => {
          setToastMsg("");
        }, 3000);
        setLoading(false);
      });
  };

  const onCustomerSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    inputValues.device_name = 1234;
    console.log(JSON.stringify(inputValues));
    fetch("https://api.pmall.com.ng/api/v1/customer/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((resp) => resp.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status) {
          setToastMsg("Awesome! Registration was successful");
          setToastType("success");
          setTimeout(() => {
            setToastMsg("");
            // window.location.href = "/checkout";
          }, 2000);
          window.location.reload();
          setLoading(false);
        } else {
          setToastMsg(result.message);
          setToastType("error");
          setLoading(false);
          setTimeout(() => {
            setToastMsg("");
          }, 5000);
        }
      })
      .catch((err) => {
        console.log(err);
        setToastMsg(err.message);
        setToastType("error");
        setTimeout(() => {
          setToastMsg("");
        }, 3000);
        setLoading(false);
      });
  };

  // User Login function

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(loading);
    setLoading(true);
    inputValues.device_name = 1234;

    fetch("https://api.pmall.com.ng/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((resp) => resp.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status) {
          localStorage.setItem("authToken", result.data.token);
          setUser({
            id: result.data.user.id,
            username: result.data.user.username,
            email: result.data.user.email,
            token: result.data.token,
            accountType: result.data.user.user_type,
            storeName: result.data.user.store_name,
            storeId: result.data.user.store_id,
            loggedIn: true,
            fname: result.data.user.fname,
            lname: result.data.user.lname,
            userAvatar: result.data.user.photo,
            regDate: result.data.user.created_at,
            refId: result.data.user.my_ref_id,
          });
          setToast({ message: "Boom! Login successful. It's great to have you back!", type: "success" });
            setTimeout(() => setToast(null), 5000);
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);

          setLoading(false);
        } else {
          console.log(result.message);
          if(result.message == "kindly complete your payment"){
            window.location.href = result?.payment.authorization_url;
          }
          setToastMsg(
            `Oops! ${result.message}`);
          setToastType("error");
          setTimeout(() => {
            setToastMsg("");
          }, 4000);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
      console.log(loading);
  };
  const handleLogin2 = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(loading);
    setLoading(true);
    inputValues.device_name = 1234;

    fetch("https://api.pmall.com.ng/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((resp) => resp.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status) {
          localStorage.setItem("authToken", result.data.token);
          setUser({
            id: result.data.user.id,
            username: result.data.user.username,
            email: result.data.user.email,
            token: result.data.token,
            accountType: result.data.user.user_type,
            storeName: result.data.user.store_name,
            storeId: result.data.user.store_id,
            loggedIn: true,
            fname: result.data.user.fname,
            lname: result.data.user.lname,
            userAvatar: result.data.user.photo,
            regDate: result.data.user.created_at,
            refId: result.data.user.my_ref_id,
          });
          setToast({ message: "Boom! Login successful. It's great to have you back!", type: "success" });
            setTimeout(() => setToast(null), 5000);

          setLoading(false);
        } else {
          console.log(result.message);
          setToastMsg(
            `Oops! ${result.message}`);
          setToastType("error");
          setTimeout(() => {
            setToastMsg("");
          }, 4000);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
      console.log(loading);
  };

  const customerLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);

    fetch("https://api.pmall.com.ng/api/v1/customer/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((resp) => resp.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status) {
          localStorage.setItem("authToken", result?.token);
          // dispatch(
          setUser({
            id: result.customer.id,
            username: result.customer.username,
            email: result.customer.email,
            token: result.token,
            accountType: result.customer.user_type,
            loggedIn: true,
            fname: result.customer.fname,
            lname: result.customer.lname,
            regDate: result.customer.created_at,
            refId: result.customer.my_ref_id,
          });
          // );
          setToastMsg("Boom! Login successful");
          setToastType("success");
          setLoading(false);
          window.location.reload();
        } else {
          console.log(result.message);
          setToastMsg(
            "Oops! there seems to be an error. Confirm login credientials"
          );
          setToastType("error");
          setTimeout(() => {
            setToastMsg("");
          }, 4000);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const stockistLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);

    fetch("https://api.pmall.com.ng/api/v1/stockists/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((resp) => resp.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status) {
          localStorage.setItem("authToken", result?.token);
          
          // dispatch(
          setUser({
            id: result.stockist.id,
            username: result.stockist.username,
            email: result.stockist.email,
            token: result.token,
            accountType: result.user_type,
            loggedIn: true,
            name: result.stockist.name,
            regDate: result.stockist.created_at,
            address: result.stockist.address,
            country: result.stockist.country,
            city: result.stockist.city,
            state: result.stockist.state,
            affiliate_id: result.stockist.affiliate_id,
            phone: result.stockist.phone
          });
          // );
          setToastMsg("Boom! Login successful");
          setToastType("success");
          setLoading(false);
          setTimeout(() => {
            window.location.href = "/orders";
          }, 2000);

        } else {
          console.log(result.message);
          setToastMsg(
            "Oops! there seems to be an error. Confirm login credientials"
          );
          setToastType("error");
          setTimeout(() => {
            setToastMsg("");
          }, 4000);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // Start Forgot Password
  const onForgotPasswordHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    inputValues.device_name = 1234;
    fetch("https://api.pmall.com.ng/api/v1/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((resp) => resp.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status) {
          setToastMsg("Request Sent Successful!");
          setToastType("success");
          setTimeout(() => {
            setToastMsg("");
          }, 5000);
          setTimeout(() => {
            window.location.href = `/auth/app/verify/ ${inputValues.email}`;
          }, 2000);
          setLoading(false);
        } else {
          setToastMsg(result.message);
          setToastType("error");
          setTimeout(() => {
            setToastMsg("");
          }, 3000);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setToastMsg(err.message);
        setToastType("error");
        setTimeout(() => {
          setToastMsg("");
        }, 3000);
        setLoading(false);
      });
  };

  // Reset New Password Function
  const handleResetPassword = async (e) => {
    e.preventDefault(); 
  
    if (inputValues.password !== inputValues.confirm_password) {
      setToastMsg("Passwords do not match. Please check and try again.");
      setToastType("error");
      setTimeout(() => setToastMsg(""), 5000);
      return; 
    }
  
    if (!inputValues.password || inputValues.password.length < 6) {
      setToastMsg("Password must be at least 6 characters long.");
      setToastType("error");
      setTimeout(() => setToastMsg(""), 5000);
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch("https://api.pmall.com.ng/api/v1/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify(inputValues),
      });
  
      const result = await response.json();
  
      setLoading(false);
  
      if (result.status) {
        setToastMsg("Looks good! New Password has been set...");
        setToastType("success");
        setTimeout(() => {
          setToastMsg("");
          window.location.href = "/"; 
        }, 5000);
      } else {
        setToastMsg(result.message || "Failed to reset password. Please try again.");
        setToastType("error");
        setTimeout(() => setToastMsg(""), 5000);
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setLoading(false);
      setToastMsg("Network error. Please check your connection.");
      setToastType("error");
      setTimeout(() => setToastMsg(""), 5000);
    }
  };

  // Verify token function

  const handleVerifyToken = async (e, email) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    inputValues.email = email
    fetch("https://api.pmall.com.ng/api/v1/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    })
      .then((resp) => resp.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.status) {
          setToastMsg("That was right...");
          setToastType("success");
          setTimeout(() => {
            setToastMsg("");
            window.location.href = "/auth/app/reset";
          }, 5000);
          setLoading(false);
        } else {
          setToastMsg(result.message);
          setToastType("error");
          setTimeout(() => {
            setToastMsg("");
          }, 3000);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setToastMsg(err.message);
        setToastType("error");
        setTimeout(() => {
          setToastMsg("");
        }, 3000);
        setLoading(false);
      });
  };

  const onChangeHandler = (e) => {
    if (!e?.persist) {
      setState(inputValues, {
        ...inputValues,
        [e?.target.name]: e?.target.value,
      });
    } else {
      e?.persist();
      const target = e?.target;
      if (target?.name) {
        setState((inputValues) => ({
          ...inputValues,
          [target.name]: target.value,
        }));
      }
    }
  };

  const getPackages = async (e) => {
    // setLoading(true);

    fetch("https://api.pmall.com.ng/api/v1/account-packages/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result.status) {
          console.log(result);
          setPackages(result.data);
        } else {
          console.log(result.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPackages();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        inputValues,
        onChangeHandler,
        onSubmitHandler,
        onCustomerSubmitHandler,
        handleLogin,
        customerLogin,
        stockistLogin,
        onAffilateSubmitHandler,
        onForgotPasswordHandler,
        handleResetPassword,
        handleVerifyToken,
        setLoading,
        handleLogin2,
        toastMsg,
        toast,
        setToast,
        setToastMsg,
        setToastType,
        toastType,
        submittedValues,
        loading,
        setState
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useVendor = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useVendor must be used within a VendorSignupProvider ");
  }

  return context;
};