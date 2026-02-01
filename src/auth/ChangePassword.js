import React, { useState } from 'react'
import Titlenback from '../components/titlenback'
import { useVendor } from '../context/AuthContext';
import ButtonLoader from '../utils/buttonLoader';
import Toast from '../utils/Toast';

export default function ChangePassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [toast, setToast] = useState(true)

    const togglePassword = () => {
      setShowPassword((prevState) => !prevState);
    };
    
    const { inputValues, onChangeHandler, handleResetPassword,loading, toastMsg, toastType  } = useVendor();

    
  return (
    <div className='change-password flex flex-col g-20'>
        {toast && <Toast message={toastMsg} type={toastType} onClose={() => setToast(null)} />}
        <Titlenback title="Change Password" />
        <p style={{color: "#666666"}}>Enter your old password and input the new password you want.</p>
        <form action="" className='flex flex-col g-20'>
            <div className="pos-rel">
                <label className="abs py-10">Email </label>
                <input
                type="email"
                className="form-control w-full"
                name="email"
                onChange={onChangeHandler}
                value={inputValues.email || ""}
                />
            </div>
            <div className="pos-rel">
                <label className="abs"> New Password</label>
                <div
                    className="pos-rel">
                    <input
                    type={showPassword ? "text" : "password"}
                    className="form-control w-full"
                    name="password"
                    onChange={onChangeHandler}
                    value={inputValues.password || ""}
                    placeholder="********"
                    />
                    <span onClick={togglePassword} className="cnwjien">
                    {/* {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />} */}
                    </span>
                </div>
            </div>
            <div className="pos-rel">
                <label className="abs"> Confirm Password</label>
                <div
                    className="pos-rel">
                    <input
                    type={showPassword ? "text" : "password"}
                    className="form-control w-full"
                    name="confirm_password"
                    onChange={onChangeHandler}
                    value={inputValues.confirm_password || ""}
                    placeholder="********"
                    />
                    <span onClick={togglePassword} className="cnwjien">
                    {/* {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />} */}
                    </span>
                </div>
            </div>
            <div className='flex g-40 just-sb'> 
                    <button
                        className="login-btn login"
                        disabled={loading}
                        type="submit"
                        onClick={handleResetPassword}
                        >
                         {loading ? <ButtonLoader /> : "Save"}
                        
                    </button>
                    <button
                    className="login-btn cancel"
                    // disabled={loading}
                    type="submit"
                    // onClick={handleLogin}
                    >
                    Cancel
                </button>
              </div>
        </form>
    </div>
  )
}
