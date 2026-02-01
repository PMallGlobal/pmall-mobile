import React from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

export default function Addresscard() {
  return (
    <div className='order-addy-container'>
        <p className='head bold'>Address</p>
        <div className='order-addy'>
            <p>House 24, Opposite NNPC Filling Station, Lifecamp, FCT Abuja.</p>

            <p>House 24, Opposite NNPC Filling Station, Lifecamp, FCT Abuja.</p>
        </div>
        <div className='edit-delete'>
            <div className='flex g-10'>
                <div className='edit'>
                    <ModeEditOutlinedIcon />
                </div>
                <div className='delete'>
                    <DeleteOutlineOutlinedIcon />
                </div>
            </div>
        </div>
    </div>
  )
}
