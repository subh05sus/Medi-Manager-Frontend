import React, { useContext, useEffect, useState } from 'react';
import { motion } from "framer-motion";
import AuthContext from '../../context/AuthContext';
import config from '../../config';
const swal = require('sweetalert2');

export default function FeeSetupCardContent() {

    const [isRafbaOn, setRafba] = useState(false);
    const [isFormVisible, setFormVisible] = useState(false);
    const { authTokens } = useContext(AuthContext);
    const [RegistrationFee, setRegistrationFee] = useState(0);
    const [FirstVisitFee, setFirstVisitFee] = useState(0);
    const [ReVisitFee, setReVisitFee] = useState(0);
    const [ServiceFee, setServiceFee] = useState(0);
    const [ServiceName, setServiceName] = useState('');
    const [SCServices, setSCServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);

    const feesData = [
      {
        "fee_amount": RegistrationFee,
        "fee_type_name": "Registration Fee"
      },
      {
        "fee_amount": FirstVisitFee,
        "fee_type_name": "First Visit Fee"
      },
      {
        "fee_amount": ReVisitFee,
        "fee_type_name": "Re-Visit Fee"
      }
   ];


    const toggleSwitch1 = () => {
        setRafba(!isRafbaOn);
      };

      const toggleFormVisibility = () => {
        setServiceName('');
        setServiceFee(0);
        setFormVisible(true);
    };

    const listUpated = () => {
      fetch(`${config.API_BASE_URL}/api/v1/fee-structure/self/`,{ 
        method: "GET",
        headers: { "Authorization" : `JWT ${authTokens?.access}` }
      })
        .then((res) => res.json())
        .then((data) => {
          const filteredFee = data.filter(item => item.cost_type === 'SC');
          const filteredDFFee = data.filter(item => item.cost_type === 'DF');
          setSCServices(filteredFee);

          const registrationFeeService = filteredDFFee.find(service => service.fee_type_name === "Registration Fee");
          if (registrationFeeService) {
            setRegistrationFee(registrationFeeService.fee_amount);
          }
          const firstFeeService = filteredDFFee.find(service => service.fee_type_name === "First Visit Fee");
          if (firstFeeService) {
            setFirstVisitFee(firstFeeService.fee_amount);
          }
          const reFeeService = filteredDFFee.find(service => service.fee_type_name === "Re-Visit Fee");
          if (reFeeService) {
            setReVisitFee(reFeeService.fee_amount);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
        
    useEffect(() => {
        fetch(`${config.API_BASE_URL}/api/v1/fee-structure/self/`,{ 
          method: "GET",
          headers: { "Authorization" : `JWT ${authTokens?.access}` }
        })
          .then((res) => res.json())
          .then((data) => {
            const filteredFee = data.filter(item => item.cost_type === 'SC');
            const filteredDFFee = data.filter(item => item.cost_type === 'DF');
            setSCServices(filteredFee);

            const registrationFeeService = filteredDFFee.find(service => service.fee_type_name === "Registration Fee");
            if (registrationFeeService) {
              setRegistrationFee(registrationFeeService.fee_amount);
            }
            const firstFeeService = filteredDFFee.find(service => service.fee_type_name === "First Visit Fee");
            if (firstFeeService) {
              setFirstVisitFee(firstFeeService.fee_amount);
            }
            const reFeeService = filteredDFFee.find(service => service.fee_type_name === "Re-Visit Fee");
            if (reFeeService) {
              setReVisitFee(reFeeService.fee_amount);
            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, [authTokens]);


      const saveDoctorFee = (e) => {
        e.preventDefault();
        fetch(`${config.API_BASE_URL}/api/v1/fee-structure/add/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${authTokens?.access}`
            },
            body: JSON.stringify(feesData)
        })
        .then(response => {
            listUpated();
            if (response.status === 201) {
              setFormVisible(false);
              setServiceFee(0);
              setServiceName('');
              swal.fire({
                title: "New Fee Added",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
              })
            } else if(response.status === 200){
              setFormVisible(false);
              setServiceFee(0);
              setServiceName('');
              swal.fire({
                title: "Fee Updated Successfully",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
              })
            }else {
              swal.fire({
                title: "Some Error Occured",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
              })
            }
            return response.json();
        })
      };

      const saveServiceFee = (e) => {
        e.preventDefault();
        const url = selectedService ? `${config.API_BASE_URL}/api/v1/fee-structure/update/${selectedService.id}/` : `${config.API_BASE_URL}/api/v1/fee-structure/self/`;
        const method = selectedService ? "PATCH" : "POST";
        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${authTokens?.access}`
            },
            body: JSON.stringify({
                "fee_type_name": ServiceName,
                "fee_amount": ServiceFee,
                "cost_type" : "SC"
            })
        })
        .then(response => {
          listUpated();
            if (response.status === 201) {
              setFormVisible(false);
              setServiceFee(0);
              setServiceName('');
              swal.fire({
                title: "New Fee Added",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
              })
            } else if(response.status === 200){
              setFormVisible(false);
              setServiceFee(0);
              setServiceName('');
              swal.fire({
                title: "Fee Updated Successfully",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
              })
            }else {
              swal.fire({
                title: "Some Error Occured",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
              })
            }
            return response.json();
        })
      };
    const handleEditClick = (service) => {
      setSelectedService(service);
      setServiceName(service.fee_type_name);
      setServiceFee(service.fee_amount);
      setFormVisible(true);
    }
  return (
    <motion.div className='card-containt'>
      <motion.div className="first-column" style={{"height" : "30%"}}>
                    <motion.ul style={{"width" : "30%"}}>
                        <motion.li>Set Registration Fee</motion.li>
                        <motion.li>First Visit Fee
                        </motion.li>
                        <motion.li>Re-Visit Fee</motion.li>
                    </motion.ul>
                    <motion.form style={{"width" : "70%"}} onSubmit={saveDoctorFee}>
                      <motion.ul style={{"width" : "100%"}}>
                          <motion.li>
                                  <motion.input value={RegistrationFee} onChange={(e) => setRegistrationFee(e.target.value)} type="text" style={{paddingLeft: '1vw'}}/> 
                                  <motion.div style={{"width" : "15%","height" : "100%"}} className={`sliding-switch ${isRafbaOn ? 'on' : 'off'}`} onClick={toggleSwitch1}>
                                      <motion.div className="slider">{isRafbaOn ? 'Off' : 'On'}</motion.div>
                                      <motion.div className="label on">On</motion.div>
                                      <motion.div className="label off">Off</motion.div>
                                  </motion.div>
                          </motion.li>
                          <motion.li><motion.input value={FirstVisitFee} onChange={(e) => setFirstVisitFee(e.target.value)} type="text" style={{paddingLeft: '1vw'}}/></motion.li>
                          <motion.li>
                              <motion.input value={ReVisitFee} onChange={(e) => setReVisitFee(e.target.value)} type="text" style={{paddingLeft: '1vw'}}/>
                              <motion.button style={{width: '20%',"fontSize" : "1vw",height: '100%'}}>Save</motion.button>
                          </motion.li>
                      </motion.ul>
                    </motion.form>
      </motion.div>
      <motion.h5>Services</motion.h5>
      <motion.div className="last-column" style={{'flexDirection': 'row',gap: "1vw","height" : "65%","width" : "100%",backgroundColor: 'transparent'}}>
                    <motion.div className="service-container">
                        <motion.ul>
                          {
                            SCServices.map((text,index)=>{
                              return <motion.li key={index}>
                                    <motion.div><motion.div style={{overflow: 'hidden','textOverflow': 'ellipsis','whiteSpace': 'nowrap'}}>{text.fee_type_name}</motion.div><motion.p style={{"fontSize" : "1vw",margin:'0'}}>₹ {text.fee_amount}</motion.p></motion.div>
                                    <motion.div className='button-container'><motion.button>Remove</motion.button><motion.button onClick={() => handleEditClick(text)}>Edit</motion.button></motion.div>
                                </motion.li>
                            })
                          }
                        </motion.ul>
                        <motion.div className="add" onClick={toggleFormVisibility}>+</motion.div> 
                    </motion.div>
                    {
                        isFormVisible &&  
                        <motion.form className="form-cointainer" onSubmit={saveServiceFee}>
                        <motion.div className="input-container">
                            <motion.label>Service Name</motion.label>
                            <motion.input value={ServiceName} onChange={(e) => setServiceName(e.target.value)} type="text" />
                        </motion.div>
                        <motion.div className="input-container">
                            <motion.label>Price</motion.label>
                            <motion.input value={ServiceFee} onChange={(e) => setServiceFee(e.target.value)} type="text" />
                        </motion.div>
                        <motion.button>Save</motion.button>
                    </motion.form>
                    }
      </motion.div>
    </motion.div>
  )
}
