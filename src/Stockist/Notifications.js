import React from 'react'
import CategoryHeader from '../components/CategoryHeader'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

export default function Notifications() {
    const records = [
        {
            date: "Today",
            details:[
                {
                    name: "New Chat",
                    msg: "Jenny Loppeez sent you a message",
                    time: "24"
                },
                {
                    name: "New Chat",
                    msg: "Jenny Loppeez sent you a message",
                    time: "24"
                },
                {
                    name: "New Chat",
                    msg: "Jenny Loppeez sent you a message",
                    time: "24"
                },
                {
                    name: "New Chat",
                    msg: "Jenny Loppeez sent you a message",
                    time: "24"
                },
                {
                    name: "New Chat",
                    msg: "Jenny Loppeez sent you a message",
                    time: "24"
                },
                {
                    name: "New Chat",
                    msg: "Jenny Loppeez sent you a message",
                    time: "24"
                },
            ]
        },
        {
            date: "28 Aug, 2024",
            details:[
                {
                    name: "New Chat",
                    msg: "Jenny Loppeez sent you a message",
                    time: "24"
                },
                {
                    name: "New Chat",
                    msg: "Jenny Loppeez sent you a message",
                    time: "24"
                },
                {
                    name: "New Chat",
                    msg: "Jenny Loppeez sent you a message",
                    time: "24"
                },
                {
                    name: "New Chat",
                    msg: "Jenny Loppeez sent you a message",
                    time: "24"
                },
                {
                    name: "New Chat",
                    msg: "Jenny Loppeez sent you a message",
                    time: "24"
                },
                {
                    name: "New Chat",
                    msg: "Jenny Loppeez sent you a message",
                    time: "24"
                },
            ]
        }
    ]
  return (
    <div className='transaction-records notifs flex flex-col g-20'>
        <CategoryHeader title="Notificationa" image="true"/>
        <div className='flex flex-col g-20'>
            {records.map((record) => (
                <div className='flex flex-col g-20'>
                    <p className='date'>{record.date}</p>
                    <div className='flex flex-col g-20'>
                        {record.details.map((record)=>(
                            <div className='bg-white rounded-sm p-10 flex alc justsb w-full'> 
                                <div className='flex alc g-20 w-full'>
                                    <div className='bg-p'>
                                        <NotificationsOutlinedIcon />
                                    </div>
                                    <div className='w-full flex flex-col g-5'>
                                        <p className='name'>{record.name}</p>
                                        <div className='flex w-full justsb'>
                                            <p className='msg'>{record.msg}</p>
                                            <p className='time'>{record.time} mins ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
