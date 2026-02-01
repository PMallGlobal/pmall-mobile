import React from 'react'

export default function TransactionSummary() {
  return (
    <div className='w-full bg-white p-20 transaction-summary flex flex-col g-20'>
        <p className='bold'>Transaction Summary</p>
        <div className='summary-items flex flex-col g-20'>
            <div className='summary-item flex alc justsb'>
                <div className='flex alc g-10'>
                    <div className='name-ic'>
                        <p className='purple'>RP</p>
                    </div>
                    <div className=' flex flex-col g-10'>
                        <p>Temitope Patience Umaru</p>
                        <p className='bank'>1234567890 PMall Bank</p>
                    </div>
                </div>
                <p className='purple'>Change</p>
            </div> 
            <div className='summary-item flex alc justsb h-50'>
                <p className=''>Amount</p>
                <p className='purple'>N 20,000</p>
            </div> 
            <div className='summary-item flex alc justsb h-50'>
                <p className=''>Charges</p>
                <p className='purple'>N 26</p>
            </div> 
            <div className='summary-item flex alc justsb h-50'>
                <p className=''>Narration</p>
                <p className='purple'>Token</p>
            </div>
        </div>
        <div className='flex g-40 justsb w-full '> 
            <button
                className="login-btn login w-full"
                // disabled={loading}
                type="submit"
                // onClick={handleLogin}
                >
                {/*  {loading ? <ButtonLoader /> : "Login"} */}
                Proceed
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
