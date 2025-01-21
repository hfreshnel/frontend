import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import './dashboard.css';

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

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [patientList, setPatientList] = useState(patients);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddPatient = () => {
    //const newPatient = { id: patientList.length + 1, name: 'New Patient', age: 0, condition: 'Unknown' };
    //setPatientList([...patientList, newPatient]);
    navigate('/new');
  };

  const filteredPatients = patientList.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="dashboard">
        <h1>Kine Dashboard</h1>
        <h2>Mes patient</h2>
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
              <th>Name</th>
              <th>Age</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.condition}</td>
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