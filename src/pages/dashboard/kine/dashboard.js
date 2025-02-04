import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext';
import { getPatients } from '../../../api/fetching';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import './dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [patientList, setPatientList] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      if (user && user.id) {
        const patients = await getPatients(user.id);
        console.log('Patients:', patients);
        if (Array.isArray(patients)) {
          setPatientList(patients);
        } else {
          console.error('Expected an array of patients, but got:', patients);
        }
      }
    };

    fetchPatients();
  }, [user]);

  console.log('Dashboard component rendered');
  if (!user) {
    console.error('User not found in AuthContext');
    return <h1>You are not logged in.</h1>;
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddPatient = () => {
    navigate('/dashboard/patient/new');
  };

  const handleSelectPatient = (patientId) => {
    // Navigate to the patient's details page with the selected patient's ID
    navigate(`/dashboard/patient/${patientId}`);
  };

  const filteredPatients = patientList.filter(patient =>
    `${patient.nom} ${patient.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="dashboard">
        <h2>Mes patients</h2>
        <div>
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar"
          />
          <button className="add-patient-button" onClick={handleAddPatient}>Add Patient</button>
        </div>
        <table className="patients-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id} onClick={() => handleSelectPatient(patient.id)}>
                <td>{patient.nom}</td>
                <td>{patient.prenom}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;