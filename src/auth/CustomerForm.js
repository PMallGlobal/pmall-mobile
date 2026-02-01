import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CompleteReg from "./completeReg";
import { BASE_URL } from "../utils/config";
import { useUser } from "../context/UserContext";
import ButtonLoader from '../utils/buttonLoader';
import nigeriaStates from '../components/nigeriaStateAndLgas.json'

const CustomerForm = ({ inputValues, onChangeHandler, onCustomerSubmitHandler, setInputValues }) => {
const [loading, setLoading] = useState(false);
const { user } = useUser();
const [showPassword, setShowPassword] = useState(false);

const togglePassword = () => {
  setShowPassword((prevState) => !prevState);
};

const [selectedState, setSelectedState] = useState('');
const [selectedLga, setSelectedLga] = useState('');

// Find the selected state's LGAs
const selectedStateData = nigeriaStates.find(
    (stateObj) => stateObj.state === selectedState
);

const lgas = selectedStateData ? selectedStateData?.lgas : [];
console.log(selectedState)

const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setSelectedLga(''); // reset LGA when state changes
    // Also update inputValues if you want to save state there
    setInputValues((prev) => ({ ...prev, state: newState }));
  };

  // LGA change handler
  const handleLgaChange = (e) => {
    const newLga = e.target.value;
    setSelectedLga(newLga);
    setInputValues((prev) => ({ ...prev, lga: newLga }));
  };

  
useEffect(()=>{
  
},[])

  return (
    <div>
       <span className="affilate-form flex flex-col g-20">
       <span className="flex g-20">
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
       <span className="flex g-20">
           <div className="pos-rel">
           <label className="abs py-10">Username *</label>
           <input
               type="text"
               name="username"
               className="form-control"
               onChange={onChangeHandler}
               value={inputValues.username || ""}
               placeholder="e.g  madamlois"
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
               <label className="abs py-10"> State </label>
               <select
                   name="state"
                   className="form-control"
                   value={selectedState}
                   onChange={handleStateChange}  // ← dedicated handler
                   required
                   >
                   <option value="">Select State</option>
                   {nigeriaStates.map((stateObj) => (
                       <option key={stateObj.state} value={stateObj.state}>
                       {stateObj.state}
                       </option>
                   ))}
               </select>
           </div>
           <div className="pos-rel">
               <label className="abs py-10"> LGA </label>
               <select
               name="lga"
               className="form-control"
               value={selectedLga}
               onChange={handleLgaChange}  // ← dedicated handler
               disabled={!selectedState || lgas.length === 0}
               required
               >
                   <option value="">Select LGA</option>
                   {lgas.map((lgaName) => (
                       <option key={lgaName} value={lgaName}>
                       {lgaName}
                       </option>
                   ))}
                   {lgas.length === 0 && selectedState && (
                       <option disabled>No LGAs available</option>
                   )}
               </select>
           </div>
           <div className="pos-rel">
               <label className="abs py-10">Address</label>
               <input
                   type="text"
                   name="address"
                   className="form-control"
                   onChange={onChangeHandler}
                   value={inputValues.address || ""}
                   placeholder="Address details"
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
                 value={inputValues.password || ""}
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
               name="password_confirmation"
               className="form-control"
                 onChange={onChangeHandler}
                 value={inputValues.password_confirmation || ""}
               autoComplete="false"
               />
               <span onClick={togglePassword} className="cnwjien">
               {/* {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />} */}
               </span>
           </div>
           </div>
       
       </span>
       <div className='flex g-40 just-sb'> 
               <button
                   className="login-btn login"
                   disabled={loading}
                   type="submit"
                   onClick={onCustomerSubmitHandler}
                   >
                    {loading ? <ButtonLoader /> : "Submit"}
               </button>
               <button
               className="login-btn cancel"
               disabled={loading}
               type="submit"
               onClick={onCustomerSubmitHandler}
               >
               Cancel
           </button>
         </div>
  

    </div>
  );
};

export default CustomerForm;
