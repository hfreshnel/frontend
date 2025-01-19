import React, { useState } from 'react';
import './dashboard.css';

const patients = [
  { id: 1, name: 'John Doe', age: 30, condition: 'Back Pain' },
  { id: 2, name: 'Jane Smith', age: 25, condition: 'Knee Injury' },
  { id: 3, name: 'Sam Johnson', age: 40, condition: 'Shoulder Pain' },
  // Add more patients as needed
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patientList, setPatientList] = useState(patients);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddPatient = () => {
    const newPatient = { id: patientList.length + 1, name: 'New Patient', age: 0, condition: 'Unknown' };
    setPatientList([...patientList, newPatient]);
  };

  const filteredPatients = patientList.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
  );
};

export default Dashboard;