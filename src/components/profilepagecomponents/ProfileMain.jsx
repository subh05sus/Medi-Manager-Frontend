import React from "react";
import "./style.css";
import img from "../images/doctor.png";
import { useNavigate } from "react-router-dom";
import PatientGrowthGraph from "./PatientGrowthGraph";
import ProfileCards from "./ProfileCards";
// import SubscriptionCardContent from './SubscriptionCardContent';
import AppointmentCardContent from "./AppointmentCardContent";
import SavedPatientsCardContent from "./SavedPatientsCardContent";
import FeeSetupCardContent from "./FeeSetupCardContent";
import { FaPen } from "react-icons/fa6";

export default function ProfileMain({ userName, userPhoneNumber }) {
  const navigate = useNavigate();

  const data = {
    series: [
      {
        name: "Patient FootFall",
        type: "line",
        data: [50, 25, 36, 30, 45, 35, 64, 82, 69, 36, 39, 20],
        color: "#095D7E",
      },
    ],
  };
  const cards = [
    // {
    //   id: 1,
    //   heading : 'Subscription',
    //   subheading : 'Free',
    //   body : <SubscriptionCardContent/>
    // },
    {
      id: 1,
      heading: "Appointment Process",
      subheading: "Personalise appointment flow",
      body: <AppointmentCardContent />,
    },
    {
      id: 2,
      heading: "Saved Patients",
      subheading: "View saved patients",
      body: <SavedPatientsCardContent />,
    },
    {
      id: 3,
      heading: "Fee Setup",
      subheading: "View your Fee",
      body: <FeeSetupCardContent />,
    },
  ];
  return (
    <div className="MainContent">
      <div className="layout">
        <div className="firstcolumn">
          <div
            onClick={() =>
              navigate("/doc/profile-update", { state: { userName: userName } })
            }
            className="cards"
            style={{
              gap: "1vw",
              width: "28%",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div className="profile-pic">
              <img src={img} alt="Avatar" />
            </div>
            <div>
              <div className="heading">{userName}</div>
              <div className="sub-heading">{userPhoneNumber}</div>
              <div className="sub-heading">User Profile</div>
            </div>
          </div>
          <div
            className="cards"
            style={{ width: "18%", backgroundColor: "#e7e5e6" }}
          >
            <div className="heading">Subscription</div>
            <div className="sub-heading">Free</div>
          </div>
          {cards.map((item) => {
            return <ProfileCards key={item.id} content={item} />;
          })}
        </div>
        <div
          style={{
            textAlign: "left",
            backgroundColor: "#cde5e8",
            alignItems: "center",
            padding: "25px 15px",
            fontSize: "x-large",
            display:"flex",
            justifyContent:"space-between",
            borderRadius:"12px",
            cursor:"pointer"
            }}
            onClick={() =>
                navigate("/doc/edit-clinic", { state: { userName: userName } })
              }
            >
          <span
          style={{
              fontWeight: "400",
          }}
          >Edit Clinic</span>
          <span>
            <FaPen />
          </span>
        </div>

        <div className="secondcolumn">
          <div
            className="cards"
            style={{ justifyContent: "flex-start", gap: "3vh" }}
          >
            <div className="head">
              <div className="heading">Revenue</div>
              <select>
                <option>All</option>
                <option>Daily</option>
                <option>Weakly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="graph-container">
              <PatientGrowthGraph data={data} />
            </div>
          </div>
          <div
            className="cards"
            style={{ justifyContent: "flex-start", gap: "3vh" }}
          >
            <div className="head">
              <div className="heading">Patient Footfall</div>
              <select>
                <option>All</option>
                <option>Daily</option>
                <option>Weakly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="graph-container">
              <PatientGrowthGraph data={data} />
            </div>
          </div>
        </div>
        <div className="secondcolumn">
          <div
            className="cards"
            style={{ justifyContent: "flex-start", gap: "3vh" }}
          >
            <div className="head">
              <div className="heading">Comming Soon</div>
              <select>
                <option>All</option>
                <option>Daily</option>
                <option>Weakly</option>
                <option>Monthly</option>
              </select>
            </div>
            {/* <div className="graph-container"><PatientGrowthGraph data={data}/></div> */}
          </div>
          <div
            className="cards"
            style={{ justifyContent: "flex-start", gap: "3vh" }}
          >
            <div className="head">
              <div className="heading">Comming Soon</div>
              <select>
                <option>All</option>
                <option>Daily</option>
                <option>Weakly</option>
                <option>Monthly</option>
              </select>
            </div>
            {/* <div className="graph-container"><PatientGrowthGraph data={data}/></div> */}
          </div>
          {/* <div className="firstrow">
                <div style={{'width':'100%',"height" : "18%",display:'flex',flexDirection:'row',gap:'1vw',justifyContent:'space-between',alignItems:'center'}}>
                    <div onClick={() => navigate("/profile-consultationFee",{state:{ userName: userName }})} className="cards" style={{"width" : "55%"}}>
                        <div className='heading'>Consultation Fee</div>
                        <div className='sub-heading'>View your Fee</div>
                    </div>
                    <div className="cards" style={{"width" : "45%"}}>
                        <div className='heading'>Appointment</div>
                        <div className='sub-heading'>Online/Offline</div>
                    </div>
                </div>
                <div className="cards" style={{height: '50%',justifyContent: 'flex-start','gap': '3vh'}}>
                    <div className="head">
                        <div className='heading'>Symptoms</div>
                        <select>
                            <option>All</option>
                            <option>Daily</option>
                            <option>Weakly</option>
                            <option>Monthly</option>
                        </select>
                    </div>
                        <div className="graph-container"><PatientGrowthGraph data={data}/></div>
                    </div>
            </div> */}
          {/* <div className="secondrow">
                <div className="cards" style={{justifyContent: 'flex-start','gap': '3vh'}}>
                    <div className="head">
                        <div className='heading'>Patients</div>
                        <select>
                            <option>All</option>
                            <option>Daily</option>
                            <option>Weakly</option>
                            <option>Monthly</option>
                        </select>
                    </div>
                    <div className="graph-container"><PatientGrowthGraph data={data}/></div>
                </div>
                <div className="cards" style={{justifyContent: 'flex-start','gap': '3vh'}}>
                    <div className="head">
                        <div className='heading'>Symptoms</div>
                        <select>
                            <option>All</option>
                            <option>Daily</option>
                            <option>Weakly</option>
                            <option>Monthly</option>
                        </select>
                    </div>
                    <div className="graph-container"><PatientGrowthGraph data={data}/></div>
                </div>
            </div> */}
        </div>
      </div>
    </div>
  );
}
