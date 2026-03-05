import React, { useState, useEffect } from 'react'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Footer from '../components/footer';
import { useUser, useLogOut} from "../context/UserContext";
import { Link } from 'react-router-dom';
import { useVendorr } from '../context/VendorSignupContext';
import { BASE_URL } from '../utils/config';
import { useVendor } from '../context/AuthContext';

export default function Dashboard() {
    const {user} = useUser()
    const logOut = useLogOut();
    console.log(user)
    const { vendorProductAmt, wallet, orderAmt} = useVendorr();
    const [vendorCount, setVendorCount] = useState(0)
    const [affiliateCount, setAffiliateCount] = useState(0)
    const [allDownlines, setAllDownlines] = useState(null);
    const { loading, setLoading, setProfileDetails } = useVendor();
    const [vendorIn, setVendorIn] = useState(true)

    const addCommasToNumberString = (numberString) =>{
    return  numberString?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
    }

      const getMyNetwork = () => {
        setLoading(true);
        fetch(`${BASE_URL}/profile/hierarchy-all-downline`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: "Bearer " + user?.token,
            },
        })
            .then((resp) => resp.json())
            .then((result) => {
        console.log(result.data)
        setAffiliateCount(result?.data?.allDownline.reduce((count, item) => item.user_type === "Affiliate" ? count + 1 : count, 0));
        setVendorCount(result?.data?.allDownline.reduce((count, item) => item.user_type === "Vendor" ? count + 1 : count, 0));
                setAllDownlines(result?.data?.allDownline || []);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
        if(user.accountType == "Vendor"){
            setVendorIn(true)
        }else{
            setVendorIn(false)
        }
    };

      useEffect(()=>{
        getMyNetwork()
      },[])

  return (
    <div className='dashboard '>
        <div className='flex justsb alc'>
            <img src="/images/new PMALL logo.png" alt="" className='logo' />
            <div className='flex alc g-20 d-profile'>
                <div className='uppercase'>
                    <h2>{user?.fname} {user.lname}</h2>
                    <p>{user?.accountType}</p>
                </div>
                <img src={user?.userAvatar} alt="" />
            </div>
        </div>
        <div className='flex justsb alc balance-card'>
            <div className='flex flex-col just-sb g-40'>
                <p>Wallet Balance</p>
                <h2>NGN {addCommasToNumberString(wallet?.amount)}</h2>
            </div>
            <div className='wallet-ic'>
                <AccountBalanceWalletIcon className='ic' />
            </div>
        </div>
        {user?.accountType == "Vendor" ? 
            <div className="flex flex-col g-40">
                <div className='db-cards'>
                    <div className='flex alc db-card bg-white justsb p-20'>
                        <div className='flex flex-col justsb h-full g-20'>
                            <p>All Orders</p>
                            <h2>{orderAmt}</h2>
                        </div>
                        <div className='bg-y'>
                            <img src="/images/shopping-bag_17390063.png" alt="" />
                        </div>
                    </div>
                    <div className='flex alc db-card bg-white justsb p-20'>
                        <div className='flex flex-col justsb h-full g-20'>
                            <p>Total Sales</p>
                            <h2>{wallet?.pv}</h2>
                        </div>
                        <div className='bg-p'>
                            <img src="/images/increasing_5329515.png" alt="" />
                        </div>
                    </div>
                    <div className='flex alc db-card bg-white justsb p-20'>
                        <div className='flex flex-col justsb h-full g-20'>
                            <p>Products</p>
                            <h2>{vendorProductAmt}</h2>
                        </div>
                        <div className='bg-p'>
                            <img src="/images/cubes_2875916.png" alt="" />
                        </div>
                    </div>
                    <div className='flex alc db-card bg-white justsb p-20'>
                        <div className='flex flex-col justsb h-full g-20'>
                            <p>PMT Wallet</p>
                            <h2>{wallet?.pmt}</h2>
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
                            <Link to={`/vendor/${user?.storeId}`}   className='black'>
                                <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                                    <div className='flex g-20 alc'>
                                        <div className='bg-p'>
                                            <img src="/images/mdi_store-marker.png" alt="" />
                                        </div>
                                        <p>My Store</p>
                                    </div>
                                    <ArrowForwardIosOutlinedIcon className='right-arr' />
                                </div>
                            </Link>
                            <Link to="/products"  className='black'>
                                <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                                    <div className='flex g-20 alc'>
                                        <div className='bg-y'>
                                            <img src="/images/ix_product.png" alt="" />
                                        </div>
                                        <p>Products</p>
                                    </div>
                                    <ArrowForwardIosOutlinedIcon  className='right-arr' />
                                </div>
                            </Link>
                            <Link to="/vendor/orders" className='black'>
                                <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                                    <div className='flex g-20 alc'>
                                        <div className='bg-p'>
                                            <img src="/images/Vector (3).png" alt="" />
                                        </div>
                                        <p>Orders/ Transactions</p>
                                    </div>
                                    <ArrowForwardIosOutlinedIcon className='right-arr' />
                                </div>
                            </Link>
                            <Link to="/withdraw-funds"  className='black'>
                                <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                                    <div className='flex g-20 alc'>
                                        <div className='bg-y'>
                                            <img src="/images/Vector (4).png" alt="" />
                                        </div>
                                        <p>Fund Withdrawal</p>
                                    </div>
                                    <ArrowForwardIosOutlinedIcon  className='right-arr' />
                                </div>
                            </Link>
                            <Link to="/"  className='black'>
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
                            <div className='flex w-full justsb alc bg-white p-10 rounded-sm pointer'>
                                <div className='flex g-20 alc' onClick={logOut}>
                                    <img src="/images/Group 1000006043 (1).png" alt="" className='log-out' />
                                    <p>Log Out</p>
                                </div>
                                <ArrowForwardIosOutlinedIcon  className='right-arr' />
                            </div>
                        </div>
                    </div>
                </div>
            </div> : 
            <div className="flex flex-col g-40">
                <div className='db-cards'>
              <div className='flex alc db-card bg-white justsb p-20'>
                  <div className='flex flex-col justsb h-full g-20'>
                      <p>My Vendors</p>
                      <h2>{vendorCount || 0}</h2>
                  </div>
                  <div className='bg-y'>
                      <img src="/images/user_17742912.png" alt="" />
                  </div>
              </div>
              <div className='flex alc db-card bg-white justsb p-20'>
                  <div className='flex flex-col justsb h-full g-20'>
                      <p>Point Value</p>
                      <h2>{wallet?.pv}</h2>
                  </div>
                  <div className='bg-p'>
                      <img src="/images/increasing_5329515.png" alt="" />
                  </div>
              </div>
              <div className='flex alc db-card bg-white justsb p-20'>
                  <div className='flex flex-col justsb h-full g-20'>
                      <p>My Affilates</p>
                      <h2>{affiliateCount || 0}</h2>
                  </div>
                  <div className='bg-p'>
                      <img src="/images/teamwork_5494589.png" alt="" />
                  </div>
              </div>
              <div className='flex alc db-card bg-white justsb p-20'>
                  <div className='flex flex-col justsb h-full g-20'>
                      <p>PMT Wallet</p>
                      <h2>{wallet?.pmt}</h2>
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
                            <Link to="/affiliate-management" className='black'>
                                <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                                    <div className='flex g-20 alc'>
                                        <div className='bg-p'>
                                            <img src="/images/teamwork_5494589.png" alt="" />
                                        </div>
                                        <p>Affilates Management</p>
                                    </div>
                                    <ArrowForwardIosOutlinedIcon className='right-arr' />
                                </div>
                            </Link>
                            <Link to="/iRecharge" className='black'>
                                <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                                    <div className='flex g-20 alc'>
                                        <div className='bg-y'>
                                            <img src="/images/user_17742912.png" alt="" />
                                        </div>
                                        <p>iRecharge</p>
                                    </div>
                                    <ArrowForwardIosOutlinedIcon  className='right-arr' />
                                </div>
                            </Link>
                            <Link to="/affiliate/genealogy" className='black'>
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
                            <div className='flex w-full justsb alc bg-white p-10 rounded-sm pointer'  onClick={logOut}>
                                <div className='flex g-20 alc'>
                                    <img src="/images/Group 1000006043 (1).png" alt="" className='log-out' />
                                    <p>Log Out</p>
                                </div>
                                <ArrowForwardIosOutlinedIcon  className='right-arr' />
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        }
        <Footer vendorIn={vendorIn} />  
    </div>
  )
}
