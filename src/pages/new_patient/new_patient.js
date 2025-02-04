import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import CollapsibleSection from "../../components/section/section";
import DynamicForm from "../../components/form/form";

import "./new_patient.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { sections } from "../../assets/templates/form_template";
import { postNewPatient, updatePatient } from "../../api/fetching";
import Microphone from "../../components/microphone/microphone";

const PersonalInfo = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [adresse, setAdresse] = useState({
          code_postal: "",
          rue: "",
          ville: ""
  });
  const [anamnese, setAnamnese] = useState({
          antecedents: "",
          antecedents_familiaux: "",
          historique_maladie: "",
          motif: ""
  });
  const [morphostatique, setMorphostatique] = useState({
          lateralite: "droite",
          taille: 0,
          poids: 0,
          remarques: ""
  });
  const [travail, setTravail] = useState({
          profession: "",
          sport: ""
  });
  
  const [newPatient, setNewPatient] = useState({
          nom: "",
          prenom: "",
          date_naissance: "",
          sexe: "homme",
          email: "",
          tel: "",
          carte_vitale: "",
          kineid: user.id,
          adresse: adresse,
          anamnese: anamnese,
          morphostatique: morphostatique,
          travail: travail
  });

  const handleOnsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data);

    const updatedPatient = {
      ...newPatient,
      nom: data.name,
      prenom: data.surname,
      date_naissance: data.birthday,
      sexe: data.gender,
      email: data.email,
      tel: data.phone,
      carte_vitale: data.socialSecurityNumber,
      adresse: {
        ...newPatient.adresse,
        rue: data.address,
        code_postal: data.postalCode,
        ville: data.city,
        pays: data.country
      },
      morphostatique: {
        ...newPatient.morphostatique,
        taille: data.taille,
        poids: data.poids,
        lateralite: data.lateralite,
        remarque: data.remarque
      },
      anamnese: {
        ...newPatient.anamnese,
        historique_maladie: data.hystory,
        antecedents: data["ante-medical"],
        antecedents_chirurgicaux: data["ante-chirurgical"],
        antecedents_familiaux: data["ante-familial"]
      },
      travail: {
        ...newPatient.travail,
        situation_actuelle: data["situation-actuelle"],
        type_travail: data["type-travail"],
        profession: data.profession
      },
      vieQuotidienne: {
        ...newPatient.vieQuotidienne,
        lieu_vie: data["lieu-vie"],
        alimentation: data.alimentation,
        sports: data.sports,
        loisirs: data.loisirs,
        vie_privee: data["vie-privee"]
      }
    };

    console.log(updatedPatient);
    postNewPatient(updatedPatient).then(() => {
      navigate('/dashboard');
    }).catch((error) => {
      console.error('Error posting new patient:', error);
    });

    setNewPatient(updatedPatient);
  };

  if (!user) {
    console.error('User not found in AuthContext');
    return (<h1>You are not logged in.</h1>);
  }
  else {
    console.log('User found:', user);
  }
  
  return (
    <>
      <Header />
      <h1>Nouveau patient</h1>
      
      <form onSubmit={handleOnsubmit} className="form-container">
        <Microphone updatePatient={setNewPatient}/>
        {sections.map((section, index) => (
          <CollapsibleSection key={index} title={section.title}>
            <DynamicForm 
              fields={section.fields} 
              values={newPatient}
              setValues={setNewPatient}
            />
          </CollapsibleSection>
        ))}
        <button type="submit" className="form-submit-button">Enregistrer</button>
      </form>
      <Footer />
    </>
  );
};

export default PersonalInfo;
