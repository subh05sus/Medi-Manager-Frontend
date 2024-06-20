import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
// import img from './images/search.png';
// import img1 from './images/facebook.png';
// import Select from 'react-select/creatable';
import img2 from './images/Home ideation-8.png';
import './style.css';
import AuthContext from '../context/AuthContext';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import config from '../config';


export default function SignupPage() {
  const [ErrorMessage, setPasswordMatchError] = useState('');
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [allSpecializations, setSpecializations] = useState([]);
  // const [value,setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const { registerUser } = useContext(AuthContext);

  console.log(config.API_BASE_URL)
  const handleChange = () => {
    setChecked(!checked);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const email = e.target.email.value;
    const phone_number = e.target.phone_number.value;
    const specialization_name = e.target.specialization_name.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const is_doctor = checked;
    // const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
   
    // if (!passwordRegex.test(password)) {
    //    setPasswordMatchError('Password must contain at least one uppercase letter, one number, and one special character');
    //    setLoading(false);
    //    return;
    // }
    if (password !== confirmPassword) {
       setPasswordMatchError('Passwords do not match.');
       setLoading(false);
       return;
    }
   
    try{
      await registerUser(phone_number,password,is_doctor,first_name,last_name,email,specialization_name);
    } catch(error){
      console.error('Error:', error);
    }
    setLoading(false);
  };
   
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  // const handleChangeindropdown = (selectedValues) => {
  //   setValue(selectedValues);
  // };
  // useEffect(() => {
  //   // api to fetch all the Specializations
  //   fetch(`${config.API_BASE_URL}/api/v1/specialization/`, {
  //     method: "GET",
  //     headers: { "Authorization" : `JWT ${authTokens?.access}` }
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const existing = data.map((x) => ({
  //         value: x.id,
  //         label: x.specialization_name,
  //       }));
  //       console.log(data);
  //       setSpecializations(existing);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });

  // }, [authTokens]);
  return (
    <div className="loginpage">
      <div className="column">
          <div className='center-content'>
            <h1>Sign Up</h1>
            <form style={{ width: '65%', margin: '0 auto', textAlign: 'center' }} onSubmit={handleSubmit}>
              <div className="form-group" style={{gap:"1vw"}}>
                <input className="input-field" type="text" placeholder="First Name *" name="first_name" required/>
                <input className="input-field" type="text" placeholder="Last Name" name="last_name" />
              </div>
              <div className="form-group" style={{gap:"1vw"}}>
                <input className="input-field" type="number" placeholder="Phone Number *" name="phone_number" required/>
                <input className="input-field" type="email" placeholder="Email ID" name="email" />
              </div>
              <div div className="form-group">
                {/* <Select
                  defaultValue={value}
                  options={allSpecializations}
                  onChange={handleChangeindropdown}
                  placeholder={"Specialization *"}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      height: '7vh',
                      width: '28vw',
                      border: '1.5px solid #095d7e',
                      borderRadius: '10px',
                      paddingLeft: '1px',
                      overflowY: 'auto',
                      overflowX: 'hidden',
                      margin: '0',
                      backgroundColor: '#ffffff'
                    }),
                    placeholder : (baseStyles) => ({
                      ...baseStyles,
                      color: "#095d7e",
                      fontSize : "1.3vw"
                    }),
                    clearIndicator : (baseStyles) => ({
                      ...baseStyles,
                      color: 'red'
                    }),
                    dropdownIndicator : (baseStyles) => ({
                      ...baseStyles,
                      color : "#000",
                      padding : "0vw 1vw 0vw 1vw"
                    }),
                  }}
                /> */}
                <input className="input-field" type="text" placeholder="Specialization" name="specialization_name" />
              </div>
              <div className="form-group">
              <div className="input-field">
                  <input style={{"width":"90%"}} type={showPassword ? "text" : "password"} placeholder="Password *" name="password" autoComplete="on" required/>
                  {showPassword ? <FiEyeOff className='eye' onClick={togglePasswordVisibility}/> : <FiEye className='eye' onClick={togglePasswordVisibility}/>}
                </div>
              </div>
              <div className="form-group">
              <div className="input-field">
                  <input style={{"width":"90%"}} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password *" name="confirmPassword" autoComplete="on" required/>
                  {showConfirmPassword ? <FiEyeOff className='eye' onClick={toggleConfirmPasswordVisibility}/> : <FiEye className='eye' onClick={toggleConfirmPasswordVisibility}/>}
                </div>
              </div>
              <div className="form-group" style={{display: 'none'}}>
                <label>
                    <input type="checkbox" name="is_doctor" checked={checked} onChange={handleChange} required/>
                    Enroll as a Doctor
                </label>
              </div>
              <div style={{'height': '6vh','width':'100%','color': 'red','fontSize': '1.1vw'}}>{ErrorMessage}</div>
              <div className="form-group">
                {/* <a href='/'><img src={img} alt=''/></a>
                <a href='/'><img src={img1} alt=''/></a> */}
              </div>
              <div className="form-group">
                {loading ? <div className='loading-spinner'></div> : <input type="submit" value='Sign Up'/>}
              </div>
            </form>
            <Link to="/doc/login" style={{cursor:'pointer',color: '#095d7e',textDecoration: 'underline'}}>Already a User?</Link>
          </div>
      </div>
      <div className="column right">
        <div className='center-content'>
          <img style={{width: '75%'}} src={img2} alt=''/>
        </div>
      </div>
    </div>
  )
}
