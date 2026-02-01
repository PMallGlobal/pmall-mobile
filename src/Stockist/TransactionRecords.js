import React from 'react'
import CategoryHeader from '../components/CategoryHeader'

export default function TransactionRecords() {
    const records = [
        {
            name: "Chidex09",
            package: "Package Upgrade",
            price: 2500.00,
            date: "08-07-2025",
            time: "17:35"
        },
        {
            name: "Chidex09",
            package: "Package Upgrade",
            price: 2500.00,
            date: "08-07-2025",
            time: "17:35"
        },
        {
            name: "Chidex09",
            package: "Package Upgrade",
            price: 2500.00,
            date: "08-07-2025",
            time: "17:35"
        },
        {
            name: "Chidex09",
            package: "Package Upgrade",
            price: 2500.00,
            date: "08-07-2025",
            time: "17:35"
        },
        {
            name: "Chidex09",
            package: "Package Upgrade",
            price: 2500.00,
            date: "08-07-2025",
            time: "17:35"
        },
        {
            name: "Chidex09",
            package: "Package Upgrade",
            price: 2500.00,
            date: "08-07-2025",
            time: "17:35"
        },
    ]
  return (
    <div className='transaction-records flex flex-col g-20'>
        <CategoryHeader title="Transaction Records" image="true" search="true" />
        <div className='flex flex-col g-20'>
            {records.map((record)=>(
                <div className='bg-white rounded-sm p-10 flex alc justsb'> 
                    <div className='flex alc g-10'>
                        <div className='bg-p'>
                            <img src="/images/uil_transaction.png" alt="" />
                        </div>
                        <div>
                            <p className='name'>{record.name}</p>
                            <p className='package'>{record.package}</p>
                        </div>
                    </div>
                    <div>
                        <p className='price'>{record.price}</p>
                        <div className='flex date-time'>
                            <p >{record.date}</p>
                            <p>{record.time}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
