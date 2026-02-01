import React, { useEffect, useState } from 'react'
import Titlenback from '../components/titlenback'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ProfileItemsCard from './ProfileItemsCard';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useUser } from '../context/UserContext';
import { useLogOut } from '../context/UserContext'

export default function Profile() {
    const logOut = useLogOut()
    const profileItems = [
        {
            image: "/images/Group 1000006043.png",
            title: "My Orders",
            link: "/orders"
        },
        {
            image: "/images/Group 1000006044.png",
            title: "Wishlist",
            link: "/wishlist"
        },
        {
            image: "/images/Group 1000006044 (1).png",
            title: "Ratings and review",
            link: "/ratings-and-reviews"
        },
        {
            image: "/images/Group 1000006044 (2).png",
            title: "Address",
            link: "/address"
        },
        {
            image: "/images/Group 1000006044 (3).png",
            title: "Change Password",
            link: "/change-password"
        },
        {
            image: "/images/Group 1000006044 (5).png",
            title: "Support Center",
            link: "/support"
        },
        {
            image: "/images/Group 1000006044 (7).png",
            title: "Rate Us",
            link: "/ratings-and-reviews"
        },
    ]
    const [profile, setProfile] = useState();
    const user = useUser();
    const getProfile = () => {
        fetch("https://stage.api.pmall.com.ng/api/v1/profile",{
            method: "GET",
            headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
        })
            .then((resp) => resp.json())
            .then((result) => {
            console.log(result.data.user);
            setProfile(result.data.user)
            })
            .catch((err) => {
            console.log(err);
            });
        };
        useEffect(()=>{
            getProfile()
          }, [])
    
  return (
    <div className='profile flex flex-col g-20'>
        <Titlenback title="Profile" />
        <div className='flex g-20 alc'>
            <div className='profile-img-container'>
                <img src="/images/Ellipse 280.png" alt="" />
                <div className='camera-icon'>
                    <CameraAltIcon className='cam' />
                </div>
            </div>
            <div className='name-email'>
                <h1 className='capitalize'>{profile?.fname} {profile?.lname}</h1>
                <p>{profile?.email}</p>
            </div>
        </div>
        <div className='flex flex-col g-20'>
            {profileItems.map((item) => (
             <ProfileItemsCard image={item.image} title={item.title} link={item.link} /> 
            ))}
             <div className='flex alc ProfileItemsCard g-20 pointer' onClick={logOut}>
                 <div>
                    <img src="/images/Group 1000006043 (1).png" alt="" />
                 </div>
                <p>Log out</p>
            </div>
             <div className='flex alc ProfileItemsCard g-20 pointer'>
                 <div className="delete-bg">
                    <DeleteOutlineOutlinedIcon className='delete' />
                 </div>
                <p className='delete-text'>Delete Account</p>
            </div>
        </div>
    </div>
  )
}
