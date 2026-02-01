import React from 'react'
import CategoryHeader from '../components/CategoryHeader'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

export default function Genealogy() {
  return (
    <div className='genealogy  flex flex-col g-20'>
        <CategoryHeader title="Genealogy" image="true" />
        <div className='view-tree-cont'>
            <div className='flex alc g-10 view-tree'>
                <RemoveRedEyeOutlinedIcon className='eye-ic' />
                <p>View Tree</p>
            </div>
        </div>
        <div className='bg-white rounded-sm p-20 flex flex-col g-20'>
            <div className='flex alc justsb bb'>
                <p className='p1'>Referral ID</p>
                <div className='flex alc g-5'>
                    <p className='p2'>PM-453727</p>
                    <ContentCopyOutlinedIcon className='copy-ic' />
                </div>
            </div>
            <div className='flex alc justsb bb'>
                <p className='p1'>Account Type</p>
                <p className='p2'>Affiliate</p>
            </div>
            <div className='flex alc justsb bb'>
                <p className='p1'>Total Downlines</p>
                <p className='p2'>12</p>
            </div>
            <div className='flex alc justsb bb'>
                <p className='p1'>Direct Referral</p>
                <p className='p2'>3</p>
            </div>
            <div className='flex alc justsb bb'>
                <p className='p1'>Direct Referral</p>
                <p className='p2'>12</p>
            </div>
            <div className='flex alc justsb bb'>
                <p className='p1'>Member Since</p>
                <p className='p2 date'>Apr 20, 2025</p>
            </div>
        </div>
    </div>
  )
}
