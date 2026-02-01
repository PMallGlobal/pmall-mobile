import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

export default function HeaderSearch() {
  return (
    <div className='flex justsb all-center g-10 header-b'>
        <div className='header-search'>
        <SearchOutlinedIcon />
        <input type="text" placeholder='Search for Organic Products on Pmall'  />
        </div>
        <div className='filter'>
        <TuneOutlinedIcon />
        </div>
    </div>
  )
}
