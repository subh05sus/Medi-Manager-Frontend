import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../components/nav_sidebar/NavBar';
import SideBar from '../components/nav_sidebar/SideBar';
import { useLocation } from 'react-router-dom';

export default function DocProfile() {
  const location = useLocation();
  const sidebarRef = useRef(null);
  const userName = location.state?.userName;
//   const userPhoneNumber = location.state?.userPhoneNumber;
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setOpenSidebarToggle(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);
  return (
    <div className="DocProfile-page-container">
      <NavBar OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} userName={userName}/>
      <SideBar ref={sidebarRef} openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} userName={userName}/>
      Settings page
      {/* ADD REMAINING DESIGN HERE */}
    </div>
  )
}
