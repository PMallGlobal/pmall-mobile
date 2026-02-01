import React, { useState } from 'react'
import Footer from '../components/footer';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import HeaderSearch from '../components/headerSearch';
import PlainProductGrid from '../products/PlainProductGrid';
import { useUser } from '../context/UserContext';
import { useVendorr } from '../context/VendorSignupContext';
import Toast from '../utils/Toast';

export default function MyStore() {
    const user = useUser();
    const { vendorProductAmt, wallet, orderAmt} = useVendorr();
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

  return (
    <div className='dashboard my-store  '>
         {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <div className='flex justsb alc'>
            <div className='flex alc g-20 d-profile'>
                <div>
                    <h2 className='uppercase'>{user.user.fname} {user.user.lname}</h2>
                    <p>{user.user.storeId}</p>
                </div>
                <img src="/images/Ellipse 280.png" alt="" />
            </div>
            <div className='flex alc g-10 copy-store-link pointer' onClick={()=>copyToClipboard(`https://pmall.com.ng/vendor/${user.user.storeId}`)}>
                <ContentCopyOutlinedIcon className='copy' />
                <p>Copy my store link</p>
            </div>
        </div>

        <div className='store-name'>
            <p className='uppercase'>STORE NAME: {user.user.storeName}</p>
        </div>

        <div className='db-cards'>
            <div className='flex alc db-card bg-white justsb p-20'>
                <div className='flex flex-col justsb h-full g-20'>
                    <p>Total Products</p>
                    <h2>{vendorProductAmt}</h2>
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
                    <p>Total Sold</p>
                    <h2>{orderAmt}</h2>
                </div>
                <div className='bg-p'>
                    <img src="/images/cubes_2875916.png" alt="" />
                </div>
            </div>
            <div className='flex alc db-card bg-white justsb p-20'>
                <div className='flex flex-col justsb h-full g-20'>
                    <p>Total Returned</p>
                    <h2>0.00</h2>
                </div>
                <div className='bg-y'>
                    <img src="/images/lsicon_sales-return-filled.png" alt="" />
                </div>
            </div>
        </div>

        <div className='flex flex-col g-20 vend-cat'>
            <HeaderSearch />
            <PlainProductGrid />
        </div>
       
        <Footer vendorIn={true} />  

    </div>
  )
}
