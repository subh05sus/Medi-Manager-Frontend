import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";

const PrxCard = ({isSelected,setSelected}) => {
  return (
    <div className="cardContainer">
      <div className="block1">
        <div className="text-list"></div>
        <div className="adddoc"><IoIosAddCircleOutline style={{'fontSize': '2vw'}}/>Add Docs</div>
      </div>
      <div className="block2">
        <div className="note-cointainer">
          <div className="note">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dicta praesentium illum ducimus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum iste optio velit, accusantium odit tempora repudiandae ipsam officiis! Eos dolorem id mollitia magnam! Dolor maxime, enim officia quas voluptas necessitatibus!</div>
        </div>
        <div className="buttons-cointainer">
            <button className="hoverbutton" style={{"padding":'0px 3vw'}} onClick={()=>setSelected(isSelected)}>Skip</button>
            <button className="hoverbutton" style={{"padding":'0px 3vw','borderColor': '#74c0c3','backgroundColor': '#74c0c3','color': 'white'}}>Next</button>
        </div>
      </div>
    </div>
  );
};
export default PrxCard;