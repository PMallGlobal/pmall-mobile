import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader'
import { useUser } from '../context/UserContext';
import Toast from '../utils/Toast'
import { BASE_URL } from "../utils/config"; 
import ButtonLoader from '../utils/buttonLoader';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";



export default function AddAffilate() {
    const [toast, setToast] = useState()
    const user = useUser();
    const [affiliatePackages, setAffiliatePackages] = useState([]);
    const [loading, setLoading] =useState(false);
    const navigate = useNavigate();
    const [selectParent, setSelectParent] = useState("yes");
    const [allAffiliates, setAllAffiliates] = useState([]);
    const [error] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
      setShowPassword((prevState) => !prevState);
    };

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        ref_id: "",
        package_id: affiliatePackages.length > 0 ? affiliatePackages[0].id : "",
      });

      const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    


    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();
        setLoading(true);
        try {
          const response = await fetch(`${BASE_URL}/register/affiliate`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + user?.token,
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            const result = await response.json();
            setToast({ message: `${result.message}`, type: "error" });
                  setTimeout(() => setToast(null), 7000);
            setLoading(false);
          }
          else{
          const result = await response.json();
          console.log(result);
          setToast({ message: `${result.message}`, type: "success" });
          setLoading(false);
          
          setFormData({
            fname: "",
            lname: "",
            email: "",
            phone: "",
            username: "",
            password: "",
            ref_id: "",
            package_id: "",
          });
            setTimeout(() => setToast(null), 9000);
            window.location.href = result.data.payment.original.authorization_url;
        }
        } catch (error) {
          setLoading(false);
          console.log(error);
          setToast({ message: "Failed to register Affiliate!", type: "error" });
                setTimeout(() => setToast(null), 7000);
        }
      };

      const fetchAffiliates = () => {
        setLoading(true);
        fetch(`${BASE_URL}/get-all-affiliates`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: "Bearer " + user?.user.token,
            },
        })
            .then((resp) => resp.json())
            .then((result) => {
        console.log(result);
        fetchAllPackages()
          setAllAffiliates(result.data.affiliates || [])
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
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
      
      
      useEffect(()=> {
        console.log(user);
        fetchAffiliates();
      },[])
      
  return (
    <div className='new-product edit-profile  px-10'>
               {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <CategoryHeader title="Add Affilate" image="true" />
        
        <form style={{ width: "100%" }} onSubmit={handleSubmit} className="new flex flex-col g-20 w-full">
              <section className="flex-container flex flex-col g-20 mb-lg">
                <div className="pos-rel w100-m10 ">
                  <label> Firstname</label>
                  <input
                    type="text"
                    className="form-control-input "
                    onChange={onChangeHandler}
                    value={formData.fname}
                    name="fname"
                    placeholder="e.g Ahmed"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> Lastname</label>
                  <input
                    type="text"
                    className="form-control-input "
                    onChange={onChangeHandler}
                    value={formData.lname}
                    name="lname"
                    placeholder="e.g Peter"
                  />
                </div>
              </section>

              <section className="flex-container  flex flex-col g-20 mb-lg">
                <div className="pos-rel w100-m10  flex flex-col g-10">
                  <label> Username</label>
                  <input
                    type="text"
                    className="form-control-input "
                    onChange={onChangeHandler}
                    value={formData.username}
                    name="username"
                    placeholder="hooli"
                  />
                </div>
                <div className="pos-rel w100-m10 flex flex-col g-10">
                  <label> contact number</label>
                  <input
                    type="number"
                    className="form-control-input "
                    onChange={onChangeHandler}
                    value={formData.phone}
                    name="phone"
                    placeholder="e.g. 0803 000 0000"
                  />
                </div>
                <div className="pos-rel w100-m10 flex flex-col g-10 ">
                  <label> email address</label>
                  <input
                    type="email"
                    onChange={onChangeHandler}
                    value={formData.email}
                    className="form-control-input "
                    name="email"
                    placeholder="email@domain.com"
                  />
                </div>
              </section>
              <section className="flex-container mb-lg  flex flex-col g-20">
                <div className="pos-rel w100-m10 flex flex-col g-10">
                  <label>Password</label>
                  <div
                  className="flex items-center g-10">
                  <input
                     type={showPassword ? "text" : "password"}
                    onChange={onChangeHandler}
                    value={formData.password}
                    className="form-control-input w-full "
                    name="password"
                    placeholder="******"
                  />
                  <span onClick={togglePassword} className="cnwjien">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </span>
                </div>
                </div>
              </section>
              <section className="flex-container mb-lg  flex flex-col g-20">
              <div className="pos-rel w100-m10 flex flex-col g-10">
                  <label className="mb-7"> Select Parent For Affiliate </label>
                  <select
                    className="search__bar w-100"
                    name="selectParent"
                    value={selectParent}
                    onChange={(e) => setSelectParent(e.target.value)}>
                    <option value="yes"> Yes</option>
                    <option value="no"> No</option>
                  </select>
                </div>
                {selectParent === "yes" && (
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Select affilate</label>
                  <select
                    className="search__bar w-100"
                    value={formData.my_ref_id}
                    name="ref_id"
                    onChange={onChangeHandler}>
                      <option> Select Parent</option>
                      {
                        allAffiliates.map((affiliate)=>(
                          <option value={affiliate.my_ref_id} className="title-case"> {affiliate.fname} {affiliate.lname} - ({affiliate.my_ref_id})</option>
                        ))
                      }
                    
                  </select>
                </div>
                )}

              {selectParent === "no" && (
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Referral ID</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="ref_id"
                    onChange={onChangeHandler}
                    value={formData.ref_id}
                    placeholder="e.g. PM-000000"
                  />
                </div>
              )}
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Package Type </label>
                  <select
                    name="package_id"
                    className="search__bar w-100"
                    value={formData.package_id}
                    onChange={onChangeHandler}>
                       <option> Select Package </option>
                      {
                        affiliatePackages.map((pack)=>(
                          <option value={pack.id} key={pack.id}>{pack.name} - {pack.price} </option>
                        ))
                      }
                  </select>
                </div>
              </section>
             
              {error && <p className="text-danger">{error}</p>}
      
              <div className='flex g-40 justsb w-full mt-20 '> 
                    <button
                        className="login-btn login w-full"
                        disabled={loading}
                        type="submit"
                        >
                         {loading ? <ButtonLoader /> : "Register Affiliate"}
                    </button>
                    <button
                        className="login-btn cancel w-full"
                        disabled={loading}
                        
                        >
                        Close
                    </button>
                </div>
            </form>
    </div>
  )
}
