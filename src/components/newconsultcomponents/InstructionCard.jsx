import React, { useContext, useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import AuthContext from "../../context/AuthContext";
import ConsultationContext from "../../context/ConsultationContext";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const InstructionCard = ({appointmentid}) => {
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);
  const { InstructionPost } = useContext(ConsultationContext);
  const [message, setMessage] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const fetchInstructions = async () => {
    try {
      if (!appointmentid || !authTokens?.access) return;

      const response = await fetch(`${config.API_BASE_URL}/api/v1/consultation-instruction/?appointment_id=${appointmentid}`, {
        method: "GET",
        headers: { "Authorization": `JWT ${authTokens.access}` }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessage(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (!appointmentid || !authTokens?.access) return;

    fetch(`${config.API_BASE_URL}/api/v1/consultation-instruction/?appointment_id=${appointmentid}`, {
      method: "GET",
      headers: { "Authorization": `JWT ${authTokens.access}` }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [authTokens, appointmentid]);

  const handleSubmit = async (e) => {
    console.log(appointmentid)
    e.preventDefault();

    try {
      await InstructionPost(appointmentid,inputValue);
      setInputValue("");
      fetchInstructions();
    } catch (error) {
      console.error("Post failed", error);
    }
  };
  return (
    <div  className="cardContainer" style={{"flexDirection": 'column','overflow':'hidden'}}>
      <div className="chatbox-cointainer">
        <div className="chat-box">
          {
            message.length === 0 ? (
              <center></center>
          ) : (
            message.slice().reverse().map((text, index) => (
              <div className="chats" key={index}>{text.instruction}</div>
            ))
          )
          }
        </div>
        <div className="textbox">
          <form className="input-wrapper" style={{'backgroundColor':'#ffffff','height':'100%'}} onSubmit={handleSubmit}>
          <input type="text" placeholder="Put medicine ....." id="message" value={inputValue} onChange={(e) => setInputValue(e.target.value)} required/>
            <button type="submit" style={{'border':'none','background':'transparent'}}><FiSend style={{'fontSize':'1.5vw'}} /></button>
          </form>
          <button className="voice"><MdOutlineKeyboardVoice /></button>
        </div>
      </div>
      <div className="medbuttons" style={{'width': '100%'}}>
          <button className="hoverbutton" style={{"padding":'0px 3vw','borderColor': '#74c0c3','backgroundColor': '#74c0c3','color': 'white'}} onClick={() => navigate("/doc/bill",{state:{ appointmentid: appointmentid }})}>Prescription</button>
      </div>
    </div>
  );
};
export default InstructionCard;