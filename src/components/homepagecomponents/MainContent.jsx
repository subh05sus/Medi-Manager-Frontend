import React, { useContext, useState } from "react";
import PatientRecord from "./PatientRecord";
import QueueList from "./QueueList";
import Card from "./Card";
import config from "../../config";
import AuthContext from "../../context/AuthContext";
const swal = require("sweetalert2");

function Home({ user }) {
  const [Id, setId] = useState(null);
  const [Name, setName] = useState("");
  const [Status, setStatus] = useState("");
  const [Age, setAge] = useState("");
  const [patientId, setPatientId] = useState();
  const { authTokens } = useContext(AuthContext);
  const cards = [
    {
      id: 1,
      heading: "Send message to patient",
    },
    {
      id: 2,
      heading: "Growth",
    },
    {
      id: 3,
      heading: "Vitals",
    },
    {
      id: 4,
      heading: "Billing",
    },
    {
      id: 5,
      heading: "Reports",
    },
  ];
  const handleSelectedItem = (selectedItem) => {
    console.log("Selected", selectedItem.id);
    setId(selectedItem.id);
    setName(selectedItem.patient_name);
    setStatus(selectedItem.status);
    setAge(selectedItem.patient_age);
    setPatientId(selectedItem.patient_id);
  };
  const handleSave = async () => {
    const response = await fetch(
      `${config.API_BASE_URL}/api/v1/saved-patient/add/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${authTokens?.access}`,
        },
        body: JSON.stringify({
          patient_id: patientId,
        }),
      }
    );
    if (response.status === 201) {
      swal.fire({
        title: "Patient Saved to Favorites",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      swal.fire({
        title: "An Error Occured " + response.status,
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };
  return (
    <>
      <div className="main-container1">
        <QueueList onItemSelected={handleSelectedItem} />
      </div>
      {Id === null ? (
        <div className="noselected">No Patient Selected</div>
      ) : (
        <>
          <div className="main-container2">
            <PatientRecord
              AppointmentId={Id}
              PatientName={Name}
              AppointmentStatus={Status}
              user={user}
              PatientAge={Age}
            />
          </div>
          <div className="main-container3">
            <div className="doctorstatus">
              {user.is_doctor === false ? (
                <>
                  Doctor Online
                  <div className="online-indicator">
                    <span className="blink"></span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={handleSave}
                    title="Like"
                    className="heart-container"
                  >
                    <input
                      id="Give-It-An-Id"
                      className="checkbox"
                      type="checkbox"
                    />
                    <div className="svg-container">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-outline"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-filled"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="100"
                        width="100"
                        className="svg-celebrate"
                      >
                        <polygon points="10,10 20,20"></polygon>
                        <polygon points="10,50 20,50"></polygon>
                        <polygon points="20,80 30,70"></polygon>
                        <polygon points="90,10 80,20"></polygon>
                        <polygon points="90,50 80,50"></polygon>
                        <polygon points="80,80 70,70"></polygon>
                      </svg>
                    </div>
                  </div>
                  <div>Save Patient</div>
                </>
              )}
            </div>
            <div className="blocks">
              {
            cards.map((item) => {
              return <Card key={item.id} content={item} patient={Id} />
            })
          }
              {/* <Card key={cards[0].id} content={cards[0]} />
              <Card key={cards[1].id} content={cards[1]} />
              <div
                key={cards[2].id}
                style={{
                  width: "300px",
                  height: "200px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "20px",
                  textAlign: "center",
                  transition: "box-shadow 0.3s ease-in-out",
                  // boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                  cursor: "pointer",
                }}
              >
                <h1>{cards[2].heading}</h1>
              </div>
              <Card key={cards[3].id} content={cards[3]} />
              <Card key={cards[4].id} content={cards[4]} /> */}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
