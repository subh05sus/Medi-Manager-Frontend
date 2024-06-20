import React, { useState } from 'react';
import ButtonGroup from '../components/newconsultcomponents/ButtonGroup';
import '../components/newconsultcomponents/style.css';
import { MedicineCard } from '../components/newconsultcomponents/MedicineCard';
import { InvestigationCard } from '../components/newconsultcomponents/InvestigationCard';
import InstructionCard from '../components/newconsultcomponents/InstructionCard';
import { SymptompsCard } from '../components/newconsultcomponents/SymptompsCard';
import { DiagnosisCard } from '../components/newconsultcomponents/DiagnosisCard';
import { FindingsCard } from '../components/newconsultcomponents/FindingsCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoHome, IoStatsChart } from 'react-icons/io5';
import { FaChartLine, FaPrescription } from 'react-icons/fa6';
import { TbReportMedical } from "react-icons/tb";
import NavCard from '../components/newconsultcomponents/NavPopup';


export default function NewConsult() {
  const navigate = useNavigate();
  const buttons = ['Symptoms' ,'Findings', 'Diagnosis','Medicine', 'Investigation','Instruction']
  const [isSelected,setSelected] = useState(0);
  const location = useLocation();
  const { appointmentid } = location.state;

  const RenderComponent = ({index}) =>{
    switch (index) {
      case 0: return <SymptompsCard isSelected={isSelected} setSelected={setSelected} appointmentid={appointmentid}/>
      case 1: return <FindingsCard isSelected={isSelected} setSelected={setSelected} appointmentid={appointmentid}/>
      case 2: return <DiagnosisCard isSelected={isSelected} setSelected={setSelected} appointmentid={appointmentid}/>
      case 3: return <MedicineCard isSelected={isSelected} setSelected={setSelected} appointmentid={appointmentid}/>
      case 4: return <InvestigationCard isSelected={isSelected} setSelected={setSelected} appointmentid={appointmentid}/>
      case 5: return <InstructionCard appointmentid={appointmentid}/>
        
      default:
        break;
    }
  }
  const cards = [
    {
      id: 1,
      heading : 'Prescription',
      icon : <FaPrescription className='icon' style={{color:'#095d7e'}}/>
    },
    {
      id: 2,
      heading : 'Vital Stats',
      icon : <IoStatsChart className='icon' style={{color:'#095d7e'}}/>
    },
    {
      id: 3,
      heading : 'Reports',
      icon : <TbReportMedical className='icon' style={{color:'#095d7e'}}/>
    },
    {
      id: 4,
      heading : 'Growth Chart',
      icon : <FaChartLine className='icon' style={{color:'#095d7e'}}/>
    },
  ];

  return (
    <div className="page-grid">
      <div className='topbar'>
        <div className="start-div">
          <div className="menu" onClick={() => navigate("/doc/home")}><IoHome className='icon'/></div>
          <div className="brandname">New Consult</div>
        </div>
        <div className="end-div">
          {
            cards.map((item) => {
              return <NavCard key={item.id} content={item} />
            })
          }
          {/* <div onClick={() => setShowPopup(true)} style={{cursor:'pointer',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-end',fontSize:'1vw',color:'#095d7e'}}><FaPrescription className='icon' style={{color:'#095d7e'}}/> Prescription</div>
          <div style={{cursor:'pointer',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-end',fontSize:'1vw',color:'#095d7e'}}><IoStatsChart className='icon' style={{color:'#095d7e'}}/> Vital Stats</div>
          <div style={{cursor:'pointer',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-end',fontSize:'1vw',color:'#095d7e'}}><TbReportMedical className='icon' style={{color:'#095d7e'}}/> Reports</div>
          <div style={{cursor:'pointer',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-end',fontSize:'1vw',color:'#095d7e'}}><FaChartLine className='icon' style={{color:'#095d7e'}}/> Growth Chart</div> */}
        </div>
      </div>

      <div className="main-content">
        <ButtonGroup buttons={buttons} isSelected={isSelected} setSelected={setSelected}/>
        <RenderComponent index={isSelected}/>
      </div>
    </div>
  )
}
