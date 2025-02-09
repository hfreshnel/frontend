import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Login from "./pages/login/login";
import SignUp from "./pages/register/register";
import Dashboard from "./pages/dashboard/kine/dashboard";
import DashboardP from "./pages/dashboard/patient/dashboard";
import Profile from "./pages/fiches/kine/FicheKine";
import FicheClient from "./pages/fiches/patient/FicheClient";
import Consultation from "./pages/consultation/consulation";
import NewPatient from "./pages/new_patient/new_patient";
import BDK from "./pages/bdk/bdk";

/**
 * App component sets up the main routing for the application.
 * It includes routes for login, registration, dashboard, profile, patient details, and consultation.
 */
function App() {
  const [user, setUser] = useState();
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login user={user}/>} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/patient/:patientId" element={<DashboardP />} />
            <Route path="/dashboard/patient/new" element={<NewPatient />} />
            <Route path="/patient/:patientId/fiche" element={<FicheClient />} />
            <Route path="/patient/:patientId/new_bdk/:option" element={<BDK />} />
            <Route path="/patient/:patientId/consultation/" element={<Consultation />} />
        </Routes>
    </Router>
  );
}

export default App;
