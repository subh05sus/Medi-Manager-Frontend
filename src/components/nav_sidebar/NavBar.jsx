import React, { useEffect, useState } from 'react';
import './style.css';
import { FaUserDoctor } from "react-icons/fa6";
import { BiMessageError } from "react-icons/bi";
import { FiBell } from "react-icons/fi";
import { FiHelpCircle } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import img from '../../pages/images/Medyman_Logo.png';

export default function NavBar({OpenSidebar,openSidebarToggle,userName}) {
  const navigate = useNavigate();
  const [time, updateTime] = useState( new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      updateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
		<nav>
      <div className={openSidebarToggle ? "start-div open" : "start-div"}>
        <div className="menu" onClick={OpenSidebar}>{openSidebarToggle ? <svg width="2vw" height="2vw" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.3308 0.999867L3 10.4321" stroke="#383C44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 13H3" stroke="#383C44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 17H3" stroke="#383C44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg> : <svg width="2vw" height="2vw" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 8H3" stroke="#383C44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H3" stroke="#383C44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 16H3" stroke="#383C44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>}
        </div>
        <div className="brandname" onClick={() => navigate("/doc/home")}><img src={img} alt='Logo'/> MedyMan</div>
      </div>
      <div className="mid-div">
        <div style={{color: '#76b0b2', fontSize: '1vw', marginRight: '2vw'}}>{time.toLocaleTimeString()}</div>
        <FaUserDoctor />Dr. {userName}
      </div>
      <div className="end-div">
            <BiMessageError className='icon' style={{color:'#095d7e'}}/>
            <FiBell className='icon' style={{color:'#095d7e'}}/>
            <FiHelpCircle className='icon' style={{color:'#095d7e'}}/>
      </div>
		</nav>
  )
}
