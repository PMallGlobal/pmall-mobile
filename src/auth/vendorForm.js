import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CompleteReg from "./completeReg";
import { BASE_URL } from "../utils/config";
import { useUser } from "../context/UserContext";
import useForm from "../utils/useForm";

const VendorForm = ({ inputValues, onChangeHandler, completeReg }) => {
const [vendorPackages, setVendorPackages] = useState([]);
const [loading, setLoading] = useState(false);
const { user } = useUser();
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
          console.log(result);
    setVendorPackages(result.data.packages.filter(pkg => pkg.type === "Vendor"));
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
    <div>
      {!completeReg ? 
        <div className="vendor-form flex flex-col ">
            <span className="flex">
                <div className="pos-rel">
                <label className="abs py-10"> First Name * </label>
                <input
                    type="text"
                    name="fname"
                    className="first-name form-control"
                    onChange={onChangeHandler}
                    value={inputValues.fname || ""}
                    placeholder="Ahmed"
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
                    placeholder="Roy"
                />
                </div>
            </span>
            <span className="flex">
                <div className="pos-rel phone">
                <label className="abs py-10"> Phone Number *</label>
                <input
                    type="number"
                    name="phone"
                    className="form-control"
                    onChange={onChangeHandler}
                    value={inputValues.phone || ""}
                    placeholder="080123456789"
                    autoComplete="false"
                />
                </div>

                <div className="pos-rel">
                    <label className="abs py-10">Referral id * </label>
                    <input
                        type="text"
                        name="ref_id"
                        className="first-name form-control"
                        onChange={onChangeHandler}
                        value={inputValues.ref_id || ""}
                        placeholder="PM-123456789"
                    />
                </div>
            </span>
            <div className="pos-rel flex">
                <label className="abs py-10"> Store Name *</label>
                <input
                type="text"
                name="store_name"
                className="form-control"
                onChange={onChangeHandler}
                  value={inputValues.store_name || ""}
                placeholder="CALISTUS HERBALS"
                />
            </div>
            
            <div className="pos-rel email">
                <label className="abs py-10"> Email *</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={onChangeHandler}
                    value={inputValues.email || ""}
                    placeholder="youremail@gmail.com"
                />
                </div>
        
            <div className="pos-rel">
              <label className="abs py-10"> Select Package* </label>
              <select
                name="package_id"
                className="last-name form-control"
                onChange={onChangeHandler}>
                  {
                    vendorPackages.map((pack)=>(
                      <option value={pack.id} key={pack.id}>{pack.name} - {pack.price} </option>
                    ))
                  }
              </select>
            </div>
        </div>:
        <CompleteReg onChangeHandler={onChangeHandler} />
      }
    </div>
  );
};

export default VendorForm;
