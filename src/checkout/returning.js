import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useVendor } from '../context/AuthContext';
import ButtonLoader from "../utils/buttonLoader";

export default function Returning({inputValues,onChangeHandler,onSubmitHandler }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
      setShowPassword((prevState) => !prevState);
    };

    const {
      loading,
      submittedValues,
    } = useVendor();

    
  return (
    <div>
        <form action="">
              <div className="pos-rel">
                <label className="abs"> Username </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  onChange={onChangeHandler}
                  placeholder="username or email"
                  value={inputValues.username || ""}
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
                  {/* <span onClick={togglePassword} className="cnwjien">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </span> */}
                </div>
                <div className="forgotten">
                    <p className="">Don’t have an account? <Link to='/sign-up' ><span className="purple ">  SIGN UP </span> </Link></p>
                    <Link to="/auth/app/reset-account" className=" ">
                        <p className=" purple">Forgot Password?</p>
                    </Link>
                </div>
              </div>
                <div className='flex g-40 just-sb'> 
                    <button
                        className="login-btn login"
                        disabled={loading}
                        type="submit"
                        onClick={onSubmitHandler}
                        >
                         {loading ? <ButtonLoader /> : "Login"}
                    </button>
                    <button
                    className="login-btn cancel"
                    disabled={loading}
                    type="submit"
                   
                    >
                    Cancel
                </button>
              </div>
            </form>
    </div>
  )
}
