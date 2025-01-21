import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import './dashboard.css';
//import articularImage from "../../../assets/images/articulaire.png";
//import postureImage from '../../../assets/images/posture.jpg';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';

const patients = [
    { id: 1, name: 'John Doe', age: 30, condition: 'Back Pain' },
    { id: 2, name: 'Jane Smith', age: 25, condition: 'Knee Injury' },
    { id: 3, name: 'Sam Johnson', age: 40, condition: 'Shoulder Pain' },
    { id: 4, name: '', age: '', condition: '' },
    { id: 5, name: '', age: '', condition: '' },
    { id: 6, name: '', age: '', condition: '' },
    { id: 7, name: '', age: '', condition: '' },
    { id: 8, name: '', age: '', condition: '' },
    { id: 9, name: '', age: '', condition: '' },
    // Add more patients as needed
  ];

function Dashboard(){
    const { user } = useContext(AuthContext);
    const navigate = useNavigate(); 
    const { patientId } = useParams();
    const [showDropdown, setShowDropdown] = useState(false);
    const [patient, setPatient] = useState(null);


    useEffect(() => {
        const selectedPatient = patients.find(p => p.id === parseInt(patientId));
        setPatient(selectedPatient);
    }, [patientId]);

    const handleLogout = () => {
        // Perform any logout logic here (e.g., clearing session data)
        navigate("/"); // Navigate to the Login page
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOptionClick = (patient, option) => {
        // Perform the desired action based on the selected option
        setShowDropdown(false); // Close the dropdown
        navigate(`/patient/${patient.id}/new_bdk/${option}`);
    };

    const gotoPatientFiche = (patient) => { 
        navigate(`/patient/${patient.id}/fiche`);
    };

    const customNav = (
        <nav className="nav">
            <a href="#patients">Mes patients</a>
            <a href="#profile">Profil</a>
            <a href="#logout" onClick={handleLogout}>Déconnexion</a>
        </nav>
    );

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

    if (!user) {
        console.error('User not found in AuthContext');
        return <h1>You are not logged in.</h1>;
    }

    return (
        <div className="dashboard">
            <Header customNav={customNav} />
            <main className="dashboard-content">
                <h1>{patient ? patient.name : 'Patient not found'}</h1>
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
                                        onClick={() => handleOptionClick(patient, "Passif")}
                                    >
                                        Passif
                                    </div>
                                    <div
                                        className="dropdown-option"
                                        onClick={() => handleOptionClick(patient, "Actif")}
                                    >
                                        Actif
                                    </div>
                                </div>
                            )}
                        </div>
                    <button id="informations" className="btn-informations" onClick={() => gotoPatientFiche(patient)}>
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

