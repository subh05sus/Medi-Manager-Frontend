import React, { useState } from 'react';
import img from './images/page1.png';
import img1 from './images/page2.png';
import img2 from './images/page3.png';
import logo from './images/Medyman_Logo.png';
import { useNavigate } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { AiFillYoutube} from "react-icons/ai";
import { BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";
import config from '../config';
import { useMediaQuery } from 'react-responsive';
const swal = require('sweetalert2');

export default function LandingPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const scrollToContact = () => {
        const contactUsDiv = document.getElementById('contactUs');
        if (contactUsDiv) {
            contactUsDiv.scrollIntoView();
        }
    };
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [Name, setName] = useState('');
    const [pincode, setPincode] = useState('');
    const [address, setAddress] = useState('');
    // const [specialization, setSpecialization] = useState([]);
    const resetForm = () => {
        setName('');
        setPhoneNumber('');
        setEmail('');
        setPincode('');
        setAddress('');
        // setSpecialization('');
    };
    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/v1/visitor/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "visitor_name": Name,
                    "email"       : email,
                    "phone_number": phoneNumber,
                    "country"     : pincode, 
                    "state"       : address
                }),
            });

            if (response.status === 201) {
                resetForm();
                swal.fire({
                    title: "Your Request Has Been Submitted",
                    text: "We will get back to you shortly",
                    icon: "success",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            } else {
                swal.fire({
                    title: "Server Did not Respond Properly",
                    text: "Please Try Again Later",
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                console.error('Failed to save');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false);
    };
    
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

  return (
    <div className="landingpage">
        {isMobile ? (
            <>
                <div className="mobheader"><img src={logo} alt='Logo'/>MedyMan</div>
                <div className="mobfirst">
                    <div className="mobbox">
                        <h5>"Paperwork? Not Anymore...<br/>
                                Welcome to Digital Health"</h5>
                        <div className="mobbtns">
                        <button onClick={() => navigate("/doc/login")}>Try For Free</button>
                        <button onClick={scrollToContact}>Contact Us</button>
                        </div>
                        <img src={img} alt='' className='main'/>
                        <img src={img1} alt='' className='page1'/>
                        <img src={img2} alt='' className='page2'/>
                    </div>
                </div>
                <div className="mobsecond">
                    <h5>Product <spam style={{'color':'#347995'}}>Features</spam></h5>
                    <div className="card">
                        <p style={{fontSize:'2.5vh',fontWeight:'bold'}}>Seamless Your Process of Consultation</p>
                        <p style={{fontSize:'1.8vh'}}>No more drowning in paperwork during cosultations, keep track of patient history, medications and monitor the progress over time.</p>
                    </div>
                </div>
                <div id='contactUs' className="mobthird">
                    <h5 style={{'color':'#347995','fontWeight':'bold',fontSize:'3vh'}}>Contact Us</h5>
                    <h2 style={{fontSize: '2.5vh',fontWeight: 'bold'}}>Need Assistance</h2>
                    <p style={{fontSize: '2vh',textAlign: 'center'}}>Fill in the below details to receive a call from our Team</p>
                    <form onSubmit={handleSubmit}>
                        <input value={Name} onChange={(e) => setName(e.target.value)}className="input-field" type="text" placeholder="Name *" name="name" required/>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" type="email" placeholder="Email ID *" name="email" />
                        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="input-field" type="text" placeholder="Mobile Number *" name="phone_number" required/>
                        <div style={{display:'flex',flexDirection: 'row',gap:"1vw",width: '100%',height:'7vh',overflow:'hidden'}}>
                            <input style={{height:'100%'}} value={pincode} onChange={(e) => setPincode(e.target.value)} className="input-field" type="text" placeholder="Pincode" name="pincode"/>
                            <input style={{height:'100%'}} value={address} onChange={(e) => setAddress(e.target.value)} className="input-field" type="text" placeholder="Address" name="address" />
                        </div>
                        {/* <div div className="form-group" style={{width: '100%',padding: '0 3vw',margin: '0'}}>
                            <input value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="input-field" type="text" placeholder="Specialization" name="specialization" />
                        </div> */}
                        {loading ? <div className='loading-spinner'></div> : <input style={{width: '100%'}} className="button" type="submit" value='Schedule a Call'/>}
                    </form>
                </div>
            </>
            ) : (
            <>
                <div className="first-column">
                    <div className="header"><img src={logo} alt='Logo'/>MedyMan</div>
                    <div className="maincontent">
                        <div className="row" style={{padding: '5vh 0'}}>
                            <div className="tagline">
                                "Paperwork? Not Anymore...<br/>
                                Welcome to Digital Health"
                                <button onClick={() => navigate("/doc/login")}>Try For Free</button>
                                <button onClick={scrollToContact}>Contact Us</button>
                            </div>
                        </div>
                        <div className="row2">
                            <img src={img} alt='' />
                        </div>
                    </div>
                    <img src={img1} alt='' className='page1'/>
                    <img src={img2} alt='' className='page2'/>
                </div>
                <div id='second' className="first-column" style={{flexDirection: 'column',height:'60%',justifyContent:'flex-start'}}>
                    <div className='column2heder'>Product <p style={{'color':'#347995'}}>Features</p></div>
                    <div className="cards">
                        <div className="card">
                            <p className="tip">Seamless Your Process of Consultation</p>
                            <p className="second-text">No more drowning in paperwork during cosultations, keep track of patient history, medications and monitor the progress over time.</p>
                        </div>
                        <div className="card">
                            <p className="tip">Appointment Booking Made Easy</p>
                            <p className="second-text">Streamlining appointment process allows doctors to effortlessly manage their schedules and patient's  apointment booking</p>
                        </div>
                        <div className="card">
                            <p className="tip">Visualize Patient's Progress</p>
                            <p className="second-text">Visualize and track patient's development with ease using Medyman</p>
                        </div>
                    </div>
                </div>
                <div id="contactUs" className="contactus" style={{flexDirection: 'column',height:'90%',justifyContent:'space-between'}}>
                    <div className='column2heder' style={{'color':'#347995','fontWeight':'bold'}}>Contact Us</div>
                    <div className="maincontent" style={{height:'100%'}}>
                        <div className="row2" style={{paddingLeft: '2vw'}}>
                            <img src={img} alt='loading' style={{width: '80%',height: '65%'}} />
                        </div>
                        <form onSubmit={handleSubmit} className='center-content' style={{padding: '`1vw',justifyContent: 'center',height: '100%',gap: '2vh',display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                            <h2 style={{fontSize: '2vw',fontWeight: 'bold'}}>Need Assistance</h2>
                            <p style={{fontSize: '1.5vw'}}>Fill in the below details to receive a call from our Team</p>
                            <div className="form-group" style={{width: '100%',padding: '0 3vw',margin: '0'}}>
                                <input value={Name} onChange={(e) => setName(e.target.value)}className="input-field" type="text" placeholder="Name *" name="name" required/>
                            </div>
                            <div div className="form-group" style={{width: '100%',padding: '0 3vw',margin: '0'}}>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" type="email" placeholder="Email ID *" name="email" />
                            </div>
                            <div div className="form-group" style={{width: '100%',padding: '0 3vw',margin: '0'}}>
                                <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="input-field" type="text" placeholder="Mobile Number *" name="phone_number" required/>
                            </div>
                            <div className="form-group" style={{gap:"1vw",width: '100%',padding: '0 3vw',margin: '0'}}>
                                <input value={pincode} onChange={(e) => setPincode(e.target.value)} className="input-field" type="text" placeholder="Pincode" name="pincode"/>
                                <input value={address} onChange={(e) => setAddress(e.target.value)} className="input-field" type="text" placeholder="Address" name="address" />
                            </div>
                            {/* <div div className="form-group" style={{width: '100%',padding: '0 3vw',margin: '0'}}>
                                <input value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="input-field" type="text" placeholder="Specialization" name="specialization" />
                            </div> */}
                            <div className="form-group" style={{width: '100%',padding: '0 3vw',margin: '0'  }}>
                                {loading ? <div className='loading-spinner'></div> : <input style={{width: '100%'}} className="button" type="submit" value='Schedule a Call'/>}
                            </div>
                        </form>
                        <img src={img1} alt='' className='page1' style={{top: '8%',left: '25%'}}/>
                        <img src={img2} alt='' className='page2' style={{bottom: '10%',left: '25%',boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'}}/>
                    </div>
                </div>
                <footer className="footer">
                        <div className="waves">
                        <div className="wave" id="wave1"></div>
                        <div className="wave" id="wave2"></div>
                        <div className="wave" id="wave3"></div>
                        <div className="wave" id="wave4"></div>
                        </div>
                        <ul className="social-icon">
                        <li className="social-icon__item"><a className="social-icon__link" href="/">
                            <FaFacebook />
                            </a></li>
                        <li className="social-icon__item"><a className="social-icon__link" href="/">
                            <BsTwitterX />
                            </a></li>
                        <li className="social-icon__item"><a className="social-icon__link" href="/">
                        <BsLinkedin />
                            </a></li>
                        <li className="social-icon__item"><a className="social-icon__link" href="/">
                        <BsInstagram />
                            </a></li>
                            <li className="social-icon__item"><a className="social-icon__link" href="/">
                        <AiFillYoutube />
                            </a></li>
                        </ul>
                        <ul className="menu">
                        <li className="menu__item"><a className="menu__link" href="/">About Us</a></li>
                        <li className="menu__item"><a className="menu__link" href="/">Blogs & Case Studies</a></li>
                        <li className="menu__item"><a className="menu__link" href="/">Career</a></li>
                        <li className="menu__item"><a className="menu__link" href="/">FAQs</a></li>
                        <li className="menu__item"><a className="menu__link" href="/">Privacy</a></li>
                        <li className="menu__item"><a className="menu__link" href="/">Terms & Conditions</a></li>

                        </ul>
                        <p>&copy;2024 Medimanager | All Rights Reserved</p>
                </footer> 
            </>
        )}
    </div>
  )
}
