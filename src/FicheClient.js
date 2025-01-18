import React, { useState } from "react";
import "./FicheClient.css";

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateDeNaissance: "",
    telephone: "",
    email: "",
  });

  const [selectedConsultation, setSelectedConsultation] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConsultationChange = (e) => {
    setSelectedConsultation(e.target.value);
  };

  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className="container">
      <h1 className="main-title">Fiche Patient</h1>

      {/* Wrapper pour aligner les sections */}
      <div className="sections-wrapper">
        <div className="personal-info-section">
          <h2>Informations personnelles</h2>
          <form className="personal-info-form">
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div className="form-group">
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateDeNaissance">Date de naissance</label>
              <input
                type="date"
                id="dateDeNaissance"
                name="dateDeNaissance"
                value={formData.dateDeNaissance}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div className="form-group">
              <label htmlFor="telephone">Numéro de téléphone</label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Adresse e-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
          </form>
        </div>

        <div className="consultation-section">
          <h2>Consultations</h2>
          <div className="form-group">
            <label htmlFor="consultation">Choisissez une consultation</label>
            <select
              id="consultation"
              value={selectedConsultation}
              onChange={handleConsultationChange}
              disabled={!isEditable}
            >
              <option value="" disabled>
                -- Sélectionnez une option --
              </option>
              <option value="consultation1">Consultation 1</option>
              <option value="consultation2">Consultation 2</option>
              <option value="consultation3">Consultation 3</option>
            </select>
          </div>
        </div>
      </div>

      <div className="button-container">
        <button className="edit-button" onClick={toggleEditMode}>
          {isEditable ? "Finir modification" : "Modifier"}
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
