import React from 'react'
import CategoryHeader from '../components/CategoryHeader'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function SearchUser() {
  return (
    <div className='search-user flex flex-col g-20'>
        <CategoryHeader title="Search User" image="true" />
        <div className='bg-white p-20 rounded-sm flex flex-col g-10'>
            <p className='title'>Search User</p>
            <div className='w-full flex justsb  search-box'>
                <input type="text" placeholder='Enter Username' />
                <SearchOutlinedIcon />
            </div>
        </div>
    </div>
  )
}
