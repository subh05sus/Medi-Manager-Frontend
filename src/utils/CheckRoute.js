import {Navigate,useLocation} from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import config from "../config";


function CheckRoute({ children }) {
    const { authTokens } = useContext(AuthContext);
    const [user, setUser] = useState([]);
    let location = useLocation();

    useEffect(() => {
        fetch(`${config.API_BASE_URL}/auth/users/me/`, {
          method: "GET",
          headers: { "Authorization" : `JWT ${authTokens?.access}` }
        })
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
        }, [authTokens]);
  
    if (user.first_name === '' && user.last_name === '') {
      return <Navigate to="/doc/profile-setup" state={{ from: location }} replace />;
    }
  
    return children;
  }
  export default CheckRoute;