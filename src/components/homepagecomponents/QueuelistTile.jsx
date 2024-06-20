import React, { useState } from 'react';
import { IoSunny } from "react-icons/io5";

export default function QueuelistTile({list,onItemSelected}) {
    const [isSelected,setSelected] = useState(null);
    const handleBothClicks = (index,item) => {
        setSelected(index);
        onItemSelected(item);
      };
    const getStatusColor = (status) => {
        switch (status) {
            case 'IP':
                return '#ffff66';
            case 'CL':
                return 'grey';
            default:
                return '#095d7e';
        }
    };

    const getType = (type,status) => {
        switch (type) {
            case 'FA':
                if (status === 'IP'){
                    return 'In-Progress';
                } else {
                    return 'Follow Up';
                }
            case 'IA':
                if (status === 'IP'){
                    return 'In-Progress';
                } else {
                    return 'New Consult';
                }
            case 'CA':
                if (status === 'IP'){
                    return 'In-Progress';
                } else {
                    return 'Closed';
                }
            default:
                break;
        }
    };

  return (
    <>
        {
            list.length === 0 ? (
                    <center style={{'fontSize': '1.2vw'}}>No Appointment Found</center>
                ) : (
                    list.map((item, index) => (
                        <div className={isSelected === index ? "list-item list-itemactive" : 'list-item list-item'} key={item.id} onClick={() => handleBothClicks(index,item)}>
                            <div className={isSelected === index ? "indicator active" : 'indicator'} style={{ backgroundColor: getStatusColor(item.status) }}></div>
                            <div className="name">{item.patient_name}<br/><div style={{'fontSize': '1vw','fontWeight': '500','color': 'grey'}}>{getType(item.type,item.status)}</div></div>
                            <div className="time"><IoSunny /></div>
                        </div>
                    ))
                )
        }
    </>
  )
}
