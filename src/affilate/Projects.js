import React from 'react'

export default function Projects() {
  return (
    <div className='projects flex flex-col g-40'>
        <div className='flex alc g-20'>
            <img src="/images/Ellipse 330.png" alt="" />
            <div className='flex flex-col g-10'>
                <h3 className='name'>Zain Ahmed</h3>
                <p className='business'>Halal Lab</p>
                <div className='created flex alc g-10'>
                    <p className='p1'>Created By:</p>
                    <p className='p2'>Nijum Chy 03/14/2021</p>
                </div>
            </div>
        </div>
        <div className='flex flex-col g-20 cust-inf'>
            <h3>Customer Info</h3>
            <div>
                <div className='flex justsb p-20 bb'>
                    <p className='p1'>Work Email</p>
                    <p className='p2'>linusro@gmail.com</p>
                </div>
                <div className='flex justsb p-10 bb'>
                    <p className='p1'>Personal Email</p>
                    <p className='p2'>linusro@gmail.com</p>
                </div>
                <div className='flex justsb p-10 bb'>
                    <p className='p1'>Work</p>
                    <p className='p2'>01234078981</p>
                </div>
                <div className='flex justsb p-10 bb'>
                    <p className='p1'>Personal</p>
                    <p className='p2'>01234078981</p>
                </div>
                <div className='flex justsb p-10 bb'>
                    <p className='p1'>Lead Source</p>
                    <p className='p2'>Facebook Ads</p>
                </div>
            </div>
        </div>

    </div>
  )
}
