import React, { useContext, useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import ConsultationContext from "../context/ConsultationContext";
import config from "../config";
import AuthContext from "../context/AuthContext";

export default function BillingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { appointmentid } = location.state;
  const { ConsultationPatch, PrescriptionPrint } =
    useContext(ConsultationContext);
  const { authTokens } = useContext(AuthContext);
  const [followUpDate, setFollowUpDate] = useState();
  const [referTo, setReferTo] = useState("NA");
  const [allPrxData, setallPrxData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [specialitization, setSpecialitization] = useState("NA");
  useEffect(() => {
    fetch(
      `${config.API_BASE_URL}/api/v1/consultation/rx/?appointment_id=${appointmentid}`,
      {
        method: "GET",
        headers: { Authorization: `JWT ${authTokens?.access}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setallPrxData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [authTokens, appointmentid]);
  const [clinicName, setClinicName] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [clinicPhone, setClinicPhone] = useState("");
  const [timing, setTiming] = useState("");
  const [patientData] = useState(() => {
    const data = localStorage.getItem("patientData");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    const existingPatient = patientData.find((p) => p.id === appointmentid);
    if (existingPatient) {
      setHeight(existingPatient.height);
      setWeight(existingPatient.weight);
    } else {
      setHeight();
      setWeight();
    }
  }, [appointmentid, patientData]);

  useEffect(() => {
    // Fetching items from localStorage
    setClinicName(localStorage.getItem("clinicName") || "");
    setClinicAddress(localStorage.getItem("clinicAddress") || "");
    setClinicPhone(localStorage.getItem("phone") || "");
    setTiming(localStorage.getItem("timing") || "");
  }, []);
  const handleSubmit = async () => {
    try {
      console.log("submitted");
      await ConsultationPatch(
        appointmentid,
        referTo,
        followUpDate,
        height,
        weight,
        specialitization,
        clinicName,
        clinicAddress,
        clinicPhone,
        timing
      );
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  const handlePrint = async () => {
    try {
      //  console.log(appointmentid,
      //   referTo,
      //   followUpDate,
      //   height,
      //   weight,
      //   specialitization,
      //   clinicName,
      //   clinicAddress,
      //   clinicPhone,
      //   timing,);
      await PrescriptionPrint(
        appointmentid,
        referTo,
        followUpDate,
        height,
        weight,
        specialitization,
        clinicName,
        clinicAddress,
        clinicPhone,
        timing
      );
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  return (
    <div className="page-grid">
      <div className="topbar">
        <div className="start-div">
          <div
            className="menu"
            onClick={() =>
              navigate("/doc/newconsult", {
                state: { appointmentid: appointmentid },
              })
            }
          >
            <IoMdArrowRoundBack
              className="icon"
              aria-label="Back"
              onClick={() =>
                navigate("/newconsult", {
                  state: { appointmentid: appointmentid },
                })
              }
            />
          </div>
          <div className="brandname">Prescription</div>
        </div>
      </div>
      <div className="page-containt">
        <div className="bcard">
          <form className="formarea">
            <h2>Patient Details</h2>
            <input
              type="date"
              placeholder="Follow Up"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
            />
            <input
              type="text"
              placeholder="Refer To"
              value={referTo}
              onChange={(e) => setReferTo(e.target.value)}
            />
            <input
              type="text"
              placeholder="Specialization"
              value={specialitization}
              onChange={(e) => setSpecialitization(e.target.value)}
            />

            <select>
              <option value="ENG">Billing</option>
              <option value="ENG">Add Billing to PRx</option>
              <option value="ENG">Generate 3C</option>
            </select>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="ENG">English</option>
              <option value="ENG">Hindi</option>
              <option value="ENG">Odia</option>
            </select>
          </form>
          <div className="billarea">
            <div className="bill">
              <div style={{ width: "100%", position: "relative" }}>
                {/* <div className="left"> */}
                <h1
                  style={{
                    fontSize: "2vw",
                    textAlign: "center",
                    paddingBottom: "15px",
                    borderBottom: "1px solid #ddd",
                    position:'relative'
                  }}
                >
                  Prescription
                </h1>
                <div style={{ position: "absolute", right: 0}}>
                  <table style={{ borderCollapse: "collapse", width: "fit" }}>
                    <thead>
                      <tr>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                          colspan="2"
                        >
                          VITALS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Height
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {height}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Weight
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {weight}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          BMI
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {(weight / ((height/100) * (height/100))).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h2 style={{ fontSize: "1.2vw" }}>Symptoms</h2>
                <ul>
                  {allPrxData.symptoms?.map(
                    (data, index) =>
                      (
                        <li key={index}>
                          {data.symptom_name} - {data.duration} ,{" "}
                          {data.severity}
                        </li>
                      ) || <li>No symptoms found.</li>
                  )}
                </ul>
                <h2 style={{ fontSize: "1.2vw" }}>Findings</h2>
                <p>{allPrxData.finding}</p>
                <h2 style={{ fontSize: "1.2vw" }}>Diagnosis</h2>
                <p>{allPrxData.diagnosis}</p>
                <img src="/rx.jpg" alt="" style={{ height: "30px" }} />
                <table
                  style={{
                    marginBottom: "15px",
                    borderCollapse: "collapse",
                    overflowWrap: "anywhere",
                    width: "100%",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                        #
                      </th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                        Medicines
                      </th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                        Dosage
                      </th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                        Timing
                      </th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                        Modality
                      </th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPrxData.medicines?.map((data, index) => (
                      <tr key={index}>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {index + 1}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {data.medicine_name}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {data.medicine_dosage}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {data.medicine_timing}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {data.medicine_modality}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {data.medicine_duration}
                        </td>
                      </tr>
                    )) || (
                      <tr>
                        <td colSpan="3">No medicines found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <h2 style={{ fontSize: "1.2vw" }}>Instructions</h2>
                <ul>
                  {allPrxData.instructions?.map(
                    (data, index) =>
                      <li key={index}>{data.instruction}</li> || (
                        <li>No instructions found.</li>
                      )
                  )}
                </ul>
                <h2 style={{ fontSize: "1.5vw" }}>Investigation</h2>
                <ul>
                  {allPrxData.investigations?.map(
                    (data, index) =>
                      <li key={index}>{data.investigation_name}</li> || (
                        <li>No instructions found.</li>
                      )
                  )}
                </ul>

              </div>
              {/* <div className="right">
              </div> */}
            </div>
            <div className="billbuttonarea">
              <button
                className="hoverbutton"
                style={{ padding: "0px 3vw" }}
                onClick={handlePrint}
              >
                Print
              </button>
              <button
                onClick={() => handleSubmit()}
                className="hoverbutton"
                type="submit"
                style={{
                  padding: "0px 3vw",
                  borderColor: "#74c0c3",
                  backgroundColor: "#74c0c3",
                  color: "white",
                }}
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
