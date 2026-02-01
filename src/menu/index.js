import React from 'react'
import CategoryHeader from '../components/CategoryHeader'

export default function Menu() {
  return (
    <div className='funds-withdraw'>
        <CategoryHeader title="Menu" />

        <div className='flex flex-col g-20 w-full '>
            <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                <div className='flex g-20 alc'>
                    <img src="/images/Connect.png" alt="" />
                    <p>Connect Store to Social Media</p>
                </div>
            </div>
            <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                <div className='flex g-20 alc'>
                    <img src="/images/Group 1000006044 (2).png" alt="" />
                    <p>Follow Our Page</p>
                </div>
            </div>
            <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                <div className='flex g-20 alc'>
                    <img src="/images/Group 1000006043 (1).png" alt="" />
                    <p>Log Out</p>
                </div>
            </div>
        </div>
    </div>
  )
}
