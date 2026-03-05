import React, { useState } from 'react'
import CategoryHeader from '../components/CategoryHeader'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useVendorr } from '../context/VendorSignupContext';
import { useVendor } from '../context/AuthContext';
import Toast from '../utils/Toast';

export default function Notifications() {
    const {notifications, getNotifications} = useVendorr()
    const [toast, setToast] = useState()
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
    const {
        setToastMsg,
        toastMsg,
        setToastType,
        toastType
      } = useVendor();

 const readNotifications = (id) => {
        fetch("https://api.pmall.com.ng/api/v1/user/notification/markedasread/" + id,{
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        })
          .then((resp) => resp.json())
          .then((result) => {
            setToastMsg(result.message)
            setToastType("success")
            getNotifications()
          })
          .catch((err) => {
            console.log(err);
            setToastMsg(err)
            setToastType("error")
          });
      };

  return (
    <div className='transaction-records notifs flex flex-col g-20'>
         <Toast message={toastMsg} type={toastType} onClose={() => setToast(null)} />
        <CategoryHeader title="Notifications" image="true"/>
        <div className='flex flex-col g-20'>
    
            {notifications?.map((record) =>(
                <div className={`bg-white rounded-sm p-10 flex alc justsb w-full pointer ${record.read  && "read-notif"}`}> 
                    <div className='flex alc g-20 w-full' onClick={()=>readNotifications(record.id)}>
                        <div className='bg-p'>
                            <NotificationsOutlinedIcon />
                        </div>
                        <div className='w-full flex flex-col g-5'>
                            <p className='name'>{record.name}</p>
                            <div className='flex w-full justsb'>
                                <p className='msg'>{record.message}</p>
                                <p className='time'>{record.created_at} </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
