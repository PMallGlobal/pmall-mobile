import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CategoryHeader from '../components/CategoryHeader'
import { useUser } from '../context/UserContext';
import Toast from '../utils/Toast'
import { BASE_URL } from "../utils/config"; 
import ButtonLoader from '../utils/buttonLoader';
import { useVendor } from '../context/AuthContext';



export default function AddVendor() {
    const [toast, setToast] = useState()
    const [allAffiliates, setAllAffiliates] = useState([]);
    const [selectParent, setSelectParent] = useState("yes");
    const [allVendors, setAllVendors] = useState([]);
    const [vendorPackages, setVendorPackages] = useState([]);
    const {
        inputValues,
        setState,
        setToastMsg,
        loading,
        setLoading,
        toastMsg,
        setToastType,
      } = useVendor();

      const user = useUser();

      const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        store_name: "",
        ref_id: "",
        package_id: vendorPackages.length > 0 ? vendorPackages[0].id : "",
      });

      const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
    

    const AddVendor = async(e) => {
        if (e) {
          e.preventDefault(); 
          setLoading(true)
        try {
          const response = await fetch('https://api.pmall.com.ng/api/v1/user/add-vendor', {
            method: 'POST',
            headers:{ 
              'Content-Type': 'application/json;charset=UTF-8', 
              "Accept": "application/json" ,
              'Authorization': `Bearer ${user?.user.token}`
            },
              body:JSON.stringify(inputValues)
          });
          console.log(inputValues)
          if (response.ok) {
            const data = await response.json();
            setToastMsg("Great! Vendor added successfully");
            setToastType("success")
            setInterval(() => {
              setToastMsg("");
            }, 5000);
            setLoading(false)
            console.log(data)
            // setNewProduct(data)
            // window.location.href = "/affiliate/my-vendors";
          } else {
            const error = await response.text();
            console.error('Error posting product:', error);
            setLoading(false)
            setToastMsg("Oops! there seems to be an error. Fill in correct credentials")
            setToastType("error")
            setInterval(() => {
              setToastMsg("");
     }, 3000);
          }
        } catch (error) {
          console.error('Network error:', error);
        }
      }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData);
        try {
          const response = await fetch(`${BASE_URL}/register/vendor`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + user?.token,
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            setToast({ message: "Failed to register vendor!", type: "error" });
            setTimeout(() => setToast(null), 7000);
            setLoading(false);
          }else{
          
          const result = await response.json();
          console.log(result);
          window.location.href = result.data.payment.original.authorization_url;
          setToast({ message: `${result.message}`, type: "success" });
          setLoading(false);
          
          setFormData({
            fname: "",
            lname: "",
            email: "",
            phone: "",
            store_name: "",
            ref_id: "",
            package_id: "",
          });
          setTimeout(() => setToast(null), 9000);
        }
        } catch (error) {
          setLoading(false);
          setToast({ message: "Failed to register vendor!", type: "error" });
          setTimeout(() => setToast(null), 7000);
        }
      };

      
    
      const fetchVendors = () => {
        setLoading(true);
        fetch(`${BASE_URL}/get-all-vendors`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: "Bearer " + user?.user.token,
            },
        })
            .then((resp) => resp.json())
            .then((result) => {
                setAllVendors(result.data.vendors || []);
                fetchAllPackages();
                fetchAffiliates();
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
              Authorization: "Bearer " + user.user?.token,
          },
      })
          .then((resp) => resp.json())
          .then((result) => {
      setVendorPackages(result.data.packages.filter(pkg => pkg.type === "Vendor"));
              setLoading(false);
          })
          .catch((err) => {
              setLoading(false);
          });
    };
    
    
    useEffect(()=> {
      fetchVendors();
    },[])
  return (
    <div className='new-product edit-profile '>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <CategoryHeader title="Add Vendor" image="true" />
        <form style={{ width: "100%" }} onSubmit={handleSubmit}  className="new flex flex-col g-20 w-full">
              <section className="flex-container mb-lg  flex flex-col g-20">
                <div className="pos-rel w100-m10 ">
                  <label> Firstname</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="fname"
                    onChange={onChangeHandler}
                    value={formData.fname}
                    placeholder="e.g Adamu"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> Lastname</label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="lname"
                    onChange={onChangeHandler}
                    value={formData.lname}
                    placeholder="e.g Norris"
                  />
                </div>
              </section>
              <section className="flex-container mb-lg  flex flex-col g-20">
                <div className="pos-rel w100-m10 ">
                  <label> email address</label>
                  <input
                    type="email"
                    className="form-control-input "
                    name="email"
                    onChange={onChangeHandler}
                    value={formData.email}
                    placeholder="email@domain.com"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> phone number</label>
                  <input
                    type="number"
                    className="form-control-input "
                    name="phone"
                    onChange={onChangeHandler}
                    value={formData.phone}
                    placeholder="e.g. 0803 000 0000"
                  />
                </div>
                <div className="pos-rel w100-m10 ">
                  <label> Store Name </label>
                  <input
                    type="text"
                    className="form-control-input "
                    name="store_name"
                    onChange={onChangeHandler}
                    value={formData.store_name}
                    placeholder="e.g Hooli Stores"
                  />
                </div>
              </section>

              <section className="flex-container mb-lg  flex flex-col g-20">
                
                <div className="pos-rel w100-m10 ">
                  <label> Store ULR </label>
                  <input
                    type="text"
                    disabled
                    className="form-control-input "
                    name="store_url"
                    placeholder="https://pmall.ng/hooli_stores"
                  />
                </div>
              </section>
              <section className="flex-container mb-lg  flex flex-col g-20">
              <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Select Parent For Vendor </label>
                  <select
                    className="search__bar w-100"
                    name="selectParent"
                    value={selectParent}
                    onChange={(e) => setSelectParent(e.target.value)}
          >
                    <option value="yes"> Yes</option>
                    <option value="no"> No</option>
                  </select>
                </div>
                {selectParent === "yes" && (
                <div className="pos-rel w100-m10 ">
                  <label className="mb-7"> Choose affilate</label>
                  <select
                    className="search__bar w-100"
                    value={formData.my_ref_id}
                    name="ref_id"
                    onChange={onChangeHandler}>
                      <option > Select Parent</option>
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
                  <label className="mb-7"> Affiliate ID</label>
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
                  <label className="mb-7"> Package Fee </label>
                    <select
                    name="package_id"
                    className="search__bar w-100"
                    value={formData.package_id}
                    onChange={onChangeHandler}>
                       <option value={""}>Select Package</option>
                      <option value={vendorPackages[0]?.id || ""}>
                        {vendorPackages[0]
                          ? `${vendorPackages[0].name} - ${vendorPackages[0].price}`
                          : "No packages available"}
                      </option>
                    </select>
                </div>
              </section>

              {/* {error && <p className="text-danger">{error}</p>} */}
              <div className='flex g-40 justsb w-full mt-20 '> 
                    <button
                        className="login-btn login w-full"
                        disabled={loading}
                        type="submit"
                        >
                         {loading ? <ButtonLoader /> : "Register Vendor"}
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
