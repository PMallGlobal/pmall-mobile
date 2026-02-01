import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileItemsCard({image,title,link}) {

  return (
    <>
    <Link to={link}>  
    <div className='flex alc ProfileItemsCard g-20'>
        <img src={image} alt="" />
        <p>{title}</p>
    </div>
    </Link>
   </> 
  )
}
