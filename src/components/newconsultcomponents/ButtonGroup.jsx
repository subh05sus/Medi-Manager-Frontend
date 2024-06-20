import React from 'react';
import './style.css';

function ButtonGroup({buttons,isSelected,setSelected}) {
  return (
    <div className='button-container'>
        {
            buttons.map((text,index)=>{
                return <div key ={index}
                className={isSelected === index ? "cardbtn selectedbtn" : 'cardbtn'} 
                onClick={()=>setSelected(index)}>
                {text}
                </div>
            })
        }
    </div>
  )
}

export default ButtonGroup