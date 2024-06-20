import React, { useContext, useEffect, useState } from "react";
import ConsultationContext from "../../context/ConsultationContext";
import AuthContext from "../../context/AuthContext";
import config from "../../config";
import Select from 'react-select/creatable';

export const FindingsCard = ({ isSelected, setSelected, appointmentid }) => {
 const { FindingsAdd } = useContext(ConsultationContext);
 const [findings, setFindings] = useState("");
 const [previousfindings, setpreviousFindings] = useState([]);
 const [savedfindings, setSavedFindings] = useState([]);
 const { authTokens } = useContext(AuthContext);
 const [isChecked, setIsChecked] = useState(false);

 useEffect(() => {
    const fetchFindings = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/api/v1/consultation/?appointment_id=${appointmentid}`, {
          method: "GET",
          headers: { "Authorization": `JWT ${authTokens?.access}` },
        });
        const data = await response.json();
        setFindings(data[0]?.finding || "");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // api to fetch saved notes
    fetch(`${config.API_BASE_URL}/api/v1/saved-note/?note_type=FND`, {
      method: "GET",
      headers: { "Authorization" : `JWT ${authTokens?.access}` }
    })
      .then((res) => res.json())
      .then((data) => {
        const existing = data.map((x) => ({
          value: x.id,
          label: x.title,
          note : x.note
        }));
        setSavedFindings(existing)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

      // api to fetch all the Previous Findings
    fetch(`${config.API_BASE_URL}/api/v1/consultation/`, {
      method: "GET",
      headers: { "Authorization" : `JWT ${authTokens?.access}` }
    })
      .then((res) => res.json())
      .then((data) => {
        const existing = data.map((x) => ({
          value: x.id,
          label: x.finding,
        }));
        setpreviousFindings(existing)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    fetchFindings();
 }, [authTokens, appointmentid]);

 const handleSave = async () => {
    try {
      if (findings.trim() !== "") {
        await FindingsAdd(appointmentid, findings, isChecked);
        setSelected(isSelected + 1);
      }
    } catch (error) {
      console.error("Post failed", error);
    }
 };
 const handleValuesChange = (selectedValues) => {
  setValue(selectedValues);
  setFindings(prevFindings => prevFindings + ' ' + (selectedValues.label ? selectedValues.label : ''));
};
const handleChange = (selectedValues) => {
  setValue(selectedValues);
  setFindings(prevFindings => prevFindings + ' ' + (selectedValues.label ? selectedValues.label : ''));
};
 const [value,setValue] = useState(null);
 return (
    <div className="cardContainer" style={{ flexDirection: 'column', justifyContent: 'space-evenly'}}>
      <div className="textbox-cointainer">
        <div style={{"width": '70%'}}>
        <Select
          defaultValue={value}
          options={previousfindings}
          onChange={handleChange}
          placeholder={"Search For Findings"}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              maxHeight: '20vh',
              width: '100%',
              border: '1px solid #fff',
              borderRadius: '0.625rem',
              padding: '1px',
              overflowY: 'auto',
              overflowX: 'hidden',
            }),
            multiValue: (styles) => {
              return {
                position : 'relative',
                display: 'flex',
                margin : '5px 5px 2px 0px',
                justifyContent: 'center',
                alignItems: 'center',
                whiteSpace: 'wrap',
                backgroundColor: '#095d7e',
                borderRadius: '10px',
              };
            },
            multiValueLabel: (styles) => ({
              color: '#FFFFFF',
              fontSize: "1rem",
              padding : "0.5rem 0.4rem 0.5rem 0.4rem",
            }),
            multiValueRemove: (styles) => ({
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity : '1',
              color: 'black',
              position: 'absolute',
              right: '-5px',
              top: '-5px',
              padding: '1px',
              borderRadius: '50%',
              backgroundColor : '#EAF0FF',
              ':hover': {
                backgroundColor: 'red',
                color: 'white',
              },
            }),
            placeholder : (baseStyles) => ({
              ...baseStyles,
              color: "#383C44",
              fontSize : "1.125rem"
            }),
            clearIndicator : (baseStyles) => ({
              ...baseStyles,
              color: 'red'
            }),
            dropdownIndicator : (baseStyles) => ({
              ...baseStyles,
              color : "#000",
              padding : "0vw 1vw 0vw 1vw"
            }),
          }}
        />
        </div>
        <div style={{"width":"30%"}}>
        <Select
          defaultValue={value}
          options={savedfindings}
          onChange={handleValuesChange}
          placeholder={"Search For Saved Notes"}
        />
        </div>
      </div>
      <div className="consulttextbox">
          <textarea value={findings} onChange={(e) => setFindings(e.target.value)} type="text" placeholder="Enter Findings Here" />
          <label htmlFor="checkboxInput" className="bookmark">
            <input type="checkbox" id="checkboxInput" value={isChecked} onChange={() => setIsChecked(!isChecked)}/>
            <svg
              width="40%"
              viewBox="0 0 50 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="svgIcon"
            >
              <path
                d="M46 62.0085L46 3.88139L3.99609 3.88139L3.99609 62.0085L24.5 45.5L46 62.0085Z"
                stroke="black"
                strokeWidth="7"
              ></path>
            </svg>
          </label>
      </div>
      {/* <div className="findbox">
        <div style={{"width":"30%",'gap':'2vh',display:'flex',flexDirection:'column',}}>
        <Select
          defaultValue={value}
          options={savedfindings}
          onChange={handleValuesChange}
          placeholder={"Search For Saved Notes"}
        />
        <Select
          defaultValue={value}
          options={previousfindings}
          onChange={handleChange}
          placeholder={"Search For Findings"}
        />
        </div>
        <div className="consulttextbox">
          <textarea value={findings} onChange={(e) => setFindings(e.target.value)} type="text" placeholder="Enter Findings Here" />
          <label htmlFor="checkboxInput" className="bookmark">
            <input type="checkbox" id="checkboxInput" value={isChecked} onChange={() => setIsChecked(!isChecked)}/>
            <svg
              width="40%"
              viewBox="0 0 50 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="svgIcon"
            >
              <path
                d="M46 62.0085L46 3.88139L3.99609 3.88139L3.99609 62.0085L24.5 45.5L46 62.0085Z"
                stroke="black"
                strokeWidth="7"
              ></path>
            </svg>
          </label>
        </div>
      </div> */}
      <div className="buttondiv">
        <button className="hoverbutton" style={{ padding: '0px 3vw' }} onClick={() => setSelected(isSelected + 1)}>Skip</button>
        <button className="hoverbutton" onClick={handleSave} style={{ padding: '0px 3vw', borderColor: '#74c0c3', backgroundColor: '#74c0c3', color: 'white' }}>Next</button>
      </div>
    </div>
 );
};
