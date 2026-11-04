import React, { useEffect, useState } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CategoryHeader from '../components/CategoryHeader';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Toast from '../utils/Toast';


export default function MyVendors() {
    const [vendors, setVendors] = useState()
  
      const [toast, setToast] = useState()
      const getVendors = () => {
        fetch("https://api.pmall.com.ng/api/v1/get-all-vendors",{
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
            setVendors(result.data.vendors)
          })
          .catch((err) => {
            console.log(err);
          });
      };

      useEffect(()=>{
        getVendors()
      },[])
    
  return (
    <div className='my-vendors ratings'>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <CategoryHeader title="My Vendors" image="true" />
        {/* <div className=' add-addy'>
            <Link to="/add-vendor">
                <div className='flex g-10 alc new-addy pointer'>
                    <AddCircleOutlineOutlinedIcon />
                    <p>Add Account</p>
                </div>
            </Link>
        </div> */}
        {vendors?.length > 0 ?
          <div className='flex flex-col g-20' >
              {vendors?.map((item)=>(
                <div className=' flex bg-white p-20 g-40 my-vendors alc'>
                      <div className=''>
                          {/* <img src="/images/Ellipse 280.png" alt="" /> */}
                          <AccountCircleOutlinedIcon className='pfp' />
                      </div>
                      <div className='flex flex-col g-10 w-full'>
                          <p className='name uppercase'>{item.store_name}</p>
                          <h3 className='capitalize'>{item.fname} {item.lname} (N/A)</h3>
                          <p className='email'>{item.email}</p>
                          <div className='edit-delete flex justsb w-full'>
                              <p className='num'>{item.phone}</p>
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
                          <p>Active</p>
                      </div>
                  </div>
              ))}
          </div> :
          <p className='w-full flex all-center'>You have no vendors yet</p>
          }
        <Link to="/add-vendor">
          <div className="add-product">
              <AddOutlinedIcon />
          </div>
        </Link>
    </div>
  )
}
