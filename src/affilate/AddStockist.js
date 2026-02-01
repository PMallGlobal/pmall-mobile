import React, { useState } from 'react'
import CategoryHeader from '../components/CategoryHeader'
import { useVendor } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import Toast from '../utils/Toast';

export default function AddStockist() {
    const [toast, setToast] = useState()

    const {
        inputValues,
        setState,
        onChangeHandler,
        setToastMsg,
        loading,
        setLoading,
        toastMsg,
        setToastType,
      } = useVendor();

      const user = useUser();
      console.log(user?.user)

    const handleAddStockist = async(e) => {
        if (e) {
          e.preventDefault(); 
          setLoading(true)
        try {
          const response = await fetch('https://stage.api.pmall.com.ng/api/v1/stockists/store', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("authToken"),
              },
              body:JSON.stringify(inputValues)
          });
          console.log(inputValues)
          if (response.ok) {
            const data = await response.json();
            setToastMsg("Great! Stockist added successfully");
            setToastType("success")
            setInterval(() => {
              setToastMsg("");
            }, 5000);
            setLoading(false)
            console.log(data)
            window.location.href = "/affilate/my-stockist";
            // setNewProduct(data)
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
  return (
    <div className='new-product edit-profile '>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <CategoryHeader title="Add Stockist" image="true" />

        <form action="" className="new flex flex-col g-20 w-full" onSubmit={handleAddStockist}>
            <div className="pos-rel">
                <label className="abs py-10">  Name </label>
                <input
                    type="text"
                    name="name"
                    className="first-name form-control w-full"
                    onChange={onChangeHandler}
                    value={inputValues.name }
                    placeholder="ROY"
                />
            </div>

            <div className="pos-rel phone">
                <label className="abs py-10"> Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control w-full"
                    onChange={onChangeHandler}
                    value={inputValues.email}
                    placeholder="mail@gmail.cm"
                    autoComplete="false"
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

            <div className="pos-rel phone">
                <label className="abs py-10"> Address </label>
                <input
                    type="text"
                    name="address"
                    className="form-control w-full"
                    onChange={onChangeHandler}
                    value={inputValues.address}
                    placeholder="Address"
                    autoComplete="false"
                />
            </div>
            
            <div className="pos-rel phone">
                <label className="abs py-10"> Country </label>
                <input
                    type="text"
                    name="country"
                    className="form-control w-full"
                    onChange={onChangeHandler}
                    value={inputValues.country}
                    placeholder="Country"
                    autoComplete="false"
                />
            </div>
            <div className="pos-rel phone">
                <label className="abs py-10"> State </label>
                <input
                    type="text"
                    name="state"
                    className="form-control w-full"
                    onChange={onChangeHandler}
                    value={inputValues.state}
                    placeholder="State"
                    autoComplete="false"
                />
            </div>

            <div className="pos-rel phone">
                <label className="abs py-10"> City </label>
                <input
                    type="text"
                    name="city"
                    className="form-control w-full"
                    onChange={onChangeHandler}
                    value={inputValues.city}
                    placeholder="City"
                    autoComplete="false"
                />
            </div>
                
                <div className='flex g-40 justsb w-full mt-20 '> 
                    <button
                        className="login-btn login w-full"
                        // disabled={loading}
                        type="submit"
                        // onClick={handleLogin}
                        >
                        {/*  {loading ? <ButtonLoader /> : "Login"} */}
                        Register
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
    </div>
  )
}
