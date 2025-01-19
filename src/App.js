import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Login from "./pages/login/login";
import SignUp from "./pages/register/register";
//import MainPage from "./pages/main";
import Dashboard from "./pages/dashboard/kine/dashboard";
import ProtectedRoute from "./protected_routes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={Dashboard} />} />
        </Routes>
    </Router>
  );
}


export default App;
