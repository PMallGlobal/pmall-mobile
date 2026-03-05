import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user data from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser)
      : {
          id: "",
          username: "",
          email: "",
          token: "",
          accountType: "",
          storeName: "",
          storeId: "",
          fname: "",
          lname: "",
          package: "",
          userAvatar: "",
          refId: "",
          regDate: "",
          loggedIn: false,
        };
  });


  useEffect(() => {
    // Save user data to localStorage whenever it changes
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Custom hook for handling logout
const useLogOut = () => {
  const navigate = useNavigate(); 
  const { setUser } = useUser(); 

  return useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("pmallCart");
    sessionStorage.clear();

    setUser({
      token: "",
      loggedIn: false,
    });

    setTimeout(() => {
      navigate("/auth/sign-in");
    }, 500);
  }, [navigate, setUser]);
};

const useLogOut2 = () => { 
  const { setUser } = useUser(); 

  return useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    // localStorage.removeItem("pmallCart");
    sessionStorage.clear();

    setUser({
      token: "",
      loggedIn: false,
    });

  }, [setUser]);
};



export { UserProvider, useUser, useLogOut,useLogOut2 };
