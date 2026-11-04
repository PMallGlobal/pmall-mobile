import { Link } from "react-router-dom";
import { useState } from "react";
import { useVendor } from "../context/AuthContext";
import Toaster from "../utils/toaster";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ButtonLoader from "../utils/buttonLoader";

const StockistLogin = () => {
  const onEnter = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      loginHandler();
    }
  };

  const loginHandler = () => {
    // console.log(inputValues);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const {
    inputValues,
    onChangeHandler,
    stockistLogin,
    loading,
    toastMsg,
    toastType,
  } = useVendor();
  console.log(loading)
  
  return (
    <section>
      <div className="login-screen">

        <div className="right">
          <div className="container">
            <div className="w-100 flex all-center main-logo">
                <img src="/images/new PMALL logo.png" alt="" />
            </div>
            {/* <Toaster text={toastMsg} className={toastType} /> */}
            <h1>Hello again!</h1>
            <p className="bold">Welcome back, you've been missed!</p>
            <form action="">
              <div className="pos-rel">
                <label className="abs"> Username </label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  onChange={onChangeHandler}
                  placeholder="username or email"
                  value={inputValues.email || ""}
                />
              </div>

              <div className="pos-rel">
                <label className="abs"> Your Password</label>
                <div
                  className="pos-rel">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    onChange={onChangeHandler}
                    value={inputValues.password || ""}
                    placeholder="********"
                  />
                  <span onClick={togglePassword} className="cnwjien">
                    {/* {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />} */}
                  </span>
                </div>
                <div className="forgotten">
                    <Link to="/auth/app/reset-account" className=" bold">
                        <p className=" purple">Forgot Password?</p>
                    </Link>
                    <p className="">Click <Link to='/' ><span className="purple "> HERE </span> </Link>to go back to Mall</p>
                </div>
              </div>
            
              <button
                className="login-btn bold"
                disabled={loading}
                type="submit"
                onClick={stockistLogin}
                >
                 {loading ? <ButtonLoader /> : "Login"}
                </button>
              <div className="flex all-center flex-col g-20 Register-btn w-full">
                <p className="center">Don't have an account yet?</p>
                <Link to="/auth/sign-up" className="flex w-full all-center purple">
                    <button className="create-account bold purple">Register Now</button>
                </Link>
              </div>
            </form>
            <div className="form-logo">
            <img src="/pmall-logo 1.png" alt="" />
          </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default StockistLogin;