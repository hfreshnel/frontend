import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './dashboard.css';
//import articularImage from "../../../assets/images/articulaire.png";
//import postureImage from '../../../assets/images/posture.jpg';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';

function Dashboard(){
    const navigate = useNavigate(); 
    const [showDropdown, setShowDropdown] = useState(false);
  

    const handleLogout = () => {
        // Perform any logout logic here (e.g., clearing session data)
        navigate("/"); // Navigate to the Login page
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOptionClick = (option) => {
        setShowDropdown(false); // Close the dropdown
    };

    const consultations = [
        {
            session: "01",
            date: "12 Decembre 2024",
            pdf: "consultation_patient_record.pdf",
        },
        {
            session: "02",
            date: "08 Janvier 2025",
            pdf: "consultation_patient_record.pdf",
        },
    ];

    return (
        <div className="dashboard">
            <Header />
            <main className="dashboard-content">
                <h1>Nom du patient</h1>
                <div className="graphique">
                    <h2>Graphique</h2>
                </div>
                <div className="form-section">
                    <div className="dropdown">
                            <button
                                className="dropdown-button"
                                onClick={toggleDropdown}
                            >
                                Nouveau bilan articulaire
                                <span className={`dropdown-icon ${showDropdown ? "open" : ""}`}>&#9660;</span>
                            </button>
                            {showDropdown && (
                                <div className="dropdown-options">
                                    <div
                                        className="dropdown-option"
                                        onClick={() => handleOptionClick("Passif")}
                                    >
                                        Passif
                                    </div>
                                    <div
                                        className="dropdown-option"
                                        onClick={() => handleOptionClick("Actif")}
                                    >
                                        Actif
                                    </div>
                                </div>
                            )}
                        </div>
                    <button id="informations" className="btn-informations">
                        Informations du patient
                    </button>
                </div>
                
                {/* New List Section */}
                <div className="consultations-section">
                    <h2 className="consultations-title">Liste de consultations</h2>
                    <ul className="consultations-list">
                        {consultations.map((consultation, index) => (
                            <li key={index} className="consultation-item">
                                <span>Session {consultation.session}</span>
                                <span>{consultation.date}</span>
                                <a
                                    href={consultation.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="pdf-link"
                                >
                                    {consultation.pdf}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;

