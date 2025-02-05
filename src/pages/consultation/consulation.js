import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom'; // Import useLocation
import { postNewConsultation } from '../../api/fetching';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import "./consultation.css"
import { Form } from 'react-router-dom';

const Consultation = () => {
  const { patientId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const angles = location.state?.angles; // Retrieve angles from location state
  console.log(angles);

  const handleOnsubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      date_consultation: new Date().toISOString().split('T')[0], // Use current date
      douleur_duree: formData.get('douleur_duree'),
      douleur_niveau: parseInt(formData.get('douleur_niveau')),
      extension: {
        active: 0,
        passive: parseInt(angles ? angles["genou-droit-extension"] !== "NA" ? angles["genou-droit-extension"] : angles["genou-gauche-extension"] : "")
      },
      flexion: {
        active: 0,
        passive: parseInt(angles ? angles["genou-droit-flexion"] !== "NA" ? angles["genou-droit-flexion"] : angles["genou-gauche-flexion"] : "")
      },
      frequence_seances: formData.get('frequence_seances'),
      nb_seances: parseInt(formData.get('nb_seances')),
      patientid: patientId
    };
    console.log(data);
    const response = await postNewConsultation(data);
    if (response) {
        navigate(`/dashboard/patient/${patientId}`);
    } else {
        console.log("Failed to create consultation", response);
        alert("Failed to create consultation");
    }
  }

  return (
    <div>
        <Header />
        <h1>Consultation</h1>
            <form onSubmit={handleOnsubmit}>
                <label>
                  Douleur Durée:
                  <input type="text" name="douleur_duree" required />
                </label>
                <label>
                  Douleur Niveau:
                  <input type="number" name="douleur_niveau" min="0" max="10" required />
                </label>
                <label>
                  Extension:
                  <input type="number" name="extension_passive" value={angles ? angles["genou-droit-extension"] !== "NA" ? angles["genou-droit-extension"] : angles["genou-gauche-extension"] : ""} disabled />
                </label>
                <label>
                  Flexion:
                  <input type="number" name="flexion_passive" value={angles ? angles["genou-droit-flexion"] !== "NA" ? angles["genou-droit-flexion"] : angles["genou-gauche-flexion"] : ""} disabled />
                </label>
                <label>
                  Fréquence Séances:
                  <input type="text" name="frequence_seances" required />
                </label>
                <label>
                  Nombre de Séances:
                  <input type="number" name="nb_seances" required />
                </label>
                <button type="submit">Submit</button>
            </form>
        <Footer />
    </div>
  )
}

export default Consultation;