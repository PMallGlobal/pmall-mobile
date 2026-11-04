import React from 'react';
import CategoryHeader from '../components/CategoryHeader';
import { useUser, useLogOut } from '../context/UserContext';
import UserAvatar from '../utils/UserAvatar';

import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './Menu.css';

export default function Menu() {
  const { user } = useUser();
  const logOut = useLogOut();

  const handleConnectStore = () => {
    alert("Social media connection coming soon!");
  };
  const handleFollowPage = () => {
    window.open("https://instagram.com/pmall", "_blank"); 
  };

  return (
    <div className="menu-page">

      {/* ACTIONS LIST */}
      <div className="menu-section">
        <h3 className="menu-section-title">Store Settings</h3>
        
        <div className="menu-list">
          <button className="menu-item" onClick={handleConnectStore}>
            <div className="menu-item-left">
              <div className="menu-icon bg-purple">
                <ShareOutlinedIcon fontSize="small" />
              </div>
              <span className="menu-label">Connect Store to Social Media</span>
            </div>
            <ChevronRightIcon className="menu-chevron" />
          </button>

          <button className="menu-item" onClick={handleFollowPage}>
            <div className="menu-item-left">
              <div className="menu-icon bg-yellow">
                <ThumbUpAltOutlinedIcon fontSize="small" />
              </div>
              <span className="menu-label">Follow Our Page</span>
            </div>
            <ChevronRightIcon className="menu-chevron" />
          </button>
        </div>
      </div>

      <div className="menu-section">
        <h3 className="menu-section-title">Account</h3>
        
        <div className="menu-list">
          <button className="menu-item danger" onClick={logOut}>
            <div className="menu-item-left">
              <div className="menu-icon bg-red">
                <LogoutOutlinedIcon fontSize="small" />
              </div>
              <span className="menu-label">Log Out</span>
            </div>
            <ChevronRightIcon className="menu-chevron" />
          </button>
        </div>
      </div>

    </div>
  );
}