import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Login from "./pages/login/login";
import SignUp from "./pages/register/register";
import Dashboard from "./pages/dashboard/kine/dashboard";
import DashboardP from "./pages/dashboard/patient/dashboard";
import ProtectedRoute from "./protected_routes";

import NewPatient from "./pages/new_patient/new_patient";
import BDK from "./pages/bdk/bdk";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={Dashboard} />} />
            <Route path="/dashboard_p" element={<DashboardP />} />
            <Route path="/new" element={<NewPatient />} />
            <Route path="/bdk" element={<BDK />} />
        </Routes>
    </Router>
  );
}


export default App;
