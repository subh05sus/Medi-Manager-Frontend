import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/nav_sidebar/NavBar";
import SideBar from "../components/nav_sidebar/SideBar";
import { useLocation } from "react-router-dom";

const ClinicInfo = () => {
  const location = useLocation();
  const sidebarRef = useRef(null);
  const userName = location.state?.userName;
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
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

  const [clinicName, setClinicName] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [timing, setTiming] = useState("");

  useEffect(() => {
    // Fetching items from localStorage
    setClinicName(localStorage.getItem("clinicName") || "");
    setClinicAddress(localStorage.getItem("clinicAddress") || "");
    setPhone(localStorage.getItem("phone") || "");
    setTiming(localStorage.getItem("timing") || "");
  }, []);

  const handleSave = () => {
    // Saving items to localStorage
    localStorage.setItem("clinicName", clinicName);
    localStorage.setItem("clinicAddress", clinicAddress);
    localStorage.setItem("phone", phone);
    localStorage.setItem("timing", timing);
    alert("Clinic information saved successfully!");
  };

  const inputStyle = {
    border: "1px solid #cde5e8",
    padding: "8px",
    borderRadius: "12px",
    marginBottom: "10px",
    width: "100%",
  };

  const buttonStyle = {
    border: 0,
    backgroundColor: "#cde5e8",
    padding: "10px 20px",
    borderRadius: "12px",
    cursor: "pointer",
  };

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "40px",
  };

  const phoneAndTimeStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  };

  return (
    <div className="DocProfile-page-container">
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
      <div style={{ padding: "20px" }}>
        <h1>Clinic Information</h1>
        <form>
          <div style={containerStyle}>
            <div>
              <label>Clinic Name:</label>
              <input
                type="text"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label>Clinic Address:</label>
              <input
                type="text"
                value={clinicAddress}
                onChange={(e) => setClinicAddress(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={phoneAndTimeStyle}>
              <div>
                <label>Phone:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label>Clinic Timing:</label>
                <input
                  type="text"
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
          <div style={{ marginTop: "40px" }}>
            <button type="button" onClick={handleSave} style={buttonStyle}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClinicInfo;
