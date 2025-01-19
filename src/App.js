import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FicheKine from "./FicheKine";
import FicheClient from "./FicheClient";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/fiche-kine" element={<FicheKine />} />
                <Route path="/fiche-client" element={<FicheClient />} />
            </Routes>
        </Router>
    );
}

export default App;
