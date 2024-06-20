import React, { useContext, useEffect, useRef, useState } from 'react';
import NavBar from '../components/nav_sidebar/NavBar';
import SideBar from '../components/nav_sidebar/SideBar';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '../config';
import AuthContext from '../context/AuthContext';

export default function ReceptionistAddPage() {
  const [loading, setLoading] = useState(false);
  const sidebarRef = useRef(null);
  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();
    const location = useLocation();
    const userName = location.state?.userName;
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
      }
    const [receptionist, setReceptionist] = useState({
        phone_number: '',
        first_name: '',
        last_name: '',
        email: ''
     });

     const handleChange = (e) => {
      setReceptionist({
        ...receptionist,
        [e.target.name]: e.target.value
      });
   };

   const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const data = {
      receptionist_detail: receptionist
    };

    try {
      const response = await fetch(`${config.API_BASE_URL}/api/v1/receptionist/add/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : `JWT ${authTokens?.access}`
        },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        navigate("/") 
        console.log('Receptionist added successfully');
      } else {
          console.error('Failed to add receptionist');
          throw new Error('Network response was not ok');
        }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
 };

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
    <div className='receptionistpage'>
        <NavBar OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} userName={userName}/>
        <SideBar ref={sidebarRef} openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} userName={userName}/>
        <form onSubmit={handleSubmit}>
          <h2>Add a receptionist</h2>
          <div className="firstrow">
            <div className="firstname">
              <label>First name*</label>
              <input type="text" placeholder="First name" name="first_name" value={receptionist.first_name} onChange={handleChange} required/>
            </div>
            <div className="firstname">
              <label>Last name</label>
              <input type="text" placeholder="Last name" name="last_name" value={receptionist.last_name} onChange={handleChange}/>
            </div>
          </div>
          <div className="firstrow">
            <div className="firstname">
              <label>Phone Number*</label>
              <input type="text" placeholder="Phone Number" name="phone_number" value={receptionist.phone_number} onChange={handleChange} required/>
            </div>
            <div className="firstname">
              <label>Email</label>
              <input type="text" placeholder="Email" name="email" value={receptionist.email} onChange={handleChange}/>
            </div>
          </div>
          <div style={{display: 'flex' ,flexDirection: 'column','width':'100%','height':'30%'}}>
            <h3>Permissions</h3>
            <div style={{'display':'flex','flexDirection':'row'}}><label htmlFor="Access" style={{'width':'60%'}}>Access to patient records</label> <input id="Access" name='Access' type="checkbox" checked/></div>
            <div style={{'display':'flex','flexDirection':'row'}}><label htmlFor="manage" style={{'width':'60%'}}>Schedule and manage appointments</label> <input id="manage" name='manage' type="checkbox" checked/></div>
            <div style={{'display':'flex','flexDirection':'row'}}><label htmlFor="billing" style={{'width':'60%'}}>Manage billing and payments</label> <input id="billing" name='billing' type="checkbox" checked/></div>
          </div>
          <div className="firstrow" style={{justifyContent:'flex-end'}}>
          {loading ? <div className='loading-spinner'></div>:<input type="submit" value="save"/>}
          </div>
        </form>
    </div>
  )
}
