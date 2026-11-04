import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/config";
import { useUser } from "../context/UserContext";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const AffilateForm = ({ inputValues, onChangeHandler }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [affiliatePackages, setAffiliatePackages] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchAllPackages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/account-packages/all`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + (user?.token || localStorage.getItem("authToken")),
          },
        });
        const result = await response.json();
        const packages = result?.data?.packages || [];
        setAffiliatePackages(packages.filter((pkg) => pkg.type === "Affiliate"));
      } catch (err) {
        console.error("Failed to fetch packages", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPackages();
  }, [user?.token]);

  return (
    <div className="dynamic-form">
      {/* Row 1: Names */}
      <div className="form-row">
        <div className="form-group">
          <label>First Name *</label>
          <input
            type="text"
            name="fname"
            className="form-control"
            onChange={onChangeHandler}
            value={inputValues.fname || ""}
            placeholder="e.g. Lois"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name *</label>
          <input
            type="text"
            name="lname"
            className="form-control"
            onChange={onChangeHandler}
            value={inputValues.lname || ""}
            placeholder="e.g. Ahmed"
            required
          />
        </div>
      </div>

      {/* Row 2: Phone & Ref */}
      <div className="form-row">
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            onChange={onChangeHandler}
            value={inputValues.phone || ""}
            placeholder="e.g. 08012345678"
            required
          />
        </div>
        <div className="form-group">
          <label>Referral ID (Optional)</label>
          <input
            type="text"
            name="ref_id"
            className="form-control"
            onChange={onChangeHandler}
            value={inputValues.ref_id || ""}
            placeholder="e.g. PM-000000"
          />
        </div>
      </div>

      {/* Row 3: Username */}
      <div className="form-group">
        <label>Choose a Username *</label>
        <input
          type="text"
          name="username"
          className="form-control"
          onChange={onChangeHandler}
          value={inputValues.username || ""}
          placeholder="e.g. madamlois"
          required
        />
      </div>

      {/* Row 4: Email */}
      <div className="form-group">
        <label>Email Address *</label>
        <input
          type="email"
          name="email"
          className="form-control"
          onChange={onChangeHandler}
          value={inputValues.email || ""}
          placeholder="youremail@gmail.com"
          required
        />
      </div>

      {/* Row 5: Package */}
      <div className="form-group">
        <label>Select Package *</label>
        <select
          name="package_id"
          className="form-control"
          onChange={onChangeHandler}
          value={inputValues.package_id || ""}
          required
        >
          <option value="" disabled>Select a Package</option>
          {loading ? (
            <option disabled>Loading packages...</option>
          ) : (
            affiliatePackages.map((pack) => (
              <option key={pack.id} value={pack.id}>
                {pack.name} — ₦{Number(pack.price).toLocaleString()}
              </option>
            ))
          )}
        </select>
      </div>
      <div className="form-group">
        <label>Password *</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="form-control"
            onChange={onChangeHandler}
            value={inputValues.password || ""}
            placeholder="Create a strong password"
            required
          />
          <button type="button" className="toggle-pwd" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
          </button>
        </div>
      </div>

      <div className="form-group">
        <label>Confirm Password *</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password_confirmation" 
            className="form-control"
            onChange={onChangeHandler}
            value={inputValues.password_confirmation || ""} 
            placeholder="Confirm your password"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default AffilateForm;