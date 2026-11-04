import React from 'react'
import CategoryHeader from '../components/CategoryHeader'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Link } from 'react-router-dom';

export default function FundWithdrawal() {
  return (
    <div className='funds-withdraw'>
        <CategoryHeader title="Fund Withdrawal" />

        <div className='flex flex-col g-20 w-full '>
            <Link to="/withdraw"  className='black'>
                <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                    <div className='flex g-20 alc'>
                        <img src="/images/withdraw.png" alt="" />
                        <p>Withdraw Funds</p>
                    </div>
                    <ArrowForwardIosOutlinedIcon className='right-arr' />
                </div>
            </Link>
            <Link to="/transfer"v  className='black'>
                <div className='flex w-full justsb alc bg-white p-10 rounded-sm'>
                    <div className='flex g-20 alc'>
                        <img src="/images/transfer.png" alt="" />
                        <p>Transfer Funds</p>
                    </div>
                    <ArrowForwardIosOutlinedIcon  className='right-arr' />
                </div>
            </Link>
        </div>
    </div>
  )
}
