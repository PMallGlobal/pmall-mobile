import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/config";
import { useUser } from "../context/UserContext";
import CompleteReg from "./completeReg";

const VendorForm = ({ inputValues, onChangeHandler, completeReg }) => {
  const [vendorPackages, setVendorPackages] = useState([]);
  const [loading, setLoading] = useState(false);
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
        setVendorPackages(packages.filter((pkg) => pkg.type === "Vendor"));
      } catch (err) {
        console.error("Failed to fetch packages", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPackages();
  }, [user?.token]);

  if (completeReg) {
    return <CompleteReg onChangeHandler={onChangeHandler} />;
  }

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
            placeholder="e.g. Ahmed"
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
            placeholder="e.g. Roy"
            required
          />
        </div>
      </div>

  
      <div className="form-row">
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            onChange={onChangeHandler}
            value={inputValues.phone || ""}
            placeholder="08012345678"
            required
          />
        </div>
        <div className="form-group">
          <label>Referral ID *</label>
          <input
            type="text"
            name="ref_id"
            className="form-control"
            onChange={onChangeHandler}
            value={inputValues.ref_id || ""}
            placeholder="PM-123456789"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Store Name *</label>
        <input
          type="text"
          name="store_name"
          className="form-control"
          onChange={onChangeHandler}
          value={inputValues.store_name || ""}
          placeholder="e.g. Calistus Herbals"
          required
        />
      </div>

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
            vendorPackages.map((pack) => (
              <option key={pack.id} value={pack.id}>
                {pack.name} — ₦{Number(pack.price).toLocaleString()}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  );
};

export default VendorForm;