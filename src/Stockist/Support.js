import React from 'react'
import CategoryHeader from '../components/CategoryHeader'

export default function Support() {
  return (
    <div className='funds-withdraw'>
    <CategoryHeader title="Support" image="true" />

    <div className='flex flex-col g-20 w-full '>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Connect.png" alt="" />
                <p>In-app Chat</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Group 1000006044 (2).png" alt="" />
                <p>Notification Center</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Connect.png" alt="" />
                <p>Order Updates</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Group 1000006044 (2).png" alt="" />
                <p>Payment Alerts</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Connect.png" alt="" />
                <p>System Announcements</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Group 1000006044 (2).png" alt="" />
                <p>Support Ticket System</p>
            </div>
        </div>
        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
            <div className='flex g-20 alc'>
                <img src="/images/Connect.png" alt="" />
                <p>Customer Engineering</p>
            </div>
        </div>
    </div>
</div>
  )
}
