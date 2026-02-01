import React from 'react'
import CategoryHeader from '../components/CategoryHeader'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Link } from 'react-router-dom';

export default function AffiliateManagement() {
  return (
    <div className='funds-withdraw'>
        <CategoryHeader title="Affiliate Management" image="true" />

        <div className='flex flex-col g-20 w-full '>
            <Link to="/affiliate/my-affiliates"  className='black'>
                <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                    <div className='flex g-20 alc'>
                        <img src="/images/withdraw.png" alt="" />
                        <p>My Affiliate</p>
                    </div>
                    <ArrowForwardIosOutlinedIcon className='right-arr' />
                </div>
            </Link>
            <Link to="/affiliate/my-vendors"  className='black'>
                <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                    <div className='flex g-20 alc'>
                        <img src="/images/transfer.png" alt="" />
                        <p>My Vendors</p>
                    </div>
                    <ArrowForwardIosOutlinedIcon  className='right-arr' />
                </div>
            </Link>
        </div>
    </div>
  )
}
