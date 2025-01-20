import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login/login";
import SignUp from "./pages/register/register";
//import MainPage from "./pages/main";
import Dashboard from "./pages/dashboard/kine/dashboard";
import DashboardP from "./pages/dashboard/patient/dashboard";
import ProtectedRoute from "./protected_routes";
import Test from "./components/test";

import NewPatient from "./pages/new_patient/new_patient";
import BDK from "./pages/bdk/bdk";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
        <Routes>
           <Route path="/test" element={<Test />} />
            <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={Dashboard} />} />
            <Route path="/dashboard_p" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={DashboardP} />} />
            <Route path="/new" element={<NewPatient />} />
            <Route path="/bdk" element={<BDK />} />
        </Routes>
    </Router>
  );
}


export default App;
