import React, { useContext, useEffect, useState } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import AuthContext from '../context/AuthContext';
import config from '../config';
import { useNavigate } from 'react-router-dom';


export default function ProfileSetup() {
    const navigate = useNavigate();
    const swal = require('sweetalert2');
    const { authTokens,user } = useContext(AuthContext);
    const [specializations, setSpecializations] = useState([]);
    const [form, setForm] = useState({
      id: "",
      aadhar: "",
      first_name: "",
      last_name: "",
      gender: "",
      age: "",
      is_doctor: false,
      is_receptionist: false,
      registration_number: "",
      address: "",
      postal_code: "",
      email: "",
      phone_number: "",
      profile_pic: null,          
  });
  

    useEffect(() => {
      
        fetch(`${config.API_BASE_URL}/auth/users/me/`,{ 
          method: "GET",
          headers: { "Authorization" : `JWT ${authTokens?.access}` }
        })
          .then((res) => res.json())
          .then((data) => {
            setForm(data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });

        fetch(`${config.API_BASE_URL}/api/v1/specialization/`, {
            method: "GET",
            headers: { "Authorization": `JWT ${authTokens?.access}` }
          })
          .then((res) => res.json())
          .then((data) => {
            setSpecializations(data);
          })
            .catch((error) => {
              console.error('Error fetching data:', error);
        });
    }, [authTokens]);


    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setForm(prevUser => ({
           ...prevUser,
           [name]: value
      }));
     };
     
     const saveUpdatedData = () => {
      const url = `${config.API_BASE_URL}/api/v1/user/${user.user_id}/`;
      fetch(url, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `JWT ${authTokens?.access}`
          },
          body: JSON.stringify({
            "id": user.id,  
            "aadhar": form.aadhar,
            "first_name": form.first_name,
            "last_name": form.last_name,
            "gender": form.gender,
            "age": parseInt(form.age),
            "registration_number": form.registration_number,
            "address": form.address,
            "postal_code": form.postal_code,
            "email": form.email,
            "phone_number": form.phone_number,
            "profile_pic": form.profile_pic,
          })
      })
      .then(response => {
          if (response.status === 200) {
            swal.fire({
              title: "Profile Updated Successfully",
              icon: "success",
              toast: true,
              timer: 6000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false,
            })
          } else {
            swal.fire({
              title: "Profile Update Failed",
              icon: "error",
              toast: true,
              timer: 6000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false,
            })
          }
          return response.json();
      })
  };

  return (
    <div className="DocProfile-page-container">
        <div className="DocSetup-page" style={{height: '100vh'}}>
          <h1>Setup Profile</h1>
          <form className="form-cointainer" onSubmit={saveUpdatedData}>
            <div className="upload-cointainer">
              <div className="upload" onClick={() => document.getElementById('profilePicInput').click()}>
                {
                  form.profile_pic === null ? <><IoAddCircleOutline  style={{"fontSize":'3.5vw'}}/>Upload profile pic</> : <img src={form.profile_pic} alt="profile pic" />                  
                }
                <input type="file" id="profilePicInput" name="profile_pic" accept="image/png, image/jpg, image/jpeg" style={{ display: 'none' }} onChange={handleInputChange} />
              </div>
              <div className="upload"><IoAddCircleOutline  style={{"fontSize":'3.5vw'}}/>Upload Aadhar card</div>
            </div>
            <div className="textbox-cointainer">
              <div className="textbox">
                <div className="dualbox">
                  <input name="first_name" value={form.first_name} onChange={handleInputChange} type="text" placeholder='First Name :'/>
                  <input name="last_name" value={form.last_name} onChange={handleInputChange} type="text" placeholder='Last Name :'/>
                </div>
                <div className="dualbox">
                  <input name="age" value={form.age} onChange={handleInputChange} type="number" placeholder='Age :'/>
                  <select name="gender" value={form.gender} onChange={handleInputChange}>
                    <option value="ML">Male</option>
                    <option value="FL">Female</option>
                    <option value="OT">Other</option>
                  </select>
                </div>
                <div className="dualbox">
                  <input name="email" value={form.email} onChange={handleInputChange} type="text" placeholder='Email :'/>
                  <input name="registration_number" value={form.registration_number} onChange={handleInputChange} type="text" placeholder='Registration no. :'/>
                  {/* <input name="phone_number" value={form.phone_number} onChange={handleInputChange} type="text" placeholder='Phone Number :'/> */}
                </div>
                <div className="dualbox">
                  <select name="specialization" type="text" placeholder='Specialization :'>
                    {specializations.map((specialization) => (
                      <option key={specialization.id} value={specialization.id}>{specialization.name}</option>
                    ))}
                  </select>
                  <input name="clinic_name" type="text" placeholder='Qualifications :'/>
                </div>
                <div className="dualbox">
                  <input name="aadhar" value={form.aadhar} onChange={handleInputChange} type="text" placeholder='Aadhar Number :'/>
                  <input name="zip_code" value={form.postal_code} onChange={handleInputChange} type="text" placeholder='Zip Code :'/>
                </div>
                <textarea name="address" value={form.address} onChange={handleInputChange} placeholder='Address :'/>
              </div>
            </div>
          </form>
          <div className='button-container'>
            <input type="button" value="Submit" onClick={saveUpdatedData} />
            <input type="button" value="Skip" onClick={() => navigate("/doc/home")} />
          </div>
        </div>
    </div>
  )
}
