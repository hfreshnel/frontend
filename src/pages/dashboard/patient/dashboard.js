import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { getPatientById, getConsultations, getBDKFiles } from "../../../api/fetching";
import './dashboard.css';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';

/**
 * Dashboard component for displaying patient information and consultations.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 */
function Dashboard(){
    const { user } = useContext(AuthContext);
    const navigate = useNavigate(); 
    const { patientId } = useParams();
    const [showDropdown, setShowDropdown] = useState(false);
    const [patient, setPatient] = useState(null);
    const [consultations, setConsultations] = useState([]);

    /**
     * Fetch patient and consultations data when component mounts or patientId changes.
     */
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

    /**
     * Toggle the visibility of the dropdown menu.
     */
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    /**
     * Handle option click in the dropdown menu.
     * 
     * @param {Object} patient - The patient object.
     * @param {number} option - The selected option.
     */
    const handleOptionClick = (patient, option) => {
        setShowDropdown(false);
        navigate(`/patient/${patient.id}/new_bdk/${option}`);
    };

    /**
     * Navigate to the patient's fiche page.
     * 
     * @param {Object} patient - The patient object.
     */
    const gotoPatientFiche = (patient) => { 
        navigate(`/patient/${patient.id}/fiche`);
    };

    /**
     * Display BDK files for a given consultation.
     * 
     * @param {number} consultationId - The ID of the consultation.
     */
    const displayBDKFiles = async (consultationId) => {
        try {
            const fileUrl = await getBDKFiles(consultationId);
            if (fileUrl) {
                window.open(fileUrl, '_blank');
            } else {
                console.error('Failed to get BDK file URL');
            }
        } catch (error) {
            console.error('Error displaying BDK file', error);
        }
    }

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
                                <span>Session {index +1} {consultation.session}</span>
                                <span>{new Date(consultation.date_consultation).toLocaleDateString()}</span>
                                <button
                                    className="pdf-link"
                                    onClick={ (e) => {
                                        e.preventDefault();
                                        displayBDKFiles(consultation.id);
                                    }}
                                >
                                    bilan articulaire
                                </button>
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

