import React from "react";
import './dashboard.css';

function Dashboard(){
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <nav className="nav">
                    <a href="#patients">Mes patients</a>
                    <a href="#profile">Profil</a>
                    <a href="#logout">Déconnexion</a>
                </nav>
            </header>
            <main className="dashboard-content">
                <h1>Nom du patient</h1>
                <div className="graphique">
                    <h2>Graphique</h2>
                    {/* Graphique will be inserted here */}
                </div>
                <div className="form-section">
                    <label htmlFor="bilan">Nouveau bilan articulaire</label>
                    <select id="bilan">
                        <option value="passif">Passif</option>
                        <option value="actif">Actif</option>
                    </select>
                    <button id="informations" className="btn-informations">
                        Informations du patient
                    </button>
                </div>
            </main>
            <footer className="dashboard-footer">
                <p>eMnIA</p>
            </footer>
        </div>
    );
};

export default Dashboard;

