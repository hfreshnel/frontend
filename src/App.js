import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/login/login";
import SignUp from "./pages/register/register";
import Dashboard from "./pages/dashboard/patient/dashboard";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
  );
}


export default App;
