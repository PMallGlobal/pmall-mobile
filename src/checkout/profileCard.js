import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLogOut2 } from '../context/UserContext'

export default function ProfileCard({user}) {
    const logOut = useLogOut2()
    function formatRegDate(isoDate) {
        if (!isoDate) return "—";
      
        const date = new Date(isoDate);
      
        return new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }).format(date);
      }

  return (
    <div className='cart-summary-container check  returning '>
        <div className='cart-summary '>
            <div>
                <div className='summ-section'>
                    <p className='summ-left'>Logged In As:</p>
                    <p className='summ-right'>{user.fname} {user.lname}</p>
                </div>
                <div className='summ-section'>
                    <p className='summ-left'>Email</p>
                    <p className='summ-right'>{user.email}</p>
                </div>
                <div className='summ-section last'>
                    <p className='summ-left'>Member Since</p>
                    <p className='summ-right'>{formatRegDate(user.regDate)}</p>
                </div>
            </div>
            
        </div>
        <div className="forgotten">
            <p className="">Use a different account?  <span className="purple pointer" onClick={logOut}>  Login Here  </span></p>
        </div>
    </div>
  )
}
