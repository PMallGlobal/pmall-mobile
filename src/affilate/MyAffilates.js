import React, { useEffect, useState } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CategoryHeader from '../components/CategoryHeader';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Link } from 'react-router-dom';
import Toast from '../utils/Toast';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';



export default function MyAffilates() {
    const [affilates, setAffilates] = useState()
    const orders = [
        {
          id: 1,
          name: "CARICH Cool Algal Fluoride-Free Toothpaste",
          image: "https://api.pmall.com.ng/storage/productImages/40_1759017056.png",
          category_name: "PERSONAL CARE",
          order_number: "02080909",
          date_delivered: "20-10-2025",
          delivered: true,
        },
        {
          id: 67,
          name: "Wireless Bluetooth Headphones Pro",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
          category_name: "ELECTRONICS",
          order_number: "02080909",
          date_delivered: "20-10-2025",
          delivered: true,
        },
        {
          id: 89,
          name: "Organic Cotton T-Shirt – Black",
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
          category_name: "FASHION",
          order_number: "02080909",
          date_delivered: "20-10-2025",
          delivered: true,
        },
        {
          id: 124,
          name: "Smart LED Bulb – 10W RGB",
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
          category_name: "HOME & LIVING",
          order_number: "02080909",
          date_delivered: "20-10-2025",
          delivered: true,
        },
        {
          id: 203,
          name: "Premium Stainless Steel Water Bottle 1L",
          image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800",
          category_name: "KITCHEN & DINING",
          order_number: "02080909",
          date_delivered: "20-10-2025",
          delivered: true,
        }
      ];
      const [toast, setToast] = useState()
      
      const getAffilates = () => {
        fetch("https://api.pmall.com.ng/api/v1/get-all-affiliates",{
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
            setAffilates(result.data.affiliates)
          })
          .catch((err) => {
            console.log(err);
          });
      };

      useEffect(()=>{
        getAffilates()
      },[])
  return (
    <div className='my-vendors ratings'>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <CategoryHeader title="My Affilates" image="true" />
        {/* <div className=' add-addy'>
            <Link to="/affiliate/add-affiliate">
                <div className='flex g-10 alc new-addy pointer'>
                    <AddCircleOutlineOutlinedIcon />
                    <p>Add Account</p>
                </div>
            </Link>
        </div> */}
        {affilates?.length > 0 ?
        <div className='flex flex-col g-20' >
            {affilates?.map((item)=>(
               <div className=' flex bg-white p-20 g-40 my-vendors alc'>
                    <div>
                        {/* <img src="/images/Ellipse 280.png" alt="" /> */}
                        <AccountCircleOutlinedIcon className='pfp' />
                    </div>
                    <div className='flex flex-col g-10 w-full'>
                        <p className='name'>{item?.username} </p>
                        <h3 className='capitalize'>{item?.fname} {item?.lname} </h3>
                        <p className='email'>{item?.email} </p>
                        <div className='edit-delete flex justsb w-full'>
                            <p className='num'>{item?.phone} </p>
                            <div className='flex g-10'>
                                <div className='edit'>
                                    <ModeEditOutlinedIcon />
                                </div>
                                <div className='delete'>
                                    <DeleteOutlineOutlinedIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='delivered-btn '>
                    {item?.is_active ? <p>Active</p> : <p>Inactive</p>}
                    </div>
                </div>
            ))}
        </div> :
        <p className='w-full flex all-center'>You have no affiliates yet</p>
      }
       <Link to="/affiliate/add-affiliate">
          <div className="add-product">
              <AddOutlinedIcon />
          </div>
        </Link>
    </div>
  )
}
