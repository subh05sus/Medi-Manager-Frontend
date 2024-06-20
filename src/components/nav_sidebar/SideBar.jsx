import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { FiHelpCircle, FiHome } from "react-icons/fi";
import { MdOutlineSettings } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import img from '../images/doctor.png';
import AuthContext from '../../context/AuthContext';
import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdManageAccounts } from "react-icons/md";
import { BsCalendarDate, BsPersonAdd } from "react-icons/bs";
import config from '../../config';

const SideBar = forwardRef(({ openSidebarToggle }, ref) => {
    const navigate = useNavigate();
    const { logoutUser,authTokens } = useContext(AuthContext);
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch(`${config.API_BASE_URL}/auth/users/me/`,{ 
          method: "GET",
          headers: { "Authorization" : `JWT ${authTokens?.access}` }
        })
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
    }, [authTokens]);
    return (
        <div ref={ref} id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    {
                        user.profile_pic !== null ? <img src={user.profile_pic} alt="Avatar"/> : <img src={img} alt="Avatar"/>
                    }
                    <div className="title"><>{user.full_name}</>
                        <div style={{'fontSize': '1.2vw','fontWeight': '400','margin': '0vw'}}>Clinic name</div>
                    </div>

                </div>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item' onClick={() => navigate("/doc/home")}>
                    <FiHome className='icon'/> Home
                </li>
                <li className='sidebar-list-item' onClick={() => navigate("/doc/bookappointment",{state:{ userName: user.full_name }})}>
                    <BsCalendarDate  className='icon'/> Book Appointment
                </li>
                {
                    user.is_doctor && 
                        <li className='sidebar-list-item' onClick={() => navigate("/doc/receptionistadd",{state:{ userName: user.full_name }})}>
                        <BsPersonAdd  className='icon'/> Add Receptionist
                    </li>      
                }

                {/* <li className='sidebar-list-item' onClick={() => navigate("/doc/settings",{state:{ userName: user.full_name , userPhoneNumber : user.phone_number }})}>
                    <MdOutlineSettings className='icon'/> Settings 
                    <FaCaretDown />
                    <div className="dropdown-container">
                        <div href="#">Link 1</div>
                        <div href="#">Link 2</div>
                        <div href="#">Link 3</div>
                    </div>
                </li> */}
                <li className='sidebar-list-item' onClick={() => navigate("/doc/doc-profile",{state:{ userName: user.full_name , userPhoneNumber : user.phone_number }})}>
                    <MdManageAccounts  className='icon'/> Profile
                </li>
                <li className='sidebar-list-item'>
                    <FiHelpCircle className='icon'/> Help
                </li>
                <li className='sidebar-list-item' onClick={logoutUser}>
                    <PiSignOutBold className='icon'/> Sign Out
                </li>
            </ul>
        </div>
    );
});

export default SideBar;
