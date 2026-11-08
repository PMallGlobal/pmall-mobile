import React from 'react'
import CategoryHeader from '../components/CategoryHeader'

export default function Statistics() {
  return (
    <div className='funds-withdraw'>
    <CategoryHeader title="Statistics Report and Analytics" image="true" />

    <div className='flex flex-col g-20 w-full '>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Connect.png" alt="" />
                <p>Delivering</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Group 1000006044 (2).png" alt="" />
                <p>Earning</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Connect.png" alt="" />
                <p>Communications/Report</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Group 1000006044 (2).png" alt="" />
                <p>Returns and Refund</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Connect.png" alt="" />
                <p>Dispatch Report</p>
            </div>
        </div>
    </div>
</div>
  )
}
