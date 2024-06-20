import {Navigate,useLocation} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";


function PrivateRoute({ children }) {
    let auth =  useContext(AuthContext);
    let location = useLocation();
  
    if (!auth.user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }
  export default PrivateRoute;