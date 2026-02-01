import React from 'react'
import CategoryHeader from '../components/CategoryHeader'

export default function Transfer() {
  return (
    <div className='withdraw'>
        <CategoryHeader title="Transfer Funds" />
        <form action="">
            <div className='flex flex-col g-20'>
                <div className='flex flex-col g-10'>
                    <p>Available Balance</p>
                    <div className='available'>
                        <p>NGN 65,000.00</p>
                    </div>
                </div>
                <div className='flex flex-col g-10'>
                    <p>Select Account</p>
                    <select
                    name="package_id"
                    className="last-name form-control w-full bg-white p-20"
                    // onChange={onChangeHandler}
                    >
                        Select acct
                    </select>
                </div>
                <div className='flex flex-col g-10'>
                    <p>Enter Username</p>
                   <input type="text" placeholder='Username'  className='w-full bg-white p-20'/>
                </div>
                <div className='flex flex-col g-10'>
                    <p>Username </p>
                    <div className='available'>
                        <p>Roy Theophilus</p>
                    </div>
                </div>
                <div className='flex flex-col g-10'>
                    <p>Amount to Withdraw</p>
                   <input type="text" placeholder='Input Amount'  className='w-full bg-white p-20'/>
                </div>
                <div className='flex flex-col g-10'>
                    <p>Remark</p>
                   <textarea name="remark" id="" cols="10" rows="3" placeholder='Transaction Remark' className='w-full bg-white p-20'></textarea>
                </div>
            </div>
        </form>
        <div className='flex g-40 justsb w-full '> 
            <button
                className="login-btn login w-full"
                // disabled={loading}
                type="submit"
                // onClick={handleLogin}
                >
                {/*  {loading ? <ButtonLoader /> : "Login"} */}
                Initiate
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
    </div>
  )
}
