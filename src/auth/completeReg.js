import React, { useState } from 'react'

export default function CompleteReg({onChangeHandler}) {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [affiliatePackages, setAffiliatePackages] = useState([]);
  //   const { user } = useUser();
    const togglePassword = () => {
      setShowPassword((prevState) => !prevState);
    };
  
  return (
    <div className="affilate-form flex flex-col">
         <div className="pos-rel">
          <label className="abs py-10">Store Name *</label>
          <input
            type="text"
            name="username"
            className="form-control"
            onChange={onChangeHandler}
            // value={inputValues.username || ""}
            placeholder="Your Store Name"
          />
        </div>

        <div className="pos-rel">
          <label className="abs py-10"> Password * </label>
          <div
            className="pos-rel">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              onChange={onChangeHandler}
            //   value={inputValues.password || ""}
              autoComplete="false"
            />
            <span onClick={togglePassword} className="cnwjien">
              {/* {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />} */}
            </span>
          </div>
        </div>

        <div className="pos-rel">
          <label className="abs py-10">Confirm Password * </label>
          <div
            className="pos-rel">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              onChange={onChangeHandler}
            //   value={inputValues.password || ""}
              autoComplete="false"
            />
            <span onClick={togglePassword} className="cnwjien">
              {/* {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />} */}
            </span>
          </div>
        </div>
    </div>
  )
}
