import React, { useContext, useEffect, useRef, useState } from "react";
import NavBar from "../components/nav_sidebar/NavBar";
import SideBar from "../components/nav_sidebar/SideBar";
import "./style.css";
import { FcNext, FcPrevious } from "react-icons/fc";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
} from "date-fns";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import config from "../config";
const swal = require("sweetalert2");

export default function BookAppointment() {
  const location = useLocation();
  const sidebarRef = useRef(null);
  const userName = location.state?.userName;
  const [loading, setLoading] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(currentMonth);

  const renderDaysOfWeek = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days.map((day, index) => <div key={index}>{day}</div>);
  };

  const renderCalendarDays = () => {
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return days.map((day, index) => (
      <div
        key={index}
        onClick={() => setSelectedDate(new Date(day))}
        className={
          day.toDateString() === selectedDate.toDateString()
            ? "selected-day"
            : ""
        }
      >
        {format(day, "d")}
      </div>
    ));
  };

  // const [time, updateTime] = useState(new Date());
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     updateTime(new Date());
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);
  // const timeComponents = time.toLocaleTimeString().split(':');
  // const currentHour = parseInt(timeComponents[0]);
  // const currentMinute = parseInt(timeComponents[1]);
  // const currentSecond = parseInt(timeComponents[2]);
  // const timeString = time.toLocaleTimeString(undefined, { hour12: true });
  // const amPM = timeString.split(' ')[1];
  const { authTokens, user } = useContext(AuthContext);

  const [appointmentType, setAppointmentType] = useState("IA");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("ML");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [address, setAddress] = useState("");
//   const [height, setHeight] = useState(0);
//   const [weight, setWeight] = useState(0);
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setYear("");
    setMonth("");
    setDay("");
    setAppointmentType("IA");
    setGender("ML");
    setSelectedDate(new Date());
  };
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    const appointmentData = {
      appointment_datetime: format(selectedDate, "yyyy-MM-dd"),
      type: appointmentType,
      doctor_id: user.user_id,
      patient_detail: {
        phone_number: phoneNumber,
        email: email,
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        date_of_birth: `${year}-${month}-${day}`,
        // age : parseInt(age)
        // height: height,
        // weight: weight,
        address:address,
      },
    };

    try {
      const response = await fetch(
        `${config.API_BASE_URL}/api/v1/appointment/add/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${authTokens?.access}`,
          },
          body: JSON.stringify(appointmentData),
        }
      );

      if (response.status === 201) {
        resetForm();
        swal.fire({
          title: "Appointment Added",
          icon: "success",
          toast: true,
          timer: 6000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
        // navigate("/")
      } else {
        console.error("Failed to save appointment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenSidebarToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="bookappointmentpage">
      <NavBar
        OpenSidebar={OpenSidebar}
        openSidebarToggle={openSidebarToggle}
        userName={userName}
      />
      <SideBar
        ref={sidebarRef}
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        userName={userName}
      />
      <div className="form-content">
        <h2>Book New Appointment</h2>
        <h3>Add an appointment for a patient</h3>
        <form onSubmit={handleSubmit}>
          <h4>Appointment Details</h4>
          <div className="firstrow">
            <div className="firstname">
              <label>First name*</label>
              <input
                type="text"
                placeholder="Enter Patient's first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="firstname">
              <label>Last name</label>
              <input
                type="text"
                placeholder="Enter Patient's Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="firstrow">
            <div className="firstname">
              <label>Phone Number*</label>
              <input
                type="text"
                placeholder="Enter Patient's Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="firstname">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Patient's Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="firstrow">
            <div className="firstname">
              <label>D.O.B*</label>
              <div
                style={{
                  width: "100%",
                  height: "55%",
                  gap: "1vw",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexDirection: "row",
                }}
              >
                <input
                  type="text"
                  style={{ height: "100%" }}
                  name="day"
                  placeholder="Day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  required
                />
                <input
                  type="text"
                  style={{ height: "100%" }}
                  name="month"
                  placeholder="Month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                />
                <input
                  type="text"
                  style={{ height: "100%" }}
                  name="year"
                  placeholder="Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="firstname">
              <label>Gender</label>
              <select
                style={{ height: "55%" }}
                name="appointment_type"
                id="appointment_type"
                placeholder="Select Appointment Type"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="ML">Male</option>
                <option value="FL">Female</option>
                <option value="OT">Others</option>
              </select>
            </div>
            {/* <div className="firstname">
              <label>{"Height (in cm)"}</label>
              <input
                type="number"
                placeholder="Enter Patient's Height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="firstname">
              <label>{"Weight (in kg)"}</label>
              <input
                type="number"
                placeholder="Enter Patient's Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div> */}
          </div>
          <div className="firstrow">
            <div className="firstname">
              <label>Appointment type*</label>
              <select
                style={{ height: "55%" }}
                name="appointment_type"
                id="appointment_type"
                placeholder="Select Appointment Type"
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
              >
                <option value="IA">New Consult</option>
                <option value="FA">Follow Up</option>
              </select>
            </div>
            <div className="firstname">
              <label>Address</label>
              <input type="text" value={address} placeholder="Enter Patient's Address" onChange={(e)=>setAddress(e.target.value)} />
            </div>
          </div>
          <div className="firstrow" style={{ justifyContent: "center" }}>
            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              <input type="submit" value="Book Appointment" />
            )}
          </div>
        </form>
      </div>
      <div className="calendar-content">
        <div className="calender-container">
          <div className="date-picker">
            <div className="month-year">
              <button
                onClick={() => setCurrentMonth((prev) => subMonths(prev, 1))}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <FcPrevious />
              </button>
              <div className="current-month">
                {format(currentMonth, "MMMM yyyy")}
              </div>
              <button
                onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <FcNext />
              </button>
            </div>
            <div className="days-of-week">{renderDaysOfWeek()}</div>
            <div className="calendar-days">{renderCalendarDays()}</div>
            {/* {selectedDate && <div>Selected Date: {format(selectedDate, 'MMMM d, yyyy')}</div>} */}
          </div>
          <div className="clock-container">
            {/* <h2>Current Time</h2>
                        <div className="clock">
                            <div className="block">{currentHour}</div>
                            <div className="block">{currentMinute}</div>
                            <div className="block">{currentSecond}</div>
                            <div className="block">{amPM}</div>
                        </div> */}
            <h2>Select Session</h2>
            <div
              className="firstrow"
              style={{
                width: "100%",
                height: "6vh",
                maxHeight: "10vh",
                gap: "1vw",
                display: "flex",
              }}
            >
              <button>Morning</button>
              <button>Afternoon</button>
              <button>Evening</button>
            </div>
            <div className="slotselection-container">Comming Soon</div>
          </div>
        </div>
      </div>
    </div>
  );
}
