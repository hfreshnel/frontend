import React, { useState, useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import { Link } from "react-router-dom";
import "./FicheKine.css";
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';


const PersonalInfo = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateDeNaissance: "",
    telephone: "",
    email: "",
    adresse: "",
  });

  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  if (!user) {
    console.error('User not found in AuthContext');
    return <h1>You are not logged in.</h1>;
  }

  return (
    <>
      <Header />
      <div className="fiche-kine-container">
        
          <h1>Fiche Kiné</h1>

        {/* Bouton pour revenir à la page principale */}
        <Link to="/" className="back-button">
          Retour à la page principale
        </Link>

        <div className="personal-info-container">
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
            <div className="form-group">
              <label htmlFor="adresse">Adresse</label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
          </form>
          <button className="edit-button" onClick={toggleEdit}>
            {isEditable ? "Finir modification" : "Modifier"}
          </button>
        </div>  
      </div>
      <Footer />
    </>
  );
};

export default PersonalInfo;
