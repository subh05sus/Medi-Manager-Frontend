import React, { useContext, useEffect, useState } from "react";
import SearchDropdown from "./SearchDropdown";
import AuthContext from "../../context/AuthContext";
import { FaMedrt } from "react-icons/fa6";
import ConsultationContext from "../../context/ConsultationContext";
import config from "../../config";
import { MdOutlineCancel } from "react-icons/md";
import { useMemo } from "react";

export const SymptompsCard = ({isSelected,setSelected,appointmentid}) => {
  const [list, setlist] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [fetchedSymptoms, setFetchedSymptoms] = useState([]);
  const [isActive,setActive] = useState(0);
  const { authTokens } = useContext(AuthContext);
  const { SymptomPost } = useContext(ConsultationContext);
  const [selectedSeverity, setSelectedSeverity] = useState({});
  const [durationTextboxes, setdurationTextboxes] = useState({});
  const [isduration,setDuration] = useState(0);

  const duration = [
    {label: '1 d', value : "1"},
    {label: '2 d', value : "2"},
    {label: '3 d', value : "3"},
    {label: '4 d', value : "4"},
    {label: '5 d', value : "5"},
    {label: '7 d', value : "7"}
  ];
  const severity = useMemo(() => [
    {label:'Mild',value:'MLD'},
    {label:'Medium',value:'MED'},
    {label:'Severe',value:'SEV'}
 ], []);

    useEffect(() => {
    // api to fetch saved symptomps
    fetch(`${config.API_BASE_URL}/api/v1/consultation-symptom/?appointment_id=${appointmentid}`, {
      method: "GET",
      headers: { "Authorization" : `JWT ${authTokens?.access}` }
    })
      .then((res) => res.json())
      .then((data) => {
        const existingSymptoms = data.map((symptom) => ({
          value: symptom.symptom_id,
          label: symptom.symptom_name,
          severity: symptom.severity,
          duration: symptom.duration
        }));
        const initialDurationTextboxes = existingSymptoms.reduce((acc, symptom, index) => {
          acc[index] = symptom.duration.split(' ')[0];
          return acc;
        }, {});
        const initialSelectedSeverity = existingSymptoms.reduce((acc, symptom, index) => {
          const severityIndex = severity.findIndex(s => s.value === symptom.severity);
          acc[index] = severityIndex;
          return acc;
        }, {});
        setdurationTextboxes(initialDurationTextboxes);
        setSelectedSeverity(initialSelectedSeverity);
        setFetchedSymptoms(existingSymptoms);
        setSelectedSymptoms(existingSymptoms);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    // Fetch all symptoms for the dropdown
    fetch(`${config.API_BASE_URL}/api/v1/symptom-master/`, {
      method: "GET",
      headers: { "Authorization" : `JWT ${authTokens?.access}` }
      })
      .then((res) => res.json())
      .then((data) => {
        const allSymptoms = data.map((symptom) => ({
          value: symptom.id,
          label: symptom.symptom_name,
        }));
        setlist(allSymptoms);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }, [authTokens, appointmentid, severity]);

     const handleDurationChange = (e, index) => {
      const newSymptoms = [...selectedSymptoms];
      const durationParts = newSymptoms[index].duration ? newSymptoms[index].duration.split(' ') : ['', ''];
      durationParts[0] = e.target.value;
      newSymptoms[index].duration = durationParts.join(' ');
      setSelectedSymptoms(newSymptoms);
      setdurationTextboxes(prevState => ({
        ...prevState,
        [index]: e.target.value,
      }));
     };
     
     const handleTimeUnitChange = (e, index) => {
      const newSymptoms = [...selectedSymptoms];
      const durationParts = newSymptoms[index].duration ? newSymptoms[index].duration.split(' ') : ['', ''];
      durationParts[1] = e.target.value;
      newSymptoms[index].duration = durationParts.join(' ');
      setSelectedSymptoms(newSymptoms);
     };
     

     const handleSearchDropdownChange = (values) => {
      const updatedSymptoms = [...fetchedSymptoms, ...values];
      setSelectedSymptoms(updatedSymptoms);
     };
     
    const handleSave = async () => {
      const appointmentId = appointmentid;
      const symptomData = selectedSymptoms.map((symptom, index) => {
        const severityIndex = selectedSeverity[index];
        const severityvalue = severityIndex !== undefined && severity[severityIndex] ? severity[severityIndex].value : null;
        const duration = document.getElementById(`duration_${index}`).value === '' ? 0 : document.getElementById(`duration_${index}`).value;
        const timeUnit = document.getElementById(`time_${index}`).value;
        return {
          symptom_name: symptom.label,
          duration: `${duration} ${timeUnit}`,
          severity: severityvalue
        };
      });
      try {
        await SymptomPost(appointmentId, symptomData);
        setSelected(isSelected + 1)
      } catch (error) {
        console.error("Post failed", error);
      }
    }

    const onSevClick = (sindex) => {
      setSelectedSeverity(prevState => ({
        ...prevState,
        [isActive]: sindex,
      }));
    }
    
    const onDurationclick = (dindex, dtext) => {
      setDuration(dindex);
      setdurationTextboxes(prevState => ({
        ...prevState,
        [isActive]: dtext.value,
      }));
      };
    const handleCancelClick = (index) => {
      const updated = selectedSymptoms.filter((_, i) => i !== index);
      setSelectedSymptoms(updated);
      setActive(null);
    };
   
  return (
    <div  className="cardContainer" style={{"flexDirection": 'column'}}>
      <div className="textbox-cointainer">
        <div style={{"width": '100%'}}><SearchDropdown options={list} placeholder={'Search or add symptoms'} onValuesChange={handleSearchDropdownChange}/></div>
      </div>
      <div className="medicine-cointainer">
        <div className="medlist">
        {
          selectedSymptoms.map((symptom, index) => (
            <div key={index} className={isActive === index ? 'meds selected' : 'meds'} onClick={ () => setActive(index)}><FaMedrt className="icon" style={{"fontSize":"1.5vw"}}/>{symptom.label} <div onClick={() => handleCancelClick(index)}><MdOutlineCancel /></div></div>
          ))
        }
        </div>
          {
            selectedSymptoms.map((symptom, index) => (
              <div key={index} className="medtimings">
                <div className={isActive === index ? 'timebox' : 'blockbox'}>
                <h6 style={{color:"#005F73",fontSize:'1vw'}}>{symptom.label}</h6>
                <div style={{"display":"flex","flexDirection":"column","alignItems":"flex-start","justifyContent":"flex-start","width":"100%",padding:"0 0.5vw","height":"50%",gap:'0.5vh'}}>
                  <h5 style={{  fontSize: '1.4vw',margin:'0'}}>Severity</h5>
                  <div className="button-container" style={{ height: '30%',justifyContent: 'flex-start',alignItems: 'center',fontSize: '1.3vw'}}>
                    {
                      severity.map((stext,sindex)=>{
                        return <button style={{width:"25%"}} className={selectedSeverity[isActive] === sindex ? 'btnselected' : ''}  onClick={() => onSevClick(sindex)} key={sindex}>{stext.label}</button>
                      })
                    }
                  </div>
                  <h5 style={{  fontSize: '1.4vw',margin:'0'}}>Duration</h5>
                  <div className="button-container" style={{ height: '30%',justifyContent: 'flex-start',alignItems: 'center',fontSize: '1.3vw'}}>
                    {
                      duration.map((dtext,dindex)=>{
                        return <button  className={isduration === dindex ? 'btnselected' : ''}  onClick={ () => onDurationclick(dindex,dtext)} key={dindex}>{dtext.label}</button>
                      })
                    }
                    <input type="number" value={durationTextboxes[index] || ''} onChange={(e) => handleDurationChange(e, index)} id={`duration_${index}`}/>
                    <select id={`time_${index}`} value={symptom.duration ? symptom.duration.split(' ')[1] : ''} onChange={(e) => handleTimeUnitChange(e, index)}>
                      <option value="days">Days</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                </div>
                </div>
              </div>
            ))
          }

        <div className="medbuttons">
          <button className="hoverbutton" style={{"padding":'0px 3vw'}} onClick={()=>setSelected(isSelected + 1)}>Skip</button>
          <button className="hoverbutton" style={{"padding":'0px 3vw','borderColor': '#74c0c3','backgroundColor': '#74c0c3','color': 'white'}} onClick={()=>handleSave()}>Next</button>
        </div>
      </div>
    </div>
  )
}
