import React, { useState } from 'react';
import './style.css';
import img from './images/Home ideation-1.png';
import { IoIosArrowBack } from "react-icons/io";

export default function RolePage() {
  const [selectedValue, setSelectedValue] = useState('');

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div className="loginpage">
    <div className="column">
        <div className='center-content'>
          <h1><IoIosArrowBack style={{"fontSize":'2vw'}}/> Who are you?</h1>
          <form style={{ 'width': '50%', 'margin': '0 auto', 'textAlign': 'center' }}>
              <div className="option">
                <input type="radio" value="option1" checked={selectedValue === 'option1'} onChange={handleRadioChange} style={{width:'20%'}}/>
                Doctor
              </div>
              <div className="option">
                <input type="radio" value="option2" checked={selectedValue === 'option2'} onChange={handleRadioChange} style={{width:'20%'}}/>
                Receptionist
              </div>
              <div className="option">
                <input type="radio" value="option3" checked={selectedValue === 'option3'} onChange={handleRadioChange} style={{width:'20%'}}/>
                PolyClinic
              </div>
              <input className="button" type="submit" value='Submit' style={{'width': '90%','marginTop':'5vh'}}/>
          </form>
        </div>
    </div>
    <div className="column right" style={{'backgroundColor': '#ccecee'}}>
      <div className='center-content'>
        <img style={{width: '70%'}} src={img} alt=''/>
      </div>
    </div>
  </div>
  )
}
