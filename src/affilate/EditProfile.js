import React, { useEffect, useState } from 'react'
import CategoryHeader from '../components/CategoryHeader'
import { useVendor } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import ButtonLoader from '../utils/buttonLoader';
import nigeriaStates from '../components/nigeriaStateAndLgas.json'
import Toast from '../utils/Toast';

export default function EditProfile() {
    const [toast, setToast] = useState()
    const [selectedState, setSelectedState] = useState('');
    const [selectedLga, setSelectedLga] = useState('');
    const [profile, setProfile] = useState(null);
    const [inputValues, setState] = useState({});

    const banks = ["UBA", "First Bank", "Unity Bank"]

    const onChangeHandler = (e) => {
        if (!e?.persist) {
          setState(inputValues, {
            ...inputValues,
            [e?.target.name]: e?.target.value,
          });
        } else {
          e?.persist();
          const target = e?.target;
          if (target?.name) {
            setState((inputValues) => ({
              ...inputValues,
              [target.name]: target.value,
            }));
          }
        }
      };
    

    const {
        setToastMsg,
        loading,
        setLoading,
        toastMsg,
        setToastType,
      } = useVendor();

      const user = useUser();

      console.log(user.user)

      const getProfile = () => {
        fetch("https://api.pmall.com.ng/api/v1/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        })
          .then((resp) => resp.json())
          .then((result) => {
            console.log("Raw user:", result.data.user);
    
            const user = result?.data?.user;
            if (!user) {
              console.error("No user data received");
              return;
            }
    
            // Clean the user data (remove wallet, referrals, etc.)
            const { 
              wallet, 
              referrals, 
              vendor, 
              ...cleanUser 
            } = user;
    
            // Set profile
            setProfile(cleanUser);
            console.log(user.user)
    
            // Set form values AFTER profile is ready
            if(user?.accountType  == "Vendor"){
                setState({
                fname: cleanUser.fname || '',
                lname: cleanUser.lname || '',
                email: cleanUser.email || '',
                phone: cleanUser.phone || '',
                state: cleanUser.state || '',
                lga: cleanUser.lga || '',
                acct_name: cleanUser.acct_name || '',
                acct_number: cleanUser.acct_number || '',
                });
            }else{
                setState({
                    fname: cleanUser.fname || '',
                    lname: cleanUser.lname || '',
                    email: cleanUser.email || '',
                    phone: cleanUser.phone || '',
                    state: cleanUser.state || '',
                    lga: cleanUser.lga || '',
                    acct_name: cleanUser.acct_name || '',
                    acct_number: cleanUser.acct_number || '',
                    description: cleanUser.description || '',
                    address: cleanUser.address || '',
                    acct_type: cleanUser.acct_type || '',
                    photo: cleanUser.photo || '',
                });
            }
    
            // Set location dropdowns
            setSelectedState(cleanUser.state || '');
            setSelectedLga(cleanUser.lga || '');
          })
          .catch((err) => {
            console.error("Profile fetch error:", err);
          });
      };

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
        setState((prev) => ({ ...prev, state: newState }));
      };
    
      // LGA change handler
      const handleLgaChange = (e) => {
        const newLga = e.target.value;
        setSelectedLga(newLga);
        setState((prev) => ({ ...prev, lga: newLga }));
      };


    const handleEditProfile = async(e) => {
        if (e) {
          e.preventDefault(); 
          setLoading(true)
        try {
          const response = await fetch('https://api.pmall.com.ng/api/v1/profile/update', {
            method: 'POST',
            headers:{ 
              'Content-Type': 'application/json;charset=UTF-8', 
              Accept: "application/json" ,
              Authorization: `Bearer ${user?.user.token}`
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
            window.location.href = "/profile";
          } else {
            const error = await response.text();
            console.log('Error posting product:', error);
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

      useEffect(()=>{
        getProfile()
      }, []);

  return (
    <div className='new-product edit-profile '>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <CategoryHeader title="Edit Profile" />
        {user.acct_type == "Vendor" ? 
        <form action="" className="new flex flex-col g-20 w-full">
                <div className="pos-rel">
                    <label className="abs py-10"> First Name </label>
                    <input
                        type="text"
                        name="fname"
                        className="first-name form-control w-full"
                        onChange={onChangeHandler}
                        value={inputValues.fname || ""}
                        placeholder="ROY"
                    />
                </div>

                <div className="pos-rel">
                    <label className="abs py-10"> Last Name </label>
                    <input
                        type="text"
                        name="lname"
                        className="last-name form-control w-full"
                        onChange={onChangeHandler}
                        value={inputValues.lname || ""}
                        placeholder="LINUS"
                    />
                </div>
                {/* <div className="pos-rel phone">
                    <label className="abs py-10"> Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control w-full"
                        // onChange={onChangeHandler}
                        // value={inputValues.phone || ""}
                        placeholder="mail@gmail.cm"
                        autoComplete="false"
                    />
                </div> */}
               
                <div className="pos-rel">
                    <label className="abs py-10">Phone </label>
                    <input
                        type="text"
                        name="phone"
                        className="first-name form-control w-full"
                        onChange={onChangeHandler}
                        value={inputValues.phone}
                        placeholder="09188771514"
                    />
                </div>
            <div className="pos-rel ">
                <label className="abs py-10">Account Name</label>
                <input
                type="text"
                name="acct_name"
                className="form-control w-full"
                onChange={onChangeHandler}
                  value={inputValues.acct_name}
                placeholder="Roy Linus Theo"
                />
            </div>
            
            <div className="pos-rel email">
                <label className="abs py-10"> Account Number</label>
                <input
                    type="number"
                    name="acct_number"
                    className="form-control w-full"
                    onChange={onChangeHandler}
                    value={inputValues.acct_number}
                    placeholder="0019123444"
                />
            </div>

                <div className="pos-rel w-full">
                    <label className="abs py-10">Bank </label>
                    <select
                        name="bank"
                        className=" form-control w-full"
                        default="Select category"
                        onChange={onChangeHandler}
                        >
                        {
                            banks.map((bank)=>(
                            <option value={bank} key={bank}>{bank} </option>
                            ))
                        }
                         <option value="Select category" className=''></option>
                    </select>
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
                
                <div className='flex g-40 justsb w-full mt-20 '> 
                    <button
                        className="login-btn login w-full"
                        disabled={loading}
                        type="submit"
                        onClick={handleEditProfile}
                        >
                         {loading ? <ButtonLoader /> : "Save"}
                    </button>
                    <button
                        className="login-btn cancel w-full"
                        // disabled={loading}
                        type="submit"
                        // onClick={handleLogin}
                        >
                        Close
                    </button>
                </div>
        </form> :
           <form action="" className="new flex flex-col g-20 w-full">
                <div className="pos-rel">
                    <label className="abs py-10"> First Name </label>
                    <input
                        type="text"
                        name="fname"
                        className="first-name form-control w-full"
                        onChange={onChangeHandler}
                        value={inputValues.fname || ""}
                        placeholder="ROY"
                    />
                </div>

                <div className="pos-rel">
                    <label className="abs py-10"> Last Name </label>
                    <input
                        type="text"
                        name="lname"
                        className="last-name form-control w-full"
                        onChange={onChangeHandler}
                        value={inputValues.lname || ""}
                        placeholder="LINUS"
                    />
                </div>

                <div className="pos-rel">
                    <label className="abs py-10">Phone </label>
                    <input
                        type="text"
                        name="phone"
                        className="first-name form-control w-full"
                        onChange={onChangeHandler}
                        value={inputValues.phone}
                        placeholder="09188771514"
                    />
                </div>
                <div className="pos-rel ">
                    <label className="abs py-10">Account Name</label>
                    <input
                    type="text"
                    name="acct_name"
                    className="form-control w-full"
                    onChange={onChangeHandler}
                        value={inputValues.acct_name}
                    placeholder="Roy Linus Theo"
                    />
                </div>
                
                <div className="pos-rel email">
                    <label className="abs py-10"> Account Number</label>
                    <input
                        type="number"
                        name="acct_number"
                        className="form-control w-full"
                        onChange={onChangeHandler}
                        value={inputValues.acct_number}
                        placeholder="0019123444"
                    />
                </div>

                <div className="pos-rel w-full">
                    <label className="abs py-10">Bank </label>
                    <select
                        name="bank"
                        className=" form-control w-full"
                        default="Select category"
                        onChange={onChangeHandler}
                        >
                        {
                            banks.map((bank)=>(
                            <option value={bank} key={bank}>{bank} </option>
                            ))
                        }
                            <option value="Select category" className=''></option>
                    </select>
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

                <div className="pos-rel ">
                    <label className="abs py-10">Address</label>
                    <input
                    type="text"
                    name="address"
                    className="form-control w-full"
                    onChange={onChangeHandler}
                        value={inputValues?.address}
                    placeholder="Your address"
                    />
                </div>

                <div className="pos-rel ">
                    <label className="abs py-10">Description</label>
                    <input
                    type="text"
                    name="description"
                    className="form-control w-full"
                    onChange={onChangeHandler}
                        value={inputValues?.description}
                    placeholder="Roy Linus Theo"
                    />
                </div>

                <div className="pos-rel ">
                    <label className="abs py-10">Account Type</label>
                    <input
                    type="text"
                    name="acct_type"
                    className="form-control w-full"
                    onChange={onChangeHandler}
                    value={inputValues.acct_type}
                    placeholder="Roy Linus Theo"
                    />
                </div>

                <div className="pos-rel w-full">
              <label className="abs py-10">Photo </label>
              <div className='add-img'>
                <input
                    type="file"
                    className="form-control w-full flex all-center bg-white"
                    name="photo"
                    accept=".jpg,.png,.jpeg"
                    onChange={(e) => {
                    //   if (selectedName == "") {
                    //     setAlert("Please Select a file name");
                    //     return;
                    //   }
                      const formData = new FormData();
                      const files = e.target.files;
                      files?.length && formData.append("file", files[0]);
                      //setLoading(true);
                      fetch(
                        "https://api.pmall.com.ng/api/v1/products/upload-file",
                        {
                          method: "POST",
                          body: formData,
                          headers: {
                            Authorization: "Bearer " + localStorage.getItem("authToken"),
                          },
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          //setLoading(false);
                          console.log(data)
                          setState((inputValues) => ({
                            ...inputValues,
                            photo: data.url, 
                          }))
                          console.log(inputValues)
                        })
                        .catch((error) => {
                          //setLoading(false);
                          console.log(error)
                        });
                    }}
                  />
              </div>
              
            </div>
                
                <div className='flex g-40 justsb w-full mt-20 '> 
                    <button
                        className="login-btn login w-full"
                        disabled={loading}
                        type="submit"
                        onClick={handleEditProfile}
                        >
                            {loading ? <ButtonLoader /> : "Save"}
                    </button>
                    <button
                        className="login-btn cancel w-full"
                        // disabled={loading}
                        type="submit"
                        // onClick={handleLogin}
                        >
                        Close
                    </button>
                </div>
        </form>
    }
    </div>
  )
}
