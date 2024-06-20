import React from 'react';
import './style.css';
import { IoAddCircleOutline } from "react-icons/io5";

export default function DoctorSetupPage() {
  return (
    <div className="DocSetup-page">
      <h1>Submit Details</h1>
      <div className="form-cointainer">
        <div className="upload-cointainer">
          <div className="upload"><IoAddCircleOutline  style={{"fontSize":'3.5vw'}}/>Add profile photo</div>
          <div className="upload"><IoAddCircleOutline  style={{"fontSize":'3.5vw'}}/>Upload Aadhar card</div>
        </div>
        <div className="textbox-cointainer">
          <div className="textbox">
            <input type="text" placeholder='Doctor Name :'/>
            <div className="dualbox">
              <input type="text" placeholder='Lic no. :'/>
              <input type="text" placeholder='Specialization :'/>
            </div>
            <input type="text" placeholder='Clinic Name :'/>
          </div>
          <div className="location-cointainer">
            <h2>Location</h2>
            <input type="text" placeholder='Flat / House no. / Floor / Building'/>
            <input type="text" placeholder='Area / Locality / Sector'/>
            <input type="text" placeholder='Nearby landmark (optional)'/>
            <div className="button-container"><input type="button" value="Add" class='locationadd'/></div>
          </div>
        </div>
      </div>
      <div className='button-container'>
        <input type="button" value="Submit"/>
      </div>
    </div>
  )
}
