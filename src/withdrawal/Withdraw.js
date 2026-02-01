import React from 'react'
import CategoryHeader from '../components/CategoryHeader'
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import moment from "moment";
import Box from "@mui/material/Box";
import Toaster from "../utils/toaster";
import ButtonLoader from "../utils/buttonLoader";
import Typography from "@mui/material/Typography";
import { useVendor, useVendorr } from "../context/VendorSignupContext";
import Modal from "@mui/material/Modal";
import Loading from "../utils/loading";
import currency from "../utils/formatCurrency";
import Toast from "../utils/Toast";
import PackageName from "../utils/accountPackages"
import { BASE_URL } from "../utils/config"; 
import { useNavigate } from "react-router-dom";

export default function Withdraw() {

    const [withdrawals, setWithdrawals] = useState([]);
    const [newWithdrawalModal, setNewWithdrawalModal] = useState(false);
    const [toast, setToast] = useState(null);
    const [loading, setLoading] =useState(false);
    const [loadingId, setLoadingId] = useState(null);
    const navigate = useNavigate();
    const [toastType, setToastType] = useState("");
    const [toastMsg, setToastMsg] = useState("");
    const { user } = useUser();
    const [balanceInsufficient, setBalanceInsufficient] = useState(false);
    const {inputValues, setState, onChangeHandler,  visible, setVisible,} = useVendor();
    const handleModalClose = () => setNewWithdrawalModal(false);
    const { vendorProductAmt, wallet, orderAmt} = useVendorr();

    console.log(wallet)

    const handleChange = (event, newValue) => {
        const selectedTitles = newValue.join(', ');
        console.log(selectedTitles);
      
        setState((inputValues) => ({
          ...inputValues,
          tags: selectedTitles,
        }));
      };
      
      const fetchAllWithdrawalRequests = () => {
        setLoading(true);
      let adminUrl = `${BASE_URL}/admin-withdrawal/list`;
      let otherAccountUrl = `${BASE_URL}/withdrawal/history`;
      let url = user.accountType === 'Admin' ? adminUrl : otherAccountUrl;
    
    
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: "Bearer " + user?.token,
            },
        })
            .then((resp) => resp.json())
            .then((result) => {
              console.log(result);
              setWithdrawals(result.withdrawals);
              setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setToast({ message: "Error Fetching Withdrawal log", type: "error" });
                setTimeout(() => setToast(null), 5000);
                setLoading(false);
            });
    };
    
    const handleWithdrawalAction = (action, transactionId) => {
      setLoadingId(transactionId);
      var endpoints = {
        approve: `${BASE_URL}/admin-withdrawal/approve/${transactionId}`,
        reject: `${BASE_URL}/admin-withdrawal/reject/${transactionId}`,
        complete: `${BASE_URL}/admin-withdrawal/complete/${transactionId}`
      };
      
      var url = endpoints[action];
    
      fetch(url, {
        method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: "Bearer " + user?.token,
            },
      })
      .then(function(response) {
        if (!response.ok) {
          setToast({ message: 'Network response was not ok: ' + response.statusText, type: "error" });
          setLoadingId(null); 
        }
        return response.json();
      })
      .then(function(result) {
        setToast({ message: 'Withdrawal ' + action + 'd successfully!', type: action == 'reject' ? 'error' : 'success' });
        setLoadingId(null); 
        fetchAllWithdrawalRequests();
      })
      .catch(function(error) {
        setToast({ message: 'Error performing withdrawal action:', type: "error" }); 
        setLoadingId(null); 
      });
    }
    
    
    const validateWallet = (value) => {
      const amount = parseFloat(value);
      const walletBalance = parseFloat(user.wallet);
    
      if (!isNaN(amount) && amount > walletBalance) {
        setBalanceInsufficient(true);
      } else {
        setBalanceInsufficient(false);
      }
    };
    
    
    const makeWithdrawal = async(e) => {
      if (e) {
        e.preventDefault(); 
        setLoading(true)
        console.log(inputValues)
      try {
        const response = await fetch(
          `${BASE_URL}/withdrawal/request?wallet_id=${wallet?.id}&amount=${inputValues.amount}&method=${inputValues.method}&remarks=${inputValues.remarks}`, {
          method: 'POST',
          headers:{ 
            'Content-Type': 'application/json;charset=UTF-8', 
            "Accept": "application/json" ,
            'Authorization': `Bearer ${user?.token}`
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log('request:', data); 
          setToast({ message: "Great! Request submitted successfully", type: "success" });
          fetchAllWithdrawalRequests();
          setInterval(() => {
            setToastMsg("");
    }, 5000);
          setLoading(false)
          // setNewWithdrawalModal(data)
          handleModalClose()
        } else {
          const error = await response.text();
          console.error('Error posting request:', error);
          setLoading(false)
          setToastMsg("Oops! there seems to be an error. Fill in correct credentials")
          setToastType("error")
          setInterval(() => {
            setToastMsg("");
    }, 3000);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
    };
    
    useEffect(()=> {
      console.log(user);
      fetchAllWithdrawalRequests();
    },[])
  return (
    <div className='withdraw'>
            <Toast message={toastMsg} type={toastType} onClose={() => setToast(null)} />
        <CategoryHeader title="Withdraw Funds" />
        <form action="">
            <div className='flex flex-col g-20'>
                <div className='flex flex-col g-10'>
                    <p>Available Balance</p>
                    <div className='available'>
                        <p>NGN 65,000.00</p>
                    </div>
                </div>
               
                <div className="flex flex-col g-10 ">
                  <p> Withdrawal Method</p>
                  <select
                  className="form-control-input "
                  name="method"
                    onChange={onChangeHandler}
                    value={inputValues?.method || ""}
                    >
                    <option value="default"> Select Withdrawal Method</option>
                    
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Wallet">Wallet</option>
                  </select>
                </div>
                <div className='flex flex-col g-10'>
                    <p>Amount to Withdraw</p>
                   <input
                    type="number"
                    className='w-full bg-white p-20'
                    name="amount"
                    placeholder="500"
                    onChange={(e) => {
                      const value = e.target.value;
                      onChangeHandler(e);
                      validateWallet(value);
                    }}
                    value={inputValues?.amount || ""}
                  />
                  {balanceInsufficient && <p className="insufficient">Insufficient Balance</p> }
                </div>
                <div className='flex flex-col g-10'>
                    <p>Remark</p>
                   <textarea
                    placeholder=""
                    className='w-full bg-white p-20'
                    name="remarks"
                    onChange={onChangeHandler}
                    value={inputValues?.remarks || ""}
                    ></textarea>
                </div>
            </div>
        </form>
        <div className='flex g-40 justsb w-full '> 
            <button
                className="login-btn login w-full"
                disabled={balanceInsufficient}
                 onClick={ makeWithdrawal}
                // disabled={loading}
                >
                {loading ?<ButtonLoader /> : "Initiate Withdrawal"}
            </button>
            <button
                className="login-btn cancel w-full"
                // disabled={loading}
                type="submit"
                // onClick={handleLogin}
                >
                Close
            </button>
        </div>
    </div>
  )
}
