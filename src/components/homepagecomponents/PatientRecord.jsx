import React, { useState, useEffect, useContext } from 'react';
import config from "../../config";
import "./style.css";
import { FaArrowRightLong } from "react-icons/fa6";
import ConsultationContext from '../../context/ConsultationContext';
import { TiTick } from "react-icons/ti";

 const PatientRecord = ({AppointmentId,PatientName,AppointmentStatus,user,PatientAge}) => {
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/api/v1/consultation/prescriptions/${AppointmentId}`); 
        if(response.ok){

          const blob = await response.blob();
        const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      }else{
        setPdfUrl(null)
      }
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPdf();
  }, [AppointmentId]);
  const { CreateConsultation } = useContext(ConsultationContext);
  // const [year, month, day] = PatientAge.split('-').map(Number);
  const handleClick = async () => {
    try {
      await CreateConsultation(AppointmentId);
    } catch (error) {
      console.log(error);
    }
  }
  console.log({AppointmentId,PatientName,AppointmentStatus,user,PatientAge})

  return (
    <div className="record">
      {pdfUrl ? <embed src={pdfUrl} type="application/pdf" width="100%" height="100%" className='rounded-3xl text-center' />
      :<div className="record">
      <div style={{'fontSize': '1.3vw'}}>No Records Found</div>
    </div>}
    <div className="buttons">
            {
              user.is_doctor === true ? AppointmentStatus === 'CL' ? <button style={{"width": "30%","borderColor": "green","color": "green"}} className="hoverbutton p-2">Completed <TiTick /></button> :
              <button style={{"width": "30%"}} className="hoverbutton" onClick={handleClick}>Proceed <FaArrowRightLong /></button>
              : null 
            }
            {/* <button className="hoverbutton">Follow Up</button>
            <button className="hoverbutton">Reschedule</button> */}
      </div>
    </div>
  );
};



export default PatientRecord