import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./Login"; 
import SignUp from "./register";
import Dashboard from "./dashboard";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}

        </Routes>
    </Router>
  );
}


export default App;
