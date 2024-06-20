import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AuthContext from '../../context/AuthContext';
import config from '../../config';

export default function AppointmentCardContent() {

    const [isSelected,setSelected] = useState(0);
    const [isSessionsSelected,setSessionsSelected] = useState(0);
    const [isRafbaOn, setRafba] = useState(false);
    const [isCdapvOn, setCdapv] = useState(false);
    const [isslotsetupvisiable, setSlotvisiable] = useState(false);
    const [slots, setSlots] = useState([]);
    const [SlotName, setSlotName] = useState('');
    const [slottimes, setSlottime] = useState([]);
    const { authTokens } = useContext(AuthContext);

    const [checkboxValues, setCheckboxValues] = useState([]);
    const handleCheckboxClick = (index) => {
        setCheckboxValues(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = !newValues[index];
            return newValues;
        });
    };
    console.log(slottimes);

    const toggleSwitch1 = () => {
        setRafba(!isRafbaOn);
      };
      const toggleSwitch2 = () => {
        setCdapv(!isCdapvOn);
      };

      const buttons = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const Sessions = ['Morning', 'Afternoon', 'Evening'];


      useEffect(() => {
        fetch(`${config.API_BASE_URL}/api/v1/booking-slot/self/`,{ 
          method: "GET",
          headers: { "Authorization" : `JWT ${authTokens?.access}` }
        })
          .then((res) => res.json())
          .then((data) => {
            setSlots(data);
            const initialCheckboxValues = data.map(slot => slot.is_active);
            setCheckboxValues(initialCheckboxValues);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, [authTokens]);

      const handleEditClick = (slot) => {
        setSlotvisiable(!isslotsetupvisiable);
        setSlotName(slot.name);
        setSlottime(slot.booking_config_list);
      };

      const toggleFormVisibility = () => {
        setSlotName('');
        setSlotvisiable(true);
    };

  return (
    <motion.div className='card-containt'>
        <motion.div className='appointment'>
            <motion.div className="first-column">
                        <motion.ul style={{"width" : "70%"}}>
                                <motion.li>Required approval for Booking Appointment</motion.li>
                                <motion.li>Keep your contact details as Public View</motion.li>
                        </motion.ul>
                        <motion.ul style={{"width" : "30%"}}>
                                <motion.div style={{"width" : "50%","height" : "50%"}} className={`sliding-switch ${isRafbaOn ? 'on' : 'off'}`} onClick={toggleSwitch1}>
                                    <motion.div className="slider">{isRafbaOn ? 'Off' : 'On'}</motion.div>
                                    <motion.div className="label on">On</motion.div>
                                    <motion.div className="label off">Off</motion.div>
                                </motion.div>
                                <motion.div style={{"width" : "50%","height" : "50%"}} className={`sliding-switch ${isCdapvOn ? 'on' : 'off'}`} onClick={toggleSwitch2}>
                                    <motion.div className="slider">{isCdapvOn ? 'Off' : 'On'}</motion.div>
                                    <motion.div className="label on">On</motion.div>
                                    <motion.div className="label off">Off</motion.div>
                                </motion.div>
                        </motion.ul>
            </motion.div>
            <motion.div style={{display:'flex',padding : "1vw",flexDirection:"column",height:"auto",overflowY:"auto"}}>
                <motion.h5>Time Slot Setup</motion.h5>
                <motion.ul>
                    {
                        slots.map((slot,index) => {
                            return (
                                <motion.li key={index} className="slot-row" style={{marginBottom: '1vh'}}>
                                    <motion.h6>{slot.name}</motion.h6>
                                    <motion.button onClick={() => handleEditClick(slot)}>View/Edit</motion.button>
                                    <motion.div class="toggle-button-cover">
                                        <motion.div class="button r" id="button-3">
                                        <motion.input checked={checkboxValues[index] || false} type="checkbox" onClick={() => handleCheckboxClick(index)} class="checkbox"/>
                                        <motion.div class="knobs"></motion.div>
                                        <motion.div class="layer"></motion.div>
                                        </motion.div>
                                    </motion.div>
                            </motion.li>
                            )  
                        }) 
                    }
                    {
                        isslotsetupvisiable &&
                        <motion.div className="last-column" style={{height: "50vh"}}>
                            <motion.div className="slot-row" style={{height:"5vh",fontWeight:"500",padding:"0 1vw"}}>
                                <motion.h5>Slot Name</motion.h5>
                                <motion.input value={SlotName} onChange={(e) => setSlotName(e.target.value)} type="text" style={{'width' : '50%'}}/>
                                <motion.button onClick={() => setSlotvisiable(!isslotsetupvisiable)} style={{'width' : '20%'}}>Save & Close</motion.button>
                            </motion.div>
                            <motion.div className='slot-row' style={{height:"5vh",fontWeight:"500",padding:"0 1vw",marginTop:"1vh"}}>
                                    {
                                        buttons.map((text,index)=>{
                                            return <motion.div key ={index}
                                            className={isSelected === index ? "cardbtn selected" : 'cardbtn'} 
                                            onClick={()=>setSelected(index)}>
                                            {text}
                                            </motion.div>
                                    })
                                    }
                        </motion.div>
                        <motion.p>Select Session & Timings</motion.p>
                        <motion.div className="Session-container">
                            <motion.div className="row" style={{width:"40%"}}>
                                {Sessions.map((text,index)=>{
                                return <motion.div key ={index} onClick={()=>setSessionsSelected(index)} className={isSessionsSelected === index ?'button selected':'button'} >{text}</motion.div>
                                })}
                            </motion.div>
                            <motion.div className="row" style={{width:"60%"}}>
                                <motion.div className="timeing">
                                <motion.ul>
                                    <motion.li>Start Time <motion.input type="time" step="1"/></motion.li>
                                    <motion.li>End Time <motion.input type="time" step="1"/></motion.li>
                                    <motion.li>
                                    Slots
                                    <motion.input type="text" />
                                    </motion.li>
                                </motion.ul>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                        </motion.div>
                    }
                </motion.ul>
                <motion.button className='btn1'onClick={() => toggleFormVisibility()}>Add More</motion.button>
            </motion.div>
            <motion.div style={{display:"flex",padding : "1vw",flexDirection:"column",height:"auto"}}>
                <motion.h5>Time Slot Setup</motion.h5>
                <motion.div className="slot-row" style={{height:"5vh",fontWeight:"500",padding:"0 1vw"}}>
                    Start Date
                    <motion.input type="date" style={{'width' : 'auto'}}/>
                    Leave For the Whole Day
                    <motion.div style={{"width" : "10%","height" : "100%"}} className={`sliding-switch ${isCdapvOn ? 'on' : 'off'}`} onClick={toggleSwitch2}>
                        <motion.div className="slider">{isCdapvOn ? 'Off' : 'On'}</motion.div>
                        <motion.div className="label on">On</motion.div>
                        <motion.div className="label off">Off</motion.div>
                    </motion.div>
                </motion.div>
                <motion.div className="last-column" style={{height:"30vh",gap:'2vh',alignItems:'center'}}>
                    <motion.div style={{"width" : "100%","height" : "20%",display:"flex",alignItems:"center",justifyContent:"space-between",flexDirection:"row"}}>
                        <motion.h5>Select Session</motion.h5>
                        {Sessions.map((text,index)=>{
                            return <motion.div style={{"width" : "20%","height" : "100%"}} key ={index} onClick={()=>setSessionsSelected(index)} className={isSessionsSelected === index ?'button selected':'button'} >{text}</motion.div>
                            })}
                    </motion.div>
                    <motion.div className='leave-container'>
                        <motion.div className="slot-row" style={{height:"5vh",fontWeight:"500",padding:"0 1vw"}}>
                            {Sessions[isSessionsSelected]} Sessions
                            <motion.input type="date" style={{'width' : 'auto'}}/>
                            Leave For the Whole Day
                            <motion.div style={{"width" : "10%","height" : "100%"}} className={`sliding-switch ${isCdapvOn ? 'on' : 'off'}`} onClick={toggleSwitch2}>
                                <motion.div className="slider">{isCdapvOn ? 'Off' : 'On'}</motion.div>
                                <motion.div className="label on">On</motion.div>
                                <motion.div className="label off">Off</motion.div>
                            </motion.div>
                        </motion.div>
                        <motion.h6>Select Slots</motion.h6>
                        <motion.div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexDirection:"row",gap:"1vw",padding: '0 1vw'}}>
                            <motion.div className='circle'></motion.div>
                            <motion.div className='circle'></motion.div>
                            <motion.div className='circle'></motion.div>
                            <motion.div className='circle'></motion.div>
                            <motion.div className='circle'></motion.div>
                            <motion.div className='circle'></motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    </motion.div>
  )
}
