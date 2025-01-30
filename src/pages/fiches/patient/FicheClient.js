import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FicheClient.css";
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateDeNaissance: "",
    telephone: "",
    email: "",
    adresse: "",
    taille: "",
    poids: "",
    lateralite: "",
    remarque: "",
    histoireMaladie: "",
    antecedentsMedicaux: "",
    antecedentsChirurgicaux: "",
    antecedentsFamiliaux: "",
    situationProfessionnelle: "",
    typeTravail: [],
    profession: "",
    lieuVie: [],
    aideExterieur: "",
    situation: [],
    sportLoisirs: "",
  });

  const [isEditable, setIsEditable] = useState(false);
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(true);
  const [isMorphostatiqueOpen, setIsMorphostatiqueOpen] = useState(true);
  const [isAnamneseOpen, setIsAnamneseOpen] = useState(true);
  const [isTravailOpen, setIsTravailOpen] = useState(true);
  const [isVieQuotidienneOpen, setIsVieQuotidienneOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "typeTravail" || name === "situation" || name === "lieuVie") {
      const updatedValues = formData[name].includes(value)
        ? formData[name].filter((item) => item !== value)
        : [...formData[name], value];
      setFormData({ ...formData, [name]: updatedValues });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const toggleBlock = (block) => {
    if (block === "personalInfo") {
      setIsPersonalInfoOpen(!isPersonalInfoOpen);
    } else if (block === "morphostatique") {
      setIsMorphostatiqueOpen(!isMorphostatiqueOpen);
    } else if (block === "anamnese") {
      setIsAnamneseOpen(!isAnamneseOpen);
    } else if (block === "travail") {
      setIsTravailOpen(!isTravailOpen);
    } else if (block === "vieQuotidienne") {
      setIsVieQuotidienneOpen(!isVieQuotidienneOpen);
    }
  };

  return (
    <>
      <Header />
      <div className="fiche-kine-container">
        <h1>Fiche Client</h1>

        {/* Informations personnelles */}
        <div className="personal-info-container">
          <div className="informations-personnelles">
            <h2
              onClick={() => toggleBlock("personalInfo")}
              style={{ cursor: "pointer", color: "#3498db" }}
            >
              Informations personnelles
            </h2>
          </div>
          {isPersonalInfoOpen && (
            <div className="personnal-info-details">
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
            </div>
          )}
          <button className="edit-button" onClick={toggleEdit}>
            {isEditable ? "Finir modification" : "Modifier"}
          </button>
        </div>

        {/* Morphostatique */}
        <div className="morphostatique-container">
          <div className="morphostatique">
            <h2
              onClick={() => toggleBlock("morphostatique")}
              style={{ cursor: "pointer", color: "#3498db" }}
            >
              Morphostatique
            </h2>
          </div>
          {isMorphostatiqueOpen && (
            <div className="morphostatique-details">
              <form className="morphostatique-form">
                <div className="form-group">
                  <label htmlFor="taille">Taille</label>
                  <input
                    type="number"
                    id="taille"
                    name="taille"
                    value={formData.taille}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder="Taille en cm"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="poids">Poids</label>
                  <input
                    type="number"
                    id="poids"
                    name="poids"
                    value={formData.poids}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder="Poids en kg"
                  />
                </div>
                <div className="form-group latéralité">
                  <label>Latéralité</label>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="lateralite"
                        value="ambidestre"
                        checked={formData.lateralite === "ambidestre"}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Ambidestre
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="lateralite"
                        value="droitier"
                        checked={formData.lateralite === "droitier"}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Droitier
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="lateralite"
                        value="gaucher"
                        checked={formData.lateralite === "gaucher"}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Gaucher
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="remarque">Remarque</label>
                  <textarea
                    id="remarque"
                    name="remarque"
                    value={formData.remarque}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder="Ajouter une remarque"
                  />
                </div>
              </form>
            </div>
          )}
          <button className="edit-button" onClick={toggleEdit}>
            {isEditable ? "Finir modification" : "Modifier"}
          </button>
        </div>

        {/* Anamnèse */}
        <div className="anamnese-container">
          <div className="anamnese">
            <h2
              onClick={() => toggleBlock("anamnese")}
              style={{ cursor: "pointer", color: "#3498db" }}
            >
              Anamnèse
            </h2>
          </div>
          {isAnamneseOpen && (
            <div className="anamnese-details">
              <form className="anamnese-form">
                <div className="form-group">
                  <label htmlFor="histoireMaladie">Histoire de la maladie</label>
                  <textarea
                    id="histoireMaladie"
                    name="histoireMaladie"
                    value={formData.histoireMaladie}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder="Décrire l'histoire de la maladie"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="antecedentsMedicaux">
                    Antécédents médicaux
                  </label>
                  <textarea
                    id="antecedentsMedicaux"
                    name="antecedentsMedicaux"
                    value={formData.antecedentsMedicaux}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder="Décrire les antécédents médicaux"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="antecedentsChirurgicaux">
                    Antécédents chirurgicaux
                  </label>
                  <textarea
                    id="antecedentsChirurgicaux"
                    name="antecedentsChirurgicaux"
                    value={formData.antecedentsChirurgicaux}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder="Décrire les antécédents chirurgicaux"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="antecedentsFamiliaux">
                    Antécédents familiaux
                  </label>
                  <textarea
                    id="antecedentsFamiliaux"
                    name="antecedentsFamiliaux"
                    value={formData.antecedentsFamiliaux}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder="Décrire les antécédents familiaux"
                  />
                </div>
              </form>
            </div>
          )}
          <button className="edit-button" onClick={toggleEdit}>
            {isEditable ? "Finir modification" : "Modifier"}
          </button>
        </div>

        {/* Travail */}
        <div className="travail-container">
          <div className="travail">
            <h2
              onClick={() => toggleBlock("travail")}
              style={{ cursor: "pointer", color: "#3498db" }}
            >
              Travail
            </h2>
          </div>
          {isTravailOpen && (
            <div className="travail-details">
              <form className="travail-form">
                {/* Situation professionnelle (choix unique) */}
                <div className="form-group">
                  <label>Situation professionnelle</label>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="situationProfessionnelle"
                        value="actif"
                        checked={formData.situationProfessionnelle === "actif"}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Actif
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="situationProfessionnelle"
                        value="retraite"
                        checked={formData.situationProfessionnelle === "retraite"}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Retraité
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="situationProfessionnelle"
                        value="sansEmploi"
                        checked={
                          formData.situationProfessionnelle === "sansEmploi"
                        }
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Sans emploi
                    </label>
                  </div>
                </div>
                {/* Type de travail (choix multiples) */}
                <div className="form-group">
                  <label>Type de travail</label>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="typeTravail"
                        value="sedentaires"
                        checked={formData.typeTravail.includes("sedentaires")}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Sédentaires
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="typeTravail"
                        value="poste"
                        checked={formData.typeTravail.includes("poste")}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Posté
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="typeTravail"
                        value="debout"
                        checked={formData.typeTravail.includes("debout")}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Debout
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="typeTravail"
                        value="chargesLourdes"
                        checked={formData.typeTravail.includes("chargesLourdes")}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Charges lourdes
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="typeTravail"
                        value="gestesRepétitifs"
                        checked={formData.typeTravail.includes(
                          "gestesRepétitifs"
                        )}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Gestes répétitifs
                    </label>
                  </div>
                </div>
                {/* Profession */}
                <div className="form-group">
                  <label htmlFor="profession">Profession</label>
                  <input
                    type="text"
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder="Entrer la profession"
                  />
                </div>
              </form>
            </div>
          )}
          <button className="edit-button" onClick={toggleEdit}>
            {isEditable ? "Finir modification" : "Modifier"}
          </button>
        </div>

        {/* Vie quotidienne */}
        <div className="vie-quotidienne-container">
          <div className="vie-quotidienne">
            <h2
              onClick={() => toggleBlock("vieQuotidienne")}
              style={{ cursor: "pointer", color: "#3498db" }}
            >
              Vie quotidienne
            </h2>
          </div>
          {isVieQuotidienneOpen && (
            <div className="vie-quotidienne-details">
              <form className="vie-quotidienne-form">
                {/* Lieu de vie (choix multiples) */}
                <div className="form-group">
                  <label>Lieu de vie</label>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="lieuVie"
                        value="Maison"
                        checked={formData.lieuVie.includes("Maison")}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Maison
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="lieuVie"
                        value="Appartement"
                        checked={formData.lieuVie.includes("Appartement")}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Appartement
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="lieuVie"
                        value="EHPAD"
                        checked={formData.lieuVie.includes("EHPAD")}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      EHPAD
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="lieuVie"
                        value="RDC"
                        checked={formData.lieuVie.includes("RDC")}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      RDC
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="lieuVie"
                        value="A l'étage"
                        checked={formData.lieuVie.includes("A l'étage")}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      A l'étage
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="lieuVie"
                        value="Isolé"
                        checked={formData.lieuVie.includes("Isolé")}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Isolé
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="lieuVie"
                        value="En famille"
                        checked={formData.lieuVie.includes("En famille")}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      En famille
                    </label>
                  </div>
                </div>

                {/* Aide extérieur (choix unique) */}
                <div className="form-group">
                  <label>Aide extérieur</label>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="aideExterieur"
                        value="Quotidienne"
                        checked={formData.aideExterieur === "Quotidienne"}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Quotidienne
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="aideExterieur"
                        value="Hebdomadaire"
                        checked={formData.aideExterieur === "Hebdomadaire"}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Hebdomadaire
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="aideExterieur"
                        value="pluri-hebdomadaire"
                        checked={formData.aideExterieur === "pluri-hebdomadaire"}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Pluri-hebdomadaire
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="aideExterieur"
                        value="Mensuel"
                        checked={formData.aideExterieur === "Mensuel"}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Mensuel
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="aideExterieur"
                        value="Permanente"
                        checked={formData.aideExterieur === "Permanente"}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Permanente
                    </label>
                  </div>
                </div>

                {/* Situation (choix multiples) */}
                <div className="form-group">
                  <label>Situation</label>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="situation"
                        value="Célibataire"
                        checked={formData.situation.includes("Célibataire")}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Célibataire
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="situation"
                        value="Marié"
                        checked={formData.situation.includes("Marié")}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Marié
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="situation"
                        value="Avec enfant"
                        checked={formData.situation.includes("Avec enfant")}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Avec enfant
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="situation"
                        value="Sans enfant"
                        checked={formData.situation.includes("Sans enfant")}
                        onChange={handleChange}
                        disabled={!isEditable}
                      />
                      Sans enfant
                    </label>
                  </div>
                </div>

                {/* Zones de texte pour Sport et Loisirs et Remarque */}
                <div className="form-group">
                  <label htmlFor="sportLoisirs">Sport et loisirs</label>
                  <textarea
                    id="sportLoisirs"
                    name="sportLoisirs"
                    value={formData.sportLoisirs}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder="Décrire les activités sportives et de loisirs"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="remarque">Remarque</label>
                  <textarea
                    id="remarque"
                    name="remarque"
                    value={formData.remarque}
                    onChange={handleChange}
                    disabled={!isEditable}
                    placeholder="Ajouter une remarque"
                  />
                </div>
              </form>
            </div>
          )}
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
