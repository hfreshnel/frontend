import React from "react";
import { useNavigate } from "react-router-dom";
import './dashboard.css';
import articularImage from "../../../assets/images/articulaire.png";
import postureImage from '../../../assets/images/posture.jpg';


function Dashboard(){
    const navigate = useNavigate(); // Initialize the navigate function

    const handleLogout = () => {
        // Perform any logout logic here (e.g., clearing session data)
        navigate("/"); // Navigate to the Login page
    };
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <nav className="nav">
                    <a href="#patients">Mes patients</a>
                    <a href="#profile">Profil</a>
                    <a href="#logout" onClick={handleLogout}>Déconnexion</a>
                </nav>
            </header>
            <main className="dashboard-content">
                <h1>Nom du patient</h1>
                <div className="graphique">
                    
                    <div className="graphique-images">
                        <img 
                            src={articularImage}
                            alt="genou" 
                            className="graphique-image"
                        />
                        <img 
                            src={postureImage}
                            alt="articulaire" 
                            className="graphique-image"
                        />
                    </div>    
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

