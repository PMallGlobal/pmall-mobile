import React, { useState } from 'react'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Footer from '../components/footer';
import { useLogOut, useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import Toast from '../utils/Toast';

export default function AffilateDashboard() {
    const user = useUser();
    const logOut = useLogOut();
    const [toast, setToast] = useState()

  return (
    <div className='dashboard '>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <div className='flex justsb alc'>
            <img src="/images/new PMALL logo.png" alt="" className='logo' />
            <div className='flex alc g-20 d-profile'>
                <div>
                    <h2 className='uppercase'>{user.user.fname} {user.user.lname}</h2>
                    <p>{user.user.storeId}</p>
                </div>
                <img src="/images/Ellipse 280.png" alt="" />
            </div>
        </div>
        <div className='flex justsb alc balance-card'>
            <div className='flex flex-col just-sb g-40'>
                <p>Wallet Balance</p>
                <h2>NGN 23,900,650.45</h2>
            </div>
            <div className='wallet-ic'>
                <AccountBalanceWalletIcon className='ic' />
            </div>
        </div>
        <div className='db-cards'>
            <div className='flex alc db-card bg-white justsb p-20'>
                <div className='flex flex-col justsb h-full g-20'>
                    <p>My Vendors</p>
                    <h2>6</h2>
                </div>
                <div className='bg-y'>
                    <img src="/images/user_17742912.png" alt="" />
                </div>
            </div>
            <div className='flex alc db-card bg-white justsb p-20'>
                <div className='flex flex-col justsb h-full g-20'>
                    <p>Point Value</p>
                    <h2>2</h2>
                </div>
                <div className='bg-p'>
                    <img src="/images/increasing_5329515.png" alt="" />
                </div>
            </div>
            <div className='flex alc db-card bg-white justsb p-20'>
                <div className='flex flex-col justsb h-full g-20'>
                    <p>My Affilates</p>
                    <h2>20</h2>
                </div>
                <div className='bg-p'>
                    <img src="/images/teamwork_5494589.png" alt="" />
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
            <p>Quick Links</p>
            <div className=''>
                <div className='flex flex-col g-20 w-full '>
                    <Link to="/affilate/my-affilates" className='black'>
                        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                            <div className='flex g-20 alc'>
                                <div className='bg-p'>
                                    <img src="/images/teamwork_5494589.png" alt="" />
                                </div>
                                <p>My Affilates</p>
                            </div>
                            <ArrowForwardIosOutlinedIcon className='right-arr' />
                        </div>
                    </Link>
                    <Link to="/affilate/my-vendors" className='black'>
                        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                            <div className='flex g-20 alc'>
                                <div className='bg-y'>
                                    <img src="/images/user_17742912.png" alt="" />
                                </div>
                                <p>My Vendors</p>
                            </div>
                            <ArrowForwardIosOutlinedIcon  className='right-arr' />
                        </div>
                    </Link>
                    <Link to="/affilate/genealogy" className='black'>
                        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                            <div className='flex g-20 alc'>
                                <div className='bg-p'>
                                    <img src="/images/icomoon-free_tree.png" alt="" />
                                </div>
                                <p>Genealogy</p>
                            </div>
                            <ArrowForwardIosOutlinedIcon  className='right-arr' />
                        </div>
                    </Link>
                    <Link to="/withdraw-funds" className='black'>
                        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                            <div className='flex g-20 alc'>
                                <div className='bg-y'>
                                    <img src="/images/y-card.png" alt="" />
                                </div>
                                <p>Fund Withdrawal</p>
                            </div>
                            <ArrowForwardIosOutlinedIcon className='right-arr' />
                        </div>
                    </Link>
                    <Link to="/" className='black'>
                        <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                            <div className='flex g-20 alc'>
                                <div className='bg-p'>
                                    <img src="/images/streamline-flex_bag-suitcase-4-remix.png" alt="" />
                                </div>
                                <p>Back to Mall</p>
                            </div>
                            <ArrowForwardIosOutlinedIcon className='right-arr' />
                        </div>
                        </Link>
                    <div className='flex w-full justsb alc bg-white p-10 rounded-sm'  onClick={logOut}>
                        <div className='flex g-20 alc'>
                            <img src="/images/Group 1000006043 (1).png" alt="" className='log-out' />
                            <p>Log Out</p>
                        </div>
                        <ArrowForwardIosOutlinedIcon  className='right-arr' />
                    </div>
                </div>
            </div>
        </div>
        <Footer vendorIn={true} />  
    </div>
  )
}
