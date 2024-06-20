import React from 'react';
import { useState } from 'react';
import { CgClose } from "react-icons/cg";

export default function PopupCard({ setOpenModal,api,data }) {
  const [title, setTitle] = useState('');
  const handleSave = () => {
    try {
      if (data.length > 0 && title.length > 0){
        api(data,title);
        setOpenModal(false);
      }
    } catch (error) {
      console.error("Post failed", error);
    }
  }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <CgClose />
          </button>
        </div>
        <div className="title">
          <h4>Give a Suitable Name for This Template</h4>
        </div>
        <div className="body">
          <input type="text" placeholder="Enter the title for this Template" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        </div>
        <div className="foot">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button type='submit' onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  )
}
