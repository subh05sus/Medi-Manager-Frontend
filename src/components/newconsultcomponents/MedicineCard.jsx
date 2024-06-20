import React, { useState ,useEffect, useContext} from 'react';
import { GiMedicines } from "react-icons/gi";
import SearchDropdown from "./SearchDropdown";
import AuthContext from '../../context/AuthContext';
import ConsultationContext from '../../context/ConsultationContext';
import config from '../../config';
import PopupCard from './PopupCard';
import Select from 'react-select/creatable';
import { MdOutlineCancel } from "react-icons/md";
import { useMemo } from 'react';


export const MedicineCard = ({isSelected,setSelected,appointmentid}) => {
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [fetchedMedicines, setFetchedMedicines] = useState([]);
  const [templateMedicines, setTemplateMedicines] = useState([]);
  const [allMedicines, setAllMedicines] = useState([]);
  const [MedicineTemplates, setMedicineTemplates] = useState([]);
  const { authTokens } = useContext(AuthContext);
  const { MedicinePost,MedicineTemplatePost } = useContext(ConsultationContext);
  const [isActive,setActive] = useState(0);
  const [istimeing,setTiming] = useState(0);
  const [isdosage,setDosage] = useState(0);
  const [isduration,setDuration] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [medicineData, setMedicineData] = useState([]);
  const [timingTextboxes, setTimingTextboxes] = useState({});
  const [dosageTextboxes, setdosageTextboxes] = useState({});
  const [durationTextboxes, setdurationTextboxes] = useState({});
  const [selectedModalities, setSelectedModalities] = useState({});
  
  const timings = [
    {label:'2 hr',value:'2'},
    {label:'4 hr',value:'4'},
    {label:'8 hr',value:'8'},
    {label:'10 hr',value:'10'},
    {label:'12 hr',value:'12'},
    {label:'24 hr',value:'24'},
  ];
  const dosage = [
    {label:'once',value:'once'},
    {label:'2 times',value:'2times'},
    {label:'3 times',value:'3times'},
  ];
  const modality = useMemo(() => [
    {label:'Before Food',value:'BF'},
    {label:'After Food',value:'AF'},
    {label:'With Food',value:'WF'}
  ], []);
  const duration = [
    {label: '1 d', value : "1"},
    {label: '2 d', value : "2"},
    {label: '3 d', value : "3"},
    {label: '4 d', value : "4"},
    {label: '5 d', value : "5"},
    {label: '7 d', value : "7"}
  ];


  useEffect(() => {
    // Fetch saved medicines for the appointment
      fetch(`${config.API_BASE_URL}/api/v1/consultation-medicine/?appointment_id=${appointmentid}`, {
        method: "GET",
        headers: { "Authorization": `JWT ${authTokens?.access}` }
      })
      .then((res) => res.json())
      .then((data) => {
          const existingMedicines = data.map((medicine) => ({
            value: medicine.medicine_id,
            label: medicine.medicine_name,
            timing: medicine.medicine_timing,
            dosage: medicine.medicine_dosage,
            modality: medicine.medicine_modality,
            duration: medicine.medicine_duration,
            instruction: medicine.medicine_instruction
          }));
          setSelectedMedicines(existingMedicines);
          setFetchedMedicines(existingMedicines);
          const initialTimingTextboxes = existingMedicines.reduce((acc, medicine, index) => {
            acc[index] = medicine.timing.split(' ')[0];
            return acc;
          }, {});
          const initialDosageTextboxes = existingMedicines.reduce((acc, medicine, index) => {
            acc[index] = medicine.dosage.split(' ')[0];
            return acc;
          }, {});
          const initialDurationTextboxes = existingMedicines.reduce((acc, medicine, index) => {
            acc[index] = medicine.duration.split(' ')[0];
            return acc;
          }, {});
          const initialSelectedModalities = existingMedicines.reduce((acc, medicine, index) => {
            const modalityIndex = modality.findIndex(s => s.value === medicine.modality);
            acc[index] = modalityIndex;
            return acc;
          }, {});
          setTimingTextboxes(initialTimingTextboxes);
          setdosageTextboxes(initialDosageTextboxes);
          setdurationTextboxes(initialDurationTextboxes);
          setSelectedModalities(initialSelectedModalities);
      })
        .catch((error) => {
          console.error('Error fetching data:', error);
      });

      // Fetch all medicines for the dropdown
      fetch(`${config.API_BASE_URL}/api/v1/medicine-master/`, {
        method: "GET",
        headers: { "Authorization": `JWT ${authTokens?.access}` }
      })
      .then((res) => res.json())
      .then((data) => {
        const allMedicines = data.map((medicine) => ({
          value: medicine.id,
          label: medicine.medicine_name,
        }));
        setAllMedicines(allMedicines);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

        // Fetch all Templates for the dropdown
      fetch(`${config.API_BASE_URL}/api/v1/template-master/?template_type=MS`, {
        method: "GET",
        headers: { "Authorization": `JWT ${authTokens?.access}` }
        })
        .then((res) => res.json())
        .then((data) => {
          const allTemps = data.map((temp) => ({
            value: temp.id,
            label: temp.template_name,
          }));
          setMedicineTemplates(allTemps);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
  }, [authTokens, appointmentid, modality]);
  const handleTimingChange = (e, index) => {
    const newMeds = [...selectedMedicines];
    newMeds[index].timing = e.target.value;
    setSelectedMedicines(newMeds);
    setTimingTextboxes(prevState => ({
      ...prevState,
      [index]: e.target.value,
    }));
 };
 const handleModalityClick = (mindex) => {
  setSelectedModalities(prevState => ({
    ...prevState,
    [isActive]: mindex,
  }));
};
  const handleDurationChange = (event,index) => {
    const newMeds = [...selectedMedicines];
    newMeds[index].duration = event.target.value.trim();
    setSelectedMedicines(newMeds);
    setdurationTextboxes(prevState => ({
      ...prevState,
      [index]: event.target.value,
    }));
  };
  const handleInstructionChange = (event,index) => {
    const newMeds = [...selectedMedicines];
    newMeds[index].instruction = event.target.value;
    setSelectedMedicines(newMeds);
  };
  const handleDosageChange = (event,index) => {
    const newMeds = [...selectedMedicines];
    const dosageParts = newMeds[index].dosage ? newMeds[index].dosage.split(' ') : ['', ''];
    dosageParts[0] = event.target.value;
    newMeds[index].dosage = dosageParts.join(' ');
    setSelectedMedicines(newMeds);
    setdosageTextboxes(prevState => ({
      ...prevState,
      [index]: event.target.value,
    }));
  };
  const handleDosageUnitChange = (e, index) => {
    const newMeds = [...selectedMedicines];
    const dosageParts = newMeds[index].dosage ? newMeds[index].dosage.split(' ') : ['', ''];
    dosageParts[1] = e.target.value;
    newMeds[index].dosage = dosageParts.join(' ');
    setSelectedMedicines(newMeds);
   };
  const handleSearchDropdownChange = (values) => {
    const updatedSymptoms = [...fetchedMedicines, ...templateMedicines, ...values];
    setSelectedMedicines(updatedSymptoms);
  };

  const handleSave = () => {
    const medicineData = selectedMedicines.map((medicine, index) => {
      const timing = document.getElementById(`timing_${index}`).value === "" ? "N/A" : document.getElementById(`timing_${index}`).value;
      const dosage = document.getElementById(`dosage_${index}`).value === "" ? "N/A" : document.getElementById(`dosage_${index}`).value;
      const dosage_unit = document.getElementById(`dosage_unit_${index}`).value;
      const modalityIndex = selectedModalities[index];
      const modalityvalue = modalityIndex !== undefined && modality[modalityIndex] ? modality[modalityIndex].value : null;
      const duration = document.getElementById(`duration_${index}`).value === "" ? "N/A" : document.getElementById(`duration_${index}`).value;
      const notes = document.getElementById(`notes_${index}`).value;
      return {
        medicine_name: medicine.label,
        timing: `${timing} hr`,
        dosage: `${dosage} ${dosage_unit}`,
        modality: modalityvalue,
        duration: `${duration} days`,
        instruction: notes
      };
    });
    try {
      if (selectedMedicines.length > 0){
        MedicinePost(appointmentid,medicineData);
      }
      setSelected(isSelected + 1)
    } catch (error) {
      console.error("Post failed", error);
    }
  }
  const openPopup = () => {
    setIsPopupVisible(true);
    const medicineData = selectedMedicines.map((medicine, index) => {
      const timing = document.getElementById(`timing_${index}`).value;
      const dosage = document.getElementById(`dosage_${index}`).value;
      const dosage_unit = document.getElementById(`dosage_unit_${index}`).value;
      const modalityvalue = modality[selectedModalities[index]].value;
      const duration = document.getElementById(`duration_${index}`).value;
      const notes = document.getElementById(`notes_${index}`).value;
      return {
        medicine_id : medicine.value,
        medicine_timing: `${timing} hr`,
        medicine_dosage:`${dosage} ${dosage_unit}`,
        medicine_modality: modalityvalue ? modalityvalue : null,
        medicine_duration: `${duration} days`,
        medicine_instruction: notes
      };
    });
    setMedicineData(medicineData);
    console.log(medicineData);
  };

  const handleValuesChange = (selectedOption) => {
    if (selectedOption) {
      fetch(`${config.API_BASE_URL}/api/v1/template-master/${selectedOption.value}`, {
        method: "GET",
        headers: { "Authorization": `JWT ${authTokens?.access}` }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.medicine_sets)
          const Tempdata = data.medicine_sets.map((temp) => ({
            value: temp.medicine_id,
            label: temp.medicine_name,
            timing: temp.medicine_timing,
            dosage: temp.medicine_dosage,
            modality: temp.medicine_modality,
            duration: temp.medicine_duration,
            instruction: temp.medicine_instruction
          }));
          setTemplateMedicines(Tempdata);
          const updatedSymptoms = [...fetchedMedicines, ...Tempdata];
          setSelectedMedicines(updatedSymptoms);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
   };
   
   const handleCancelClick = (index) => {
    const updatedMedicines = selectedMedicines.filter((_, i) => i !== index);
    setSelectedMedicines(updatedMedicines);
    setActive(null);
   };

  const ontimingclick = (tindex, ttext) => {
    setTiming(tindex);
    setTimingTextboxes(prevState => ({
      ...prevState,
      [isActive]: ttext.value,
    }));
  };

  const onDosageclick = (dindex, dtext) => {
    setDosage(dindex);
    setdosageTextboxes(prevState => ({
      ...prevState,
      [isActive]: dtext.value,
    }));
 };

 const onDurationclick = (dindex, dtext) => {
  setDuration(dindex);
  setdurationTextboxes(prevState => ({
    ...prevState,
    [isActive]: dtext.value,
  }));
  };


  return (
    <div  className="cardContainer" style={{"flexDirection": 'column'}}>
      <div className="textbox-cointainer">
        <div style={{"width": '70%'}}><SearchDropdown options={allMedicines} placeholder={'Search or add Medicines'} onValuesChange={handleSearchDropdownChange}/></div>
        <div style={{"width":"30%"}}>
          <Select
            defaultValue={MedicineTemplates}
            options={MedicineTemplates} 
            placeholder={'Search for Templates'}
            onChange={handleValuesChange}
            isClearable
          />
        </div>
      </div>
      <div className="medicine-cointainer">
        <div className="medlist">
          {
            selectedMedicines.map((text,index)=>{
              return  <div key={index} className={isActive === index ? 'meds selected' : 'meds'} onClick={ () => setActive(index)}><GiMedicines className="icon" style={{"fontSize":"2vw"}}/>{text.label} <div onClick={() => handleCancelClick(index)}><MdOutlineCancel /></div></div>
            })
          }
        </div>
        {
          isPopupVisible ? <PopupCard data={medicineData} setOpenModal={setIsPopupVisible} api={MedicineTemplatePost}/> 
          : <>
              {
                selectedMedicines.map((text,index)=>(
                  <div key={index} className="medtimings" style={isActive === index ? {display:"flex"} : {display:"none"}}>
                    <div className={isActive === index ? 'timebox' : 'blockbox'}>
                      <h6 style={{color:"#005F73",fontSize:'1vw'}}>{text.label}</h6>
                      <div style={{"display":"flex","flexDirection":"column","alignItems":"flex-start","justifyContent":"flex-start","width":"100%","height":"90%",padding:"0 0.5vw",gap:'1vh'}}>
                        <h5 style={{  fontSize: '1.4vw',margin:'0'}}>Dosage</h5>
                        <div className="button-container" style={{ height: '30%',justifyContent: 'flex-start',alignItems: 'center',fontSize: '1.3vw'}}>
                          {
                            timings.map((ttext,tindex)=>{
                              return <button className={istimeing === tindex ? 'btnselected' : ''} onClick={() => ontimingclick(tindex, ttext)} key={tindex}>{ttext.label}</button>
                            })
                          }
                          <input type="number" value={timingTextboxes[index] || ''} onChange={(e) => handleTimingChange(e, index)} id={`timing_${index}`} />
                          <h5>hr</h5>
                        </div>
                        <div className="button-container" style={{ height: '30%',justifyContent: 'flex-start',alignItems: 'center',fontSize: '1.3vw'}}>
                          {
                            dosage.map((dtext,dindex)=>{
                              return <button style={{width: '15%'}} className={isdosage === dindex ? 'btnselected' : ''}  onClick={ () => onDosageclick(dindex,dtext)} key={dindex}>{dtext.label}</button>
                            })
                          }
                          <input type="text" value={dosageTextboxes[index] || ''} onChange={(e) => handleDosageChange(e, index)} id={`dosage_${index}`}/>
                          <select name="dosage_unit" id={`dosage_unit_${index}`} value={text.dosage ? text.dosage.split(' ')[1] : ''} onChange={(e) => handleDosageUnitChange(e, index)}>
                            <option value="perday">Per Day</option>
                            <option value="permonth">Per Month</option>
                          </select>
                        </div>
                        <div className="button-container" style={{ height: '30%',justifyContent: 'flex-start',alignItems: 'center',fontSize: '1.3vw'}}>
                          {
                            modality.map((mtext,mindex)=>{
                              return <button style={{width: '25%'}} className={selectedModalities[isActive] === mindex ? 'btnselected' : ''}  onClick={() => handleModalityClick(mindex)} key={mindex}>{mtext.label}</button>
                            })
                          }
                        </div>
                        <h5 style={{  fontSize: '1.4vw',margin:'0'}}>Duration</h5>
                        <div className="button-container" style={{width: '100%', height: '30%',justifyContent: 'flex-start',alignItems: 'center',fontSize: '1.3vw'}}>
                          {
                            duration.map((dtext,dindex)=>{
                              return <button  className={isduration === dindex ? 'btnselected' : ''}  onClick={ () => onDurationclick(dindex,dtext)} key={dindex}>{dtext.label}</button>
                            })
                          }
                          <input type="number" value={durationTextboxes[index] || ''} onChange={(e) => handleDurationChange(e, index)} id={`duration_${index}`}/>
                          <h5>Days</h5>
                        </div>
                      </div>
                    </div>
                    <div style={{display: 'flex',gap: '2vh', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center',width: '30%', height: '100%'}}>
                      <button className="bookmarkBtn" onClick={openPopup}>
                        <span className="IconContainer">
                          <svg viewBox="0 0 384 512" height="3vh" className="icon">
                            <path
                              d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                            ></path>
                          </svg>
                        </span>
                        <div className="text">Save Template</div>
                      </button>
                      <textarea style={{padding: '1vw'}} value={text.instruction} onChange={(e) => handleInstructionChange(e, index)} id={`notes_${index}`} placeholder='Note'></textarea>
                    </div>
                  </div>
                ))
              }
            <div className="medbuttons">
              <button className="hoverbutton" style={{"padding":'0px 3vw'}} onClick={()=>setSelected(isSelected + 1)}>Skip</button>
              <button onClick={()=>handleSave()} className="hoverbutton" style={{"padding":'0px 3vw','borderColor': '#74c0c3','backgroundColor': '#74c0c3','color': 'white'}}>Next</button>
            </div>
          </> 
        }
      </div>
    </div>
  )
}
