import React from 'react'
import CategoryHeader from '../components/CategoryHeader'

export default function Logistics() {
  return (
    <div className='funds-withdraw'>
    <CategoryHeader title="Logistics and Delivery" image="true" />

    <div className='flex flex-col g-20 w-full '>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Connect.png" alt="" />
                <p>Add Delivery</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Group 1000006044 (2).png" alt="" />
                <p>Delivery Partner List</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Connect.png" alt="" />
                <p>Assign Order to Dispatch</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Group 1000006044 (2).png" alt="" />
                <p>Track Shipment</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Connect.png" alt="" />
                <p>Delivery Status Update</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Group 1000006044 (2).png" alt="" />
                <p>Dispatch Report</p>
            </div>
        </div>
    </div>
</div>
  )
}
