import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
// import img from './images/search.png';
// import img1 from './images/facebook.png';
import img2 from './images/Home ideation-7.png';
import './style.css';
import AuthContext from '../context/AuthContext';
import { FiEye, FiEyeOff } from 'react-icons/fi';


export default function LoginPage() {
  const login = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async(e) => {
    setLoading(true);
    e.preventDefault()
    const phone_number = e.target.phone_number.value
    const password = e.target.password.value

    try {
      await login.loginUser(phone_number, password);
    } catch (error) {
      console.error("Login failed", error);
    }
    setLoading(false);
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
 };
  return (
    <div className="loginpage">
      <div className="column">
          <div className='center-content'>
            <h1>Log In</h1>
            <form style={{ width: '65%', margin: '0 auto', textAlign: 'center' }} onSubmit={handleSubmit}>
              <div className="form-group">
                  <input className="input-field" type="number" placeholder="Phone Number" name="phone_number" required/>
              </div>
              <div className="form-group">
                <div className="input-field">
                  <input style={{"width":"90%"}} type={showPassword ? "text" : "password"} placeholder="Password" name="password" autoComplete="on" required/>
                  {showPassword ? <FiEyeOff className='eye' onClick={togglePasswordVisibility}/> : <FiEye className='eye' onClick={togglePasswordVisibility}/>}
                </div>
              </div>
              {/* <div style={{'height': '4vh','width':'100%','color': 'red','fontSize': '1.1vw'}}>{errorMessage}</div> */}
              <div className="form-group">
                {/* <a href='/'><img src={img} alt=''/></a>
                <a href='/'><img src={img1} alt=''/></a> */}
              </div>
              <div className="form-group">
                {loading ? <div className='loading-spinner'></div> : <input type="submit" value='Login'/>}
              </div>
            </form>
            <Link to="/doc/signup" style={{cursor:'pointer',color: '#095d7e',textDecoration: 'underline'}}>Not a User?</Link>
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
