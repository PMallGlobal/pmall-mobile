import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/config";
import { useUser } from "../context/UserContext";
import useForm from "../utils/useForm";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const AffilateForm = ({ inputValues, onChangeHandler }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [affiliatePackages, setAffiliatePackages] = useState([]);
  const { user } = useUser();
  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };


  
  const fetchAllPackages = () => {
    setLoading(true);
    fetch(`${BASE_URL}/account-packages/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + user?.token,
        },
    })
        .then((resp) => resp.json())
        .then((result) => {
    setAffiliatePackages(result.data.packages.filter(pkg => pkg.type === "Affiliate"));
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
        });
};

useEffect(()=>{
  fetchAllPackages()
},[])


  return (
    <span className="affilate-form flex flex-col">
      <span className="flex">
        <div className="pos-rel">
          <label className="abs py-10"> First Name * </label>
          <input
            type="text"
            name="fname"
            className="first-name form-control"
            onChange={onChangeHandler}
            value={inputValues.fname || ""}
            placeholder="e.g  Lois"
          />
        </div>
        <div className="pos-rel">
          <label className="abs py-10"> Last Name * </label>
          <input
            type="text"
            name="lname"
            className="last-name form-control"
            onChange={onChangeHandler}
            value={inputValues.lname || ""}
            placeholder="e.g  Ahmed"
          />
        </div>
      </span>
      <span className="flex">
        <div className="pos-rel phone flex">
            <label className="abs py-10"> Referral id</label>
            <input
            type="text"
            name="ref_id"
            className="form-control"
            onChange={onChangeHandler}
              value={inputValues.ref_id || ""}
            placeholder="e.g  PM-000000"
            />
        </div>
        <div className="pos-rel">
          <label className="abs py-10"> Phone Number * </label>
          <input
            type="number"
            name="phone"
            className="form-control"
            onChange={onChangeHandler}
            value={inputValues.phone || ""}
            placeholder="e.g  080123456789"
          />
        </div>
      </span>
      <div className="pos-rel">
          <label className="abs py-10">Choose a username *</label>
          <input
            type="text"
            name="username"
            className="form-control"
            onChange={onChangeHandler}
            value={inputValues.username || ""}
            placeholder="e.g  madamlois"
          />
        </div>
        <div className="pos-rel flex">
            <label className="abs py-10"> Email *</label>
            <input
            type="email"
            name="email"
            className="form-control"
            onChange={onChangeHandler}
              value={inputValues.email || ""}
            placeholder="e.g  youremail@gmail.com"
            />
        </div>
        <div className="pos-rel">
          <label className="abs py-10"> Select Package * </label>
          <select
            name="package_id"
            className="last-name form-control"
            onChange={onChangeHandler}>
             {
                affiliatePackages.map((pack)=>(
                  <option value={pack.id}>{pack.name} - {pack.price} </option>
                ))
              }
          </select>
        </div>
        <div className="pos-rel">
          <label className="abs py-10"> Password * </label>
          <div
            className=" flex alc g-5">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control w-full"
              onChange={onChangeHandler}
              value={inputValues.password || ""}
              autoComplete="false"
            />
            <span onClick={togglePassword} className="cnwjien">
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
        </div>

        <div className="pos-rel">
          <label className="abs py-10">Confirm Password * </label>
          <div
            className=" flex alc g-5">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control w-full"
              onChange={onChangeHandler}
              value={inputValues.password || ""}
              autoComplete="false"
            />
            <span onClick={togglePassword} className="cnwjien">
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
        </div>
     
    </span>
  );
};

export default AffilateForm;
