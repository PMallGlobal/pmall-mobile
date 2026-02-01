import React from 'react'
import CategoryHeader from '../components/CategoryHeader'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

export default function GenealogyProfile() {
  return (
    <div className='genealogy  flex flex-col g-20'>
        <CategoryHeader title="Genealogy" image="true" />
        <div className=' flex flex-col g-10 all-center gp-head'>
            <img src="/images/Ellipse 330.png" alt="" />
            <p>Vitrus John</p>
            <p>PM-430982</p>
        </div>
        <div className='bg-white rounded-sm p-20 flex flex-col g-20'>
            <div className='flex alc justsb bb'>
                <p className='p1'>Account Type</p>
                <p className='p2'>Affiliate</p>
            </div>
            <div className='flex alc justsb bb'>
                <p className='p1'>Store Name</p>
                <p className='p2'>JohnnyStores</p>
            </div>
            <div className='flex alc justsb bb'>
                <p className='p1'>Store URL</p>
                <p className='p2'>https://pmall.com/ng</p>
            </div>
            <div className='flex alc justsb bb'>
                <p className='p1'>Username</p>
                <p className='p2'>Vitrus Johnny</p>
            </div>
            <div className='flex alc justsb bb'>
                <p className='p1'>Referral ID</p>
                <p className='p2'>PM-453727</p>
            </div>
            <div className='flex alc justsb bb'>
                <p className='p1'>Email</p>
                <p className='p2'>vitrusjohnny@gmail.com </p>
            </div>
            <div className='flex alc justsb bb'>
                <p className='p1'>Telephone</p>
                <p className='p2'>09188771143 </p>
            </div>
            <div className='flex alc justsb bb'>
                <p className='p1'>Member Since</p>
                <p className='p2 date'>Apr 20, 2025</p>
            </div>
        </div>
    </div>
  )
}
