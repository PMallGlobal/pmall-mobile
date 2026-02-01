import { Link } from "react-router-dom";
import useForm from "../utils/useForm";
import AffilateForm from "./affilateForm";
import VendorForm from "./vendorForm";
import { useState } from "react";
import { useVendor } from "../context/AuthContext";
import Toaster from "../utils/toaster";
import ButtonLoader from "../utils/buttonLoader";
import CustomerForm from "./CustomerForm";

const CustomerReg = () => {
  const onEnter = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      signUpHandler();
    }
  };

  const signUpHandler = () => {
    console.log(inputValues);
  };

  const {
    inputValues,
    onChangeHandler,
    onCustomerSubmitHandler,
    onAffilateSubmitHandler,
    setState,
    toastMsg,
    toastType,
    loading,
    submittedValues,
  } = useVendor();
  const [vendorForm, setVendorForm] = useState(true);
  const [vendorPay, setVendorPay] = useState(false);
  const [completeReg, setCompleteReg] = useState(false);
  console.log(loading)
  return (
    <div className="signup-screen">
      <div className="w-100 flex all-center main-logo">
          <img src="/images/new PMALL logo.png" alt="" />
      </div>
      <div className={`right ${!vendorForm }`}>
        {/* <Toaster text={toastMsg} className={toastType} /> */}
        <div className="main flex flex-col g-20">
            <div>
                <h1>Signup to Pmall</h1>
                <p className="right-head bold">Connecting people and services</p>
            </div>
          <form
            action=""
            className=""
            onSubmit={onCustomerSubmitHandler}
            >
              <CustomerForm
                inputValues={inputValues}
                onChangeHandler={onChangeHandler}
                onCustomerSubmitHandler={onCustomerSubmitHandler}
                completeReg={completeReg}
                setInputValues = {setState}
              />
            <span className="t-and-c">
              <input type="checkbox" name="t-and-c" />
              <p className="bold">
                I agree to the{" "}
                <Link to="/app/Terms" className="purple ">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/app/Conditions" className="purple ">
                  Conditions
                </Link>{" "}
                of <Link to="/app/Conditions" className="purple ">Pmall Nigeria</Link>
              </p>
            </span>
            {vendorForm ? (
              <div className="flex flex-col">
                {!vendorPay && !completeReg ? 
                 <button
                  className={`continue-btn my-20 relative ${!vendorForm && "affilate"}`}
                  onClick={signUpHandler}
                  disabled={loading}
                  >
                   {loading ?<ButtonLoader /> : "Continue"} 
                </button> 
                  : completeReg ? 
                  <button
                  className={`continue-btn my-20 relative ${!vendorForm && "affilate"}`}
                  onClick={signUpHandler}
                  disabled={loading}
                  >
                  {loading ?<ButtonLoader /> : "Complete Registration"}
                </button>
                :
                <button
                  className={`continue-btn my-20 relative ${!vendorForm && "affilate"}`}
                  onClick={signUpHandler}
                  disabled={loading}
                  >
                  {loading ?<ButtonLoader /> : " Proceed to Payment"}
                 
                </button>
                }
                {!completeReg &&
                <>
                  <p className="have-an-account bold">
                  Already have an account? &nbsp;
                  </p>
                  <button
                  className={`vend-login-btn my-20 relative ${!vendorForm && "affilate"}`}
                  >
                  Login
                  </button>
                </>
                }
              </div>
            ) : (
              <button
                className={`continue-btn my-20 relative ${!vendorForm && "affilate"}`}
                onClick={onAffilateSubmitHandler}
               disabled={loading}
                >
                {loading ?<ButtonLoader /> : "Continue"}
              </button>
            )}
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerReg;
