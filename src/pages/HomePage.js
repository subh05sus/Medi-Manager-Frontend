import React, { useEffect, useState, useRef } from 'react';
import SideBar from '../components/nav_sidebar/SideBar';
import Home from '../components/homepagecomponents/MainContent';
import '../components/homepagecomponents/style.css';
import NavBar from '../components/nav_sidebar/NavBar';
import useAxios from '../utils/useAxios';

export default function HomePage() {
 const [userName, setUserName] = useState('');
 const [user, setUser] = useState([]);
 const axiosInstance = useAxios();
 const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
 const sidebarRef = useRef(null);

 const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
 };

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('auth/users/me/');
        setUser(response.data);
        setUserName(response.data.full_name);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenSidebarToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
 }, [axiosInstance]);


 return (
    <div className='grid-container'>
      <NavBar 
        OpenSidebar={OpenSidebar} 
        openSidebarToggle={openSidebarToggle} 
        userName={userName} 
      />
      <SideBar 
        ref={sidebarRef}
        openSidebarToggle={openSidebarToggle} 
        OpenSidebar={OpenSidebar} 
      />
      <Home user={user} />
    </div>
 );
}
