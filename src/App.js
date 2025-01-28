import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Login from "./pages/login/login";
import SignUp from "./pages/register/register";
import Dashboard from "./pages/dashboard/kine/dashboard";
import DashboardP from "./pages/dashboard/patient/dashboard";
import ProtectedRoute from "./protected_routes";
import Profile from "./pages/fiches/kine/FicheKine";

import NewPatient from "./pages/new_patient/new_patient";
import BDK from "./pages/bdk/bdk";
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
            <Route path="/patient/:patientId/fiche" element={<NewPatient />} />
            <Route path="/patient/:patientId/new_bdk/:option" element={<BDK />} />
        </Routes>
    </Router>
  );
}


export default App;
