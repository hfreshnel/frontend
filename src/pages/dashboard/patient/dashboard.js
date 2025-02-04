import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { getPatientById, getConsultations } from "../../../api/fetching";
import './dashboard.css';
//import articularImage from "../../../assets/images/articulaire.png";
//import postureImage from '../../../assets/images/posture.jpg';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';

function Dashboard(){
    const { user } = useContext(AuthContext);
    const navigate = useNavigate(); 
    const { patientId } = useParams();
    const [showDropdown, setShowDropdown] = useState(false);
    const [patient, setPatient] = useState(null);
    const [consultations, setConsultations] = useState([]);


    useEffect(() => {
        const fetchPatient = async () => {
          if (patientId) {
            const fetchedPatient = await getPatientById(patientId);
            console.log('Fetched patient:', fetchedPatient); // Log the response
            setPatient(fetchedPatient);
          }
        };

        const fetchConsultations = async () => {
            if (patientId) {
              const fetchedConsultations = await getConsultations(patientId);
              console.log('Fetched consultations:', fetchedConsultations); // Log the response
              setConsultations(fetchedConsultations);
            }
          };
    
        fetchPatient();
        fetchConsultations();
      }, [patientId]);

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

    if (!user) {
        console.error('User not found in AuthContext');
        return <h1>You are not logged in.</h1>;
    }

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard">
            <Header />
            <main className="dashboard-content">
                <h1>{patient.nom} {patient.prenom}</h1>
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
                                        onClick={() => handleOptionClick(patient, 1)}
                                    >
                                        Genou droit
                                    </div>
                                    <div
                                        className="dropdown-option"
                                        onClick={() => handleOptionClick(patient, 0)}
                                    >
                                        Genou gauche
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

