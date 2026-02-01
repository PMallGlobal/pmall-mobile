import React, { useEffect, useState } from 'react'
import CategoryHeader from '../components/CategoryHeader'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import Toast from '../utils/Toast';

export default function VendorProfile() {
    const user= useUser()
    console.log(user)
    const [profile, setProfile] = useState()
    const [copied, setCopied] = useState(false);
    const [toast, setToast] = useState()

    const copyToClipboard = (text) => {
    
        if (!text) return;
    
        navigator.clipboard.writeText(text)
          .then(() => {
            setCopied(true);
            // Reset "Copied!" after 2 seconds
            setTimeout(() => setCopied(false), 2000);
            setToast({
                message:"Copied to clipboard",
                type: "success"
            })
          })
          .catch((err) => {
            console.error("Failed to copy:", err);
          });
      };
      
    function formatRegDate(isoDate) {
        if (!isoDate) return "—";
      
        const date = new Date(isoDate);
      
        return new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }).format(date);

      }

      const getProfileDetails = () => {
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
            console.log(result);
            setProfile(result.data.user)
          })
          .catch((err) => {
            console.log(err);
          });
      };

      useEffect(()=>{
        getProfileDetails()
      },[])
  return (
    <div className='vendor-profile'>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <CategoryHeader title="My Profile" />
        <div className='flex w-full all-center'>
            <div className='profile-img-container '>
                <img src="/images/Ellipse 280.png" alt="" />
                <div className='cam-container'>
                    <div className='camera-icon'>
                        <CameraAltIcon className='cam' />
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col g-20'>
            <div className='flex justsb'>
                <p className='bold'>Profile Information</p>
                <Link to="/edit-profile">
                    <div className='flex alc bg-white edit-profile-btn g-10 pointer'>
                        <EditOutlinedIcon className='edit-ic' />
                        <p>Edit Profile</p>
                    </div>
                </Link>
            </div>
            <div className='bg-white p-20 w-full profile-info flex flex-col g-20'>
                <div className='flex justsb profile-item'>
                    <p className='title'>Name</p>
                    <div className='flex g-10 alc'>
                        <p className='detail bold capitalize'>{profile?.fname} {profile?.lname}</p>
                        <div className='vendor-tag'>
                            <p className='bold uppercase'>{profile?.user_type}</p>
                        </div>
                    </div>
                </div>
                {user.accountType == "Vendor" &&
                <div className='flex justsb profile-item'>
                    <p  className='title'>Store Name</p>
                    <p  className='detail bold'>{profile?.storeName || "N/A"}</p>
                </div>
                }
                <div className='flex justsb profile-item'>
                    <p  className='title'>Username</p>
                    <p  className='detail bold'>{profile?.username}</p>
                </div>
                <div className='flex justsb profile-item'>
                    <p  className='title'>Email</p>
                    <p  className='detail bold'>{profile?.email}</p>
                </div>
                <div className='flex justsb profile-item'>
                    <p  className='title'>Telephone</p>
                    <p  className='detail bold'>{profile?.phone || "N/A"}</p>
                </div>
                <div className='flex justsb profile-item'>
                    <p  className='title'>Referral ID</p>
                    <div className='flex alc g-5'>
                        <p className='summ-right bold'>{profile?.my_ref_id}</p>
                        <ContentCopyOutlinedIcon className='copy  pointer' onClick={()=>copyToClipboard(profile?.my_ref_id)} />
                    </div>
                </div>
                <div className='flex justsb profile-item'>
                    <p  className='title'>Account Type</p>
                    <p  className='detail bold'>{profile?.acct_type || "N/A"}</p>
                </div>
                <div className='flex justsb profile-item'>
                    <p  className='title'>Package Type</p>
                    <p  className='detail bold'>{profile?.package_id == "1" || profile?.package_id ==  "2" || profile?.package_id ==  "3" ?  "Affilate" : "Vendor"}</p>
                </div>
                {user.user.accountType == "Vendor" &&
                    <div className='flex justsb profile-item'>
                        <p  className='title'>Store ID</p>
                        <div className='flex alc g-5'>
                            <p className='summ-right bold'>{profile?.store_id}</p>
                            <ContentCopyOutlinedIcon className='copy pointer' onClick={()=>copyToClipboard(profile?.store_id)} />
                        </div>
                    </div>
                }
                <div className='flex justsb profile-item'>
                    <p  className='title'>Account Name</p>
                    <p  className='detail bold'>{profile?.acct_name}</p>
                </div>
                <div className='flex justsb profile-item'>
                    <p  className='title'>Account Number</p>
                    <p  className='detail bold'>{profile?.acct_number}</p>
                </div>
                <div className='flex justsb profile-item'>
                    <p  className='title'>Bank Name</p>
                    <p  className='detail bold'>{profile?.bank}</p>
                </div>
                <div className='flex justsb profile-item'>
                    <p  className='title'>State</p>
                    <p  className='detail bold'>{profile?.state}</p>
                </div>
                <div className='flex justsb profile-item'>
                    <p  className='title'>L.G.A</p>
                    <p  className='detail bold'>{profile?.lga}</p>
                </div>
                <div className='flex justsb profile-item'>
                    <p  className='title'>Member Since</p>
                    <p  className='detail bold purple'>{formatRegDate(profile?.created_at)}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
