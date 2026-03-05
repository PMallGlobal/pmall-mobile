import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { useVendorr } from '../context/VendorSignupContext';

export default function HeaderSearch() {
  const { searchInput, setSearchInput} = useVendorr();
  return (
    <div className='flex justsb all-center g-10 header-b'>
        <div className='header-search'>
        <SearchOutlinedIcon />
        <input type="text" placeholder='Search for Organic Products on Pmall' value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}  />
        </div>
        <div className='filter'>
        <TuneOutlinedIcon />
        </div>
    </div>
  )
}
