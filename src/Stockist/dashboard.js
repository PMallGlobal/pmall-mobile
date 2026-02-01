import React from 'react'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Footer from '../components/footer';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

export default function StockistDashboard() {
    const user = useUser();
  return (
    <div className='dashboard stockist'>
        <div className='flex justsb alc stockist-head'>
            <div className='flex flex-col g-10'>
                <p className='greet'>Hello,</p>
                <p className='s-name uppercase'>{user.user.fname} (Mega Stockist)</p>
            </div>
            <div className='flex alc g-20 '>
                <img src="/images/Ellipse 280.png" alt="" />
            </div>
        </div>
        <div className='flex justsb alc balance-card'>
            <div className='flex flex-col just-sb g-40'>
                <p>Shop Bonus</p>
                <h2>NGN 23,900,650.45</h2>
            </div>
            <div className='wallet-ic'>
                <AccountBalanceWalletIcon className='ic' />
            </div>
        </div>
        <div className='db-cards'>
            <div className='flex alc db-card bg-white justsb p-20'>
                <div className='flex flex-col justsb h-full g-20'>
                    <p>New Orders</p>
                    <h2>6</h2>
                </div>
                <div className='bg-y'>
                    <img src="/images/lsicon_order-outline.png" alt="" />
                </div>
            </div>
            <div className='flex alc db-card bg-white justsb p-20'>
                <div className='flex flex-col justsb h-full g-20'>
                    <p>Stock Inventory</p>
                    <h2>300</h2>
                </div>
                <div className='bg-p'>
                    <img src="/images/si_inventory-line.png" alt="" />
                </div>
            </div>
            <div className='flex alc db-card bg-white justsb p-20'>
                <div className='flex flex-col justsb h-full g-20'>
                    <p>Track Shipment</p>
                    <h2>26</h2>
                </div>
                <div className='bg-p'>
                    <img src="/images/streamline-ultimate_shipment-online-monitor-1.png" alt="" />
                </div>
            </div>
            <div className='flex alc db-card bg-white justsb p-20'>
                <div className='flex flex-col justsb h-full g-20'>
                    <p>PMT Wallet</p>
                    <h2>0.00</h2>
                </div>
                <div className='bg-y'>
                    <img src="/images/streamline-plump_wallet-solid.png" alt="" />
                </div>
            </div>
        </div>
        <div className='flex flex-col  g-20 links'>
            <p>Products Collection</p>
            <div className=''>
                <div className='flex flex-col g-20 w-full '>
                    <Link to="/stockist/statistics" className='black'>
                        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                            <div className='flex g-20 alc'>
                                <div className='bg-p'>
                                    <img src="/images/wpf_statistics.png" alt="" />
                                </div>
                                <p>Statistics/ Store Activities</p>
                            </div>
                            <ArrowForwardIosOutlinedIcon className='right-arr' />
                        </div>
                    </Link>
                    <Link to="/stockist/available-stock"  className='black'>
                        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                            <div className='flex g-20 alc'>
                                <div className='bg-y'>
                                    <img src="/images/tdesign_store-filled.png" alt="" />
                                </div>
                                <p>Store Manager</p>
                            </div>
                            <ArrowForwardIosOutlinedIcon  className='right-arr' />
                        </div>
                    </Link>
                    <Link to="/stockist/refund"  className='black'>
                        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                            <div className='flex g-20 alc'>
                                <div className='bg-p'>
                                    <img src="/images/mdi_cash-refund.png" alt="" />
                                </div>
                                <p>Refund</p>
                            </div>
                            <ArrowForwardIosOutlinedIcon  className='right-arr' />
                        </div>
                    </Link>
                    <Link to="/notifications"  className='black'>
                        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                            <div className='flex g-20 alc'>
                                <div className='bg-y'>
                                    <img src="/images/mdi_bell-notification-outline.png" alt="" />
                                </div>
                                <p>Notification</p>
                            </div>
                            <ArrowForwardIosOutlinedIcon className='right-arr' />
                        </div>
                    </Link>
                    <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                        <div className='flex g-20 alc'>
                            <img src="/images/Group 1000006043 (1).png" alt="" className='log-out' />
                            <p>Exit Shop</p>
                        </div>
                        <ArrowForwardIosOutlinedIcon  className='right-arr' />
                    </div>
                </div>
            </div>
        </div>
        <Footer vendorIn={false} stockist={true} />  
    </div>
  )
}
