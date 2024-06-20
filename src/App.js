import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';
import HomePage from './pages/HomePage.js';
import NewConsult from './pages/NewConsult.js';
import BillingPage from './pages/BillingPage.js';
import RolePage from './pages/RolePage.js';
import SettingsPage from './pages/settingsPage.js';
import DoctorSetupPage from './pages/DoctorSetupPage.js';
import PrivateRoute from './utils/PrivateRoute.js';
import { AuthProvider } from './context/AuthContext.js';
import DocProfile from './pages/DocProfile.js';
import { ConsultationProvider } from './context/ConsultationContext.js';
import BookAppointment from './pages/BookAppointment.js';
import ReceptionistAddPage from './pages/ReceptionistAddPage.js';
import ProfileUpdate from './components/profilepagecomponents/ProfileUpdate.jsx';
import LandingPage from './pages/LandingPage.js';
// import CheckRoute from './utils/CheckRoute.js';
import ProfileSetup from './pages/ProfileSetup.js';
import ClinicInfo from './pages/ClinicInfo.js';

function App() {
  return (
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />}/>
          </Routes>
        <AuthProvider>
        <ConsultationProvider>
          <Routes>
              <Route path="/doc/signup" element={<SignupPage />}/>
              <Route path="/doc/login" element={<LoginPage />} />
              <Route path="/doc/doc-details" element={<PrivateRoute><DoctorSetupPage /></PrivateRoute>} exact/>
              <Route path="/doc/home" element={<PrivateRoute><HomePage /></PrivateRoute>} exact/>
              <Route path="/doc/newconsult" element={<PrivateRoute><NewConsult/></PrivateRoute>} exact/>
              <Route path="/doc/bill" element={<PrivateRoute><BillingPage/></PrivateRoute>} exact/>
              <Route path="/doc/bookappointment" element={<PrivateRoute><BookAppointment /></PrivateRoute>} exact/>
              <Route path="/doc/receptionistadd" element={<PrivateRoute><ReceptionistAddPage /></PrivateRoute>} exact/>
              <Route path="/doc/doc-profile" element={<PrivateRoute><DocProfile/></PrivateRoute>} />
              <Route path="/doc/profile-setup" element={<PrivateRoute><ProfileSetup/></PrivateRoute>} />
              <Route path="/doc/profile-update" element={<PrivateRoute><ProfileUpdate/></PrivateRoute>} />
              <Route path="/doc/settings" element={<PrivateRoute><SettingsPage/></PrivateRoute>} />
              <Route path="/doc/edit-clinic" element={<PrivateRoute><ClinicInfo/></PrivateRoute>} />
              <Route path="/doc/role" element={<RolePage />} exact/>
          </Routes>
        </ConsultationProvider>
        </AuthProvider>
        </Router>
  );
}

export default App;
