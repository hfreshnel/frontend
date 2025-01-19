import React from "react";
import { Link } from "react-router-dom";
import "./PagePrincipale.css";

const PagePrincipale = () => {
  return (
    <div className="page-principale-container">
      <h1>Bienvenue sur la Page Principale</h1>
      <p>
        Explorez les différentes sections de l'application en cliquant sur les
        liens ci-dessous. Sélectionnez la fiche souhaitée pour continuer.
      </p>
      <div className="nav-links">
        <Link to="/fiche-client" className="nav-link">
          Fiche Client
        </Link>
        <Link to="/fiche-kine" className="nav-link">
          Fiche Kiné
        </Link>
        <Link to="/nouveau-patient" className="nav-link">
          Nouveau Patient
        </Link>
      </div>
      <footer className="footer">
        © 2025 Votre Application - Tous droits réservés
      </footer>
    </div>
  );
};

export default PagePrincipale;
