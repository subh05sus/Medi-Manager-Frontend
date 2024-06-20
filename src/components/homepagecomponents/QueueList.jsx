import React, { useState ,useEffect, useContext} from 'react';
import SearchBar from './SearchBar';
import { FiFilter,FiCalendar } from "react-icons/fi";
import QueuelistTile from './QueuelistTile';
import AuthContext from '../../context/AuthContext';
import DatePicker from "react-datepicker";
import "./style.css";
import "react-datepicker/dist/react-datepicker.css";
import config from '../../config';

export default function QueueList({ onItemSelected }) {
    const [date, setStartDate] = useState(new Date());
    const today = `${date.toLocaleString('default', { month: 'long' })},${date.getDate()}`;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formatedDate = `${year}-${month}-${day}`;
    const [isSwitchOn, setSwitchOn] = useState(false);
    const { authTokens } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
  const toggleSwitch = () => {
    setSwitchOn(!isSwitchOn);
  };
  const [lqlist, setlqList] = useState([]);
  const [aplist, setapList] = useState([]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    handleFilterClick();
  };

  useEffect(() => {
    fetch(`${config.API_BASE_URL}/api/v1/appointment/doctor_specific/?appointment_datetime=${formatedDate}&type=${selectedOption}`,{ 
      method: "GET",
      headers: { "Authorization" : `JWT ${authTokens?.access}` }
    })
      .then((res) => res.json())
      .then((data) => {
        const filteredAppointments = data.appointments.filter(appointments => appointments.status === 'CR' || appointments.status === 'IP');
        setlqList(filteredAppointments);
        setapList(data.appointments);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [authTokens, formatedDate,selectedOption]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleIconClick = () => {
    setShowDatePicker(!showDatePicker);
  };
  const handleDatePickerChange = (value) => {
    setStartDate(value);
    handleIconClick();
  };
  const handleFilterClick = () => {
    setShowDropdown(!showDropdown);
  };
  const handleItemSelected = (selectedItem) => {
    onItemSelected(selectedItem);
};

  const filteredAppointments = isSwitchOn ? aplist : lqlist;
  const filteredList = filteredAppointments.filter(appointment =>
    appointment.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
        <SearchBar onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="datefilter">
            <div style={{'fontSize': '1.5vw','fontWeight':'600'}}>{today}</div>
            <div className="icons">
              <FiFilter  style={{'fontSize': '1.5vw','cursor':'pointer'}} onClick={handleFilterClick}/>
              <FiCalendar  style={{'fontSize': '1.5vw','cursor':'pointer'}} onClick={handleIconClick}/>
            </div>
            {showDropdown && (
              <div className="dropdown-content">
                <div className='option' onClick={() => handleOptionSelect('')}>All</div>
                <div className='option' onClick={() => handleOptionSelect('IA')}>New Consult</div>
                <div className='option' onClick={() => handleOptionSelect('FA')}>Follow Up</div>
                <div className='option' onClick={() => handleOptionSelect('CA')}>Closed</div>
              </div>
            )}
            { showDatePicker? <div className='calendar'><DatePicker
                selected={date} 
                onChange={handleDatePickerChange}
                showMonthDropdown
                showYearDropdown
                inline
              /></div> : null}
        </div>
        <div className="queue">
            <div className="list">
                <QueuelistTile list={filteredList} onItemSelected={handleItemSelected}/>
            </div>
            <div style={{'height':'10%','display':'flex','justifyContent':'center','alignItems':'center','width':'100%','boxShadow': '0px -10px 10px rgba(0, 0, 0, 0.1)'}}>
              <div className={`sliding-switch ${isSwitchOn ? 'on' : 'off'}`} onClick={toggleSwitch}>
                  <div className="slider">{isSwitchOn ? 'All Patients' : 'Live Queue'}</div>
                  <div className="label on">Live Queue</div>
                  <div className="label off">All Patients</div>
              </div>
            </div>
        </div>
    </>
  )
}
