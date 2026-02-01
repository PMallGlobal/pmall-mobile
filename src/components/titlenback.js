import React from 'react'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from 'react-router-dom';

export default function Titlenback({title}) {
    const navigate = useNavigate();
  return (
    <div className='category-t'>
        <div className='flex justsb category-head'>
            <div className='back-icon' 
                onClick={() => navigate(-1)}   
                style={{ cursor: 'pointer' }}
            >
                <ArrowBackOutlinedIcon />
            </div>
            <p>{title}</p>
            <div></div>
        </div>
    </div>
  )
}
