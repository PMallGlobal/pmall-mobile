import React from 'react'
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
import MoneyOutlinedIcon from '@mui/icons-material/MoneyOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CategoryHeader from '../components/CategoryHeader';
import { Link } from 'react-router-dom';

export default function OrderManagement() {
  return (
    <div className='funds-withdraw s-menu'>
    <CategoryHeader title="Order Management" image="true" />

    <div className='flex flex-col g-20 w-full '>
        <Link to="/stockist/orders" className='black'>
            <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                <div className='flex g-20 alc'>
                    <div className='bg-p'>
                        <LocalMallOutlinedIcon />
                    </div>
                    <p>All Orders</p>
                </div>
            </div>
        </Link>
        <Link to="/stockist/order/tracking" className='black'>
            <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                <div className='flex g-20 alc'>
                    <div className='bg-y'>
                        <LocationSearchingOutlinedIcon />
                    </div>
                    <p>Order Tracking</p>
                </div>
            </div>
        </Link>
        <Link to="/stockist/order/assign-to-dispatch" className='black'>
            <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                <div className='flex g-20 alc'>
                    <div className='bg-p'>  
                        <Person4OutlinedIcon />
                    </div>
                    <p>Assign Order to Dispatch</p>
                </div>
            </div>
        </Link>
        <Link to="/stockist/refund" className='black'>
            <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                <div className='flex g-20 alc'>
                    <div className='bg-y'>
                        <MoneyOutlinedIcon />
                    </div>
                    <p>Refund and Replacement Request</p>
                </div>
            </div>
        </Link>
        <Link to="/stockist/wallet" className='black'>
            <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                <div className='flex g-20 alc'>
                    <div className='bg-p'>
                        <ReceiptOutlinedIcon />
                    </div>
                    <p>Print Invoice</p>
                </div>
            </div>
        </Link>
        <Link to="/stockist/analytics" className='black'>
            <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                <div className='flex g-20 alc'>
                    <div className='bg-y'>
                        <TrendingUpOutlinedIcon />
                    </div>
                    <p>Analytics</p>
                </div>
            </div>
        </Link>
    </div>
</div>
  )
}
