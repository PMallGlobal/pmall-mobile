import React from 'react'
import CategoryHeader from '../components/CategoryHeader'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link } from 'react-router-dom';

export default function StockistMenu() {
  return (
    <div className='funds-withdraw s-menu'>
    <CategoryHeader title="Menu" image="true" />

    <div className='flex flex-col g-20 w-full '>
        <Link to="/stockist/dashboard" className='black'>
            <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                <div className='flex g-20 alc'>
                    <div className='bg-p'>
                        <DashboardOutlinedIcon />
                    </div>
                    <p>Dashboard</p>
                </div>
            </div>
        </Link>
        <Link to="/stockist/inventory-management" className='black'>
            <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                <div className='flex g-20 alc'>
                    <div className='bg-y'>
                        <FactCheckOutlinedIcon />
                    </div>
                    <p>Inventory Management</p>
                </div>
            </div>
        </Link>
        <Link to="/transaction-records" className='black'>
            <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                <div className='flex g-20 alc'>
                    <div className='bg-p'>  
                        <PaymentsOutlinedIcon />
                    </div>
                    <p>Transaction</p>
                </div>
            </div>
        </Link>
        <Link to="/stockist/logistics" className='black'>
            <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                <div className='flex g-20 alc'>
                    <div className='bg-y'>
                        <DeliveryDiningOutlinedIcon />
                    </div>
                    <p>Logistics and Delivery</p>
                </div>
            </div>
        </Link>
        <Link to="/stockist/order-management" className='black'>
            <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                <div className='flex g-20 alc'>
                    <div className='bg-p'>
                        <StorefrontOutlinedIcon />
                    </div>
                    <p>Store Management</p>
                </div>
            </div>
        </Link>
        <Link to="/stockist/statistics" className='black'>
            <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                <div className='flex g-20 alc'>
                    <div className='bg-y'>
                        <ShowChartOutlinedIcon />
                    </div>
                    <p>Report and Statistics</p>
                </div>
            </div>
        </Link>
        <Link to="/stockist/support" className='black'>
            <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                <div className='flex g-20 alc'>
                    <div className='bg-p'>
                        <HeadsetMicOutlinedIcon />
                    </div>
                    <p>Support</p>
                </div>
            </div>
        </Link>
        <Link to="/stockist/settings" className='black'>
            <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                <div className='flex g-20 alc'>
                    <div className='bg-y'>
                        <SettingsOutlinedIcon />
                    </div>
                    <p>Settings</p>
                </div>
            </div>
        </Link>
    </div>
</div>
  )
}
