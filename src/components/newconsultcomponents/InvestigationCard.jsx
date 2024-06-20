import React, { useState ,useEffect, useContext} from 'react';
import SearchDropdown from "./SearchDropdown";
import AuthContext from '../../context/AuthContext';
import ConsultationContext from '../../context/ConsultationContext';
import config from '../../config';
import { GiHypodermicTest } from 'react-icons/gi';
import PopupCard from './PopupCard';
import Select from 'react-select/creatable';
import { MdOutlineCancel } from 'react-icons/md';


export const InvestigationCard = ({isSelected,setSelected,appointmentid}) => {
  const [selectedinvs, setSelectedinvs] = useState([]);
  const [fetchedinvs, setFetchedinvs] = useState([]);
  const [templateinvs, setTemplateinvs] = useState([]);
  const {InvestigationPost,InvestigationTemplatePost} = useContext(ConsultationContext);
  const [Templates, setTemplates] = useState([]);
  const [isActive,setActive] = useState(0);
  const { authTokens } = useContext(AuthContext);
  const [allinv, setInv] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [invData, setInvData] = useState([]);


  useEffect(() => {
    fetch(`${config.API_BASE_URL}/api/v1/consultation-investigation/?appointment_id=${appointmentid}`, {
      method: "GET",
      headers: { "Authorization" : `JWT ${authTokens?.access}` }
    })
      .then((res) => res.json())
      .then((data) => {
        const existingSymptoms = data.map((inv) => ({
          value: inv.id,
          label: inv.investigation_name,
          note: inv.note,
        }));
        setSelectedinvs(existingSymptoms);
        setFetchedinvs(existingSymptoms);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    // Fetch all investigations for the dropdown
    fetch(`${config.API_BASE_URL}/api/v1/investigation-master/`, {
      method: "GET",
      headers: { "Authorization" : `JWT ${authTokens?.access}` }
      })
      .then((res) => res.json())
      .then((data) => {
        const allSymptoms = data.map((inv) => ({
          value: inv.id,
          label: inv.name,
        }));
        setInv(allSymptoms);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    // Fetch all Templates for the dropdown
    fetch(`${config.API_BASE_URL}/api/v1/template-master/?template_type=IS`, {
      method: "GET",
      headers: { "Authorization": `JWT ${authTokens?.access}` }
    })
      .then((res) => res.json())
      .then((data) => {
        const allTemps = data.map((temp) => ({
          value: temp.id,
          label: temp.template_name,
        }));
        setTemplates(allTemps);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }, [authTokens, appointmentid]);

  const handleNoteChange = (e, index) => {
      const newInvs = [...selectedinvs];
      newInvs[index].note = e.target.value;
      setSelectedinvs(newInvs);
  };

  const handleSave = async () => {
    const invData = selectedinvs.map((inv, index) => {
      const notes = document.getElementById(`notes_${index}`).value;
      return {
        investigation_name : inv.label,
        note : notes
      };
    });
    try {
      if (selectedinvs.length > 0){
        await InvestigationPost(appointmentid,invData);
      }
      setSelected(isSelected + 1)
    } catch (error) {
      console.error("Post failed", error);
    }
  }

  const handleSearchDropdownChange = (values) => {
    const updatedSymptoms = [...fetchedinvs,...templateinvs, ...values];
    setSelectedinvs(updatedSymptoms);
  };
  
  const openPopup = () => {
    setIsPopupVisible(true);
    const invData = selectedinvs.map((inv, index) => {
      const notes = document.getElementById(`notes_${index}`).value;
      return {
        investigation_id : inv.value,
        note : notes
      };
    });
    setInvData(invData);
  };

  const handleValuesChange = (selectedOption) => {
    if (selectedOption) {
      fetch(`${config.API_BASE_URL}/api/v1/template-master/${selectedOption.value}`, {
        method: "GET",
        headers: { "Authorization": `JWT ${authTokens?.access}` }
      })
        .then((res) => res.json())
        .then((data) => {
          const Tempdata = data.investigation_sets.map((temp) => ({
            value: temp.investigation_id,
            label: temp.investigation_name,
            note: temp.note,
          }));
          setTemplateinvs(Tempdata);
          const updatedSymptoms = [...fetchedinvs, ...Tempdata];
          setSelectedinvs(updatedSymptoms);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
   };

   const handleCancelClick = (index) => {
    const updatedMedicines = selectedinvs.filter((_, i) => i !== index);
    setSelectedinvs(updatedMedicines);
   };

  return (
    <div  className="cardContainer" style={{"flexDirection": 'column'}}>
      <div className="textbox-cointainer">
        <div style={{"width": '70%'}}><SearchDropdown options={allinv} placeholder={'Search or add investigations'} onValuesChange={handleSearchDropdownChange}/></div>
        <div style={{"width":"30%"}}>
          <Select
            defaultValue={Templates}
            options={Templates} 
            placeholder={'Search for Templates'}
            onChange={handleValuesChange}
            isClearable
          />
        </div>
      </div>
      <div className="medicine-cointainer">
        <div className="medlist">
        {
          selectedinvs.map((inv, index) => (
            <div key={index} className={isActive === index ? 'meds selected' : 'meds'} onClick={ () => setActive(index)}><GiHypodermicTest className="icon" style={{"fontSize":"1.5vw"}}/>{inv.label} <div onClick={() => handleCancelClick(index)}><MdOutlineCancel /></div></div>
          ))
        }
        </div>
        {
          isPopupVisible ? <PopupCard data={invData} setOpenModal={setIsPopupVisible} api={InvestigationTemplatePost} /> : 
          <>
              {
                selectedinvs.map((inv, index) => (
                  <div key={index}  className="medtimings" style={isActive === index ? {display:"flex"} : {display:"none"}}>
                    <div className={isActive === index ? 'timebox' : 'blockbox'}>
                      <div className="timingblock" style={{padding:'1vw','flexDirection': 'column', 'alignItems': 'flex-start', 'justifyContent': 'flex-start', 'width': '100%','gap':'4vh','height':'100%'}}>
                        <label style={{ 'fontSize': '1.3vw', 'fontStyle': 'normal', 'fontWeight': '400', 'lineHeight': '1.13213rem', 'letterSpacing': '-0.01125rem' }}>Note:</label>
                        <textarea value={inv.note} onChange={(e) => handleNoteChange(e, index)} id={`notes_${index}`} type="text" style={{ 'border': 'none', 'borderRadius': '0.1875rem', 'background': 'var(--greyish-blue, #EAF0FF)', 'width': '100%', 'height': '100%' }} placeholder="Enter your notes" />
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
                    </div>
                  </div>
                ))
              }
            <div className="medbuttons">
              <button className="hoverbutton" style={{"padding":'0px 3vw'}} onClick={()=>setSelected(isSelected + 1)}>Skip</button>
              <button className="hoverbutton" style={{"padding":'0px 3vw','borderColor': '#74c0c3','backgroundColor': '#74c0c3','color': 'white'}} onClick={()=>handleSave()}>Next</button>
            </div>
          </>
        }
      </div>
    </div>
  )
}
