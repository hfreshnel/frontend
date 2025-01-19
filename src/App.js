import React from "react";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import PagePrincipale from "./PagePrincipale";
import FicheClient from "./FicheClient";
import FicheKine from "./FicheKine";
import NouveauPatient from "./NouveauPatient";
import BDK from "./BDK";

function App() {
  return (
    <Router>
      <div>
        {/* Routes pour différentes pages */}
        <Routes>
          {/* Page principale */}
          <Route path="/" element={<PagePrincipale />} />
          {/* Pages FicheClient et FicheKine */}
          <Route path="/fiche-client" element={<FicheClient />} />
          <Route path="/fiche-kine" element={<FicheKine />} />
          <Route path="/nouveau-patient" element={<NouveauPatient />}/>
          <Route path="/BDK" element={<BDK />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
