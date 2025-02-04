import React, { useState, useContext, useEffect, use } from "react";
import { AuthContext } from "../../../AuthContext";
import { updateKine } from "../../../api/fetching";
import { Link } from "react-router-dom";
import "./FicheKine.css";
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';


const PersonalInfo = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    id: "",
    nom: "",
    prenom: "",
    tel: "",
    mdp: "",
    email: "",
    adresse: {
      rue: "",
      ville: "",
      code_postal: ""
    }
  });

  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.adresse) {
      setFormData({ ...formData, adresse: { ...formData.adresse, [name]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const toggleEdit = async () => {
    if (isEditable) {
      try {
        const response = await updateKine(formData);
        setUser(response);
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    }
    setIsEditable(!isEditable);
  };

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        tel: user.tel,
        mdp: user.mdp,
        email: user.email,
        adresse: {
          rue: user.adresse.rue,
          ville: user.adresse.ville,
          code_postal: user.adresse.code_postal
        }
      });
    } else {
      console.error('User not found in AuthContext');
    }
  }, [user]);

  if (!user) {
    return <h1>You are not logged in.</h1>;
  }

  return (
    <>
      <Header />
      <div className="fiche-kine-container">
        <h1>Fiche Kiné</h1>
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
              <label htmlFor="tel">Numéro de téléphone</label>
              <input
                type="tel"
                id="tel"
                name="tel"
                value={formData.tel}
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
              <label htmlFor="rue">Rue</label>
              <input
                type="text"
                id="rue"
                name="rue"
                value={formData.adresse.rue}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ville">Ville</label>
              <input
                type="text"
                id="ville"
                name="ville"
                value={formData.adresse.ville}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </div>
            <div className="form-group">
              <label htmlFor="code_postal">Code Postal</label>
              <input
                type="text"
                id="code_postal"
                name="code_postal"
                value={formData.adresse.code_postal}
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
