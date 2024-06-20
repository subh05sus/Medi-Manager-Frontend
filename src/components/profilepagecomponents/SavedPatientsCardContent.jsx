import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaUser } from 'react-icons/fa';
import config from '../../config';
import AuthContext from '../../context/AuthContext';

export default function SavedPatientsCardContent() {

    const [savedpatients,setSavedpatients] = useState([]);
    const { authTokens } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch(`${config.API_BASE_URL}/api/v1/saved-patient/self/`,{ 
          method: "GET",
          headers: { "Authorization" : `JWT ${authTokens?.access}` }
        })
          .then((res) => res.json())
          .then((data) => {
            setSavedpatients(data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, [authTokens]);

      const filteredList = savedpatients.filter(data =>
        data.patient.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <motion.div className='card-containt'>
                <motion.div className="searchbar"><FaSearch id="search-icon" /><input placeholder="Search...." onChange={(e) => setSearchTerm(e.target.value)}/></motion.div>
                <motion.ul className='savedpatients'>
                    {
                        filteredList.map((data,index)=>{
                            return <motion.li key={index}>
                            <motion.div className="time" style={{"color":'#095D7E',width:'5%'}}><FaUser /></motion.div>
                            <motion.div className="name" style={{"color":'#095D7E',width:'45%',fontWeight:'500'}}>{data.patient.full_name}, {data.patient.age}, {data.patient.gender[0]}</motion.div>
                            <motion.div className='button-container' style={{width:'50%',height:'100%'}}>
                                <motion.button>Check Details</motion.button>
                                <motion.button>Send Message</motion.button>
                                <motion.button>Remove</motion.button>
                            </motion.div>
                        </motion.li>
                        })
                    }
                </motion.ul>
            </motion.div>
  )
}
