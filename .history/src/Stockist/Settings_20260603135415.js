import React from 'react'
import CategoryHeader from '../components/CategoryHeader'

export default function Settings() {
  return (
    <div className='funds-withdraw'>
    <CategoryHeader title="Settings" image="true" />

    <div className='flex flex-col g-20 w-full '>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Connect.png" alt="" />
                <p>Profile Info</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Group 1000006044 (2).png" alt="" />
                <p>Bank Details</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Connect.png" alt="" />
                <p>Change Password/Pin</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Group 1000006044 (2).png" alt="" />
                <p>Notification Preferences</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Connect.png" alt="" />
                <p>Two Factor Authentication</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Connect.png" alt="" />
                <p>Logout</p>
            </div>
        </div>
    </div>
</div>
  )
}
