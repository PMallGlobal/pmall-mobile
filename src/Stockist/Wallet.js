import React from 'react'
import CategoryHeader from '../components/CategoryHeader'

export default function Wallet() {
  return (
    <div className='funds-withdraw'>
    <CategoryHeader title="Wallet" image="true" />

    <div className='flex flex-col g-20 w-full '>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Connect.png" alt="" />
                <p>Total Earnings</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Group 1000006044 (2).png" alt="" />
                <p>Withdrawal Request</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Connect.png" alt="" />
                <p>Pending Payouts</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Group 1000006044 (2).png" alt="" />
                <p>Commission Summary</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Connect.png" alt="" />
                <p>Transaction History</p>
            </div>
        </div>
    </div>
</div>
  )
}
