import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./FicheClient.css";
import { getPatientById, updatePatient } from "../../../api/fetching";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";

/**
 * PersonalInfo component fetches and displays patient information.
 * It allows editing and updating patient details.
 */
const PersonalInfo = () => {
  const { patientId } = useParams();
  const [formData, setFormData] = useState({
    id: "",
    nom: "",
    prenom: "",
    kineId: "",
    sexe: "",
    dateDeNaissance: "",
    telephone: "",
    email: "",
    adresse: "",
    taille: "",
    poids: "",
    carteVitale: "",
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
  const [openSections, setOpenSections] = useState({
    personalInfo: true,
    morphostatique: true,
    anamnese: true,
    travail: true,
    vieQuotidienne: true,
  });

  /**
   * Fetch patient data by ID and update formData state.
   */
  useEffect(() => {
    const fetchPatientData = async () => {
      const patientData = await getPatientById(patientId);
      if (patientData) {
        setFormData({
          id: patientData.id,
          nom: patientData.nom,
          prenom: patientData.prenom,
          dateDeNaissance: patientData.date_naissance,
          telephone: patientData.tel,
          email: patientData.email,
          kineId: patientData.kineid,
          sexe: patientData.sexe,
          carteVitale: patientData.carte_vitale,
          adresse: `${patientData.adresse.rue}, ${patientData.adresse.ville}, ${patientData.adresse.code_postal}`,
          taille: patientData.morphostatique.taille,
          poids: patientData.morphostatique.poids,
          lateralite: patientData.morphostatique.lateralite,
          remarque: patientData.morphostatique.remarques,
          histoireMaladie: patientData.anamnese.historique_maladie,
          antecedentsMedicaux: patientData.anamnese.antecedents,
          antecedentsChirurgicaux: patientData.anamnese.antecedents_chirurgicaux,
          antecedentsFamiliaux: patientData.anamnese.antecedents_familiaux,
          situationProfessionnelle: patientData.travail.profession,
          typeTravail: [],
          profession: patientData.travail.profession,
          lieuVie: [],
          aideExterieur: "", 
          situation: [],
          sportLoisirs: patientData.travail.sport,
        });
      }
    };

    fetchPatientData();
  }, [patientId]);

  /**
   * Handle form input change.
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["typeTravail", "situation", "lieuVie"].includes(name)) {
      const updatedValues = formData[name].includes(value)
        ? formData[name].filter((item) => item !== value)
        : [...formData[name], value];
      setFormData({ ...formData, [name]: updatedValues });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /**
   * Handle form submission to update patient data.
   * @param {Object} e - Event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPatient = {
        id: formData.id,
      adresse: {
        rue: formData.adresse.split(",")[0],
        ville: formData.adresse.split(",")[1].trim(),
        code_postal: formData.adresse.split(",")[2].trim(),
      },
      anamnese: {
        historique_maladie: formData.histoireMaladie || "",
        motif: formData.motif || "",
        antecedents: formData.antecedentsMedicaux || "",
        antecedents_familiaux: formData.antecedentsFamiliaux || "",
      },
      carte_vitale: formData.carteVitale || "",
      date_naissance: formData.dateDeNaissance,
      email: formData.email,
      kineid: formData.kineId,
      morphostatique: {
        taille: formData.taille || 0, 
        poids: formData.poids || 0, 
        lateralite: formData.lateralite || "droite", 
        remarques: formData.remarque || "",
      },
      nom: formData.nom,
      prenom: formData.prenom,
      sexe: formData.sexe || "homme", 
      tel: formData.telephone,
      travail: {
        profession: formData.profession || "", 
        sport: formData.sportLoisirs || "", 
      },
    };
  
    console.log("Objet patient à mettre à jour:", updatedPatient);
  
    const result = await updatePatient(updatedPatient);
    if (result) {
      console.log("Patient updated successfully:", result);
    } else {
      console.error("Failed to update patient");
    }
  };

  /**
   * Toggle edit mode.
   */
  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  /**
   * Toggle visibility of a section.
   * @param {string} block - Section name
   */
  const toggleBlock = (block) => {
    setOpenSections({ ...openSections, [block]: !openSections[block] });
  };

  /**
   * Render a form group with label and input/textarea.
   * @param {string} label - Label text
   * @param {string} type - Input type
   * @param {string} name - Input name
   * @param {string} value - Input value
   * @param {string} [placeholder=""] - Input placeholder
   * @returns {JSX.Element} Form group element
   */
  const renderFormGroup = (label, type, name, value, placeholder = "") => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          disabled={!isEditable}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          disabled={!isEditable}
          placeholder={placeholder}
        />
      )}
    </div>
  );

  /**
   * Render a radio button group.
   * @param {string} label - Label text
   * @param {string} name - Input name
   * @param {Array} options - Array of options with label and value
   * @returns {JSX.Element} Radio group element
   */
  const renderRadioGroup = (label, name, options) => (
    <div className="form-group">
      <label>{label}</label>
      <div>
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={formData[name] === option.value}
              onChange={handleChange}
              disabled={!isEditable}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );

  /**
   * Render a checkbox group.
   * @param {string} label - Label text
   * @param {string} name - Input name
   * @param {Array} options - Array of options with label and value
   * @returns {JSX.Element} Checkbox group element
   */
  const renderCheckboxGroup = (label, name, options) => (
    <div className="form-group">
      <label>{label}</label>
      <div>
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={formData[name].includes(option.value)}
              onChange={handleChange}
              disabled={!isEditable}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );

  /*if (!user) {
    return (
    <div>Vous devez être connecté pour accéder à cette page</div>
  );
  }*/

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
          {openSections.personalInfo && (
            <div className="personnal-info-details">
              <form className="personal-info-form">
                {renderFormGroup("Nom", "text", "nom", formData.nom)}
                {renderFormGroup("Prénom", "text", "prenom", formData.prenom)}
                {renderFormGroup("Date de naissance", "text", "dateDeNaissance", formData.dateDeNaissance.split("T")[0].split("-").reverse().join("-"), "Date de naissance")}
            {renderFormGroup("Numéro de téléphone", "tel", "telephone", formData.telephone)}
                {renderFormGroup("Adresse e-mail", "email", "email", formData.email)}
                {renderFormGroup("Adresse", "text", "adresse", formData.adresse)}
              </form>
            </div>
          )}
          <button className="edit-button" onClick={isEditable ? handleSubmit : toggleEdit}>
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
          {openSections.morphostatique && (
            <div className="morphostatique-details">
              <form className="morphostatique-form">
                {renderFormGroup("Taille", "number", "taille", formData.taille, "Taille en cm")}
                {renderFormGroup("Poids", "number", "poids", formData.poids, "Poids en kg")}
                {renderRadioGroup("Latéralité", "lateralite", [
                  { label: "Ambidestre", value: "ambidestre" },
                  { label: "Droitier", value: "droitier" },
                  { label: "Gaucher", value: "gaucher" },
                ])}
                {renderFormGroup("Remarque", "textarea", "remarque", formData.remarque, "Ajouter une remarque")}
              </form>
            </div>
          )}
          <button className="edit-button" onClick={isEditable ? handleSubmit : toggleEdit}>
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
          {openSections.anamnese && (
            <div className="anamnese-details">
              <form className="anamnese-form">
                {renderFormGroup("Histoire de la maladie", "textarea", "histoireMaladie", formData.histoireMaladie, "Décrire l'histoire de la maladie")}
                {renderFormGroup("Antécédents médicaux", "textarea", "antecedentsMedicaux", formData.antecedentsMedicaux, "Décrire les antécédents médicaux")}
                {
                 //{renderFormGroup("Antécédents chirurgicaux", "textarea", "antecedentsChirurgicaux", formData.antecedentsChirurgicaux, "Décrire les antécédents chirurgicaux")}

                }
                {renderFormGroup("Antécédents familiaux", "textarea", "antecedentsFamiliaux", formData.antecedentsFamiliaux, "Décrire les antécédents familiaux")}
              </form>
            </div>
          )}
          <button className="edit-button" onClick={isEditable ? handleSubmit : toggleEdit}>
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
          {openSections.travail && (
            <div className="travail-details">
              <form className="travail-form">
                {renderRadioGroup("Situation professionnelle", "situationProfessionnelle", [
                  { label: "Actif", value: "actif" },
                  { label: "Retraité", value: "retraite" },
                  { label: "Sans emploi", value: "sansEmploi" },
                ])}
                {renderCheckboxGroup("Type de travail", "typeTravail", [
                  { label: "Sédentaires", value: "sedentaires" },
                  { label: "Posté", value: "poste" },
                  { label: "Debout", value: "debout" },
                  { label: "Charges lourdes", value: "chargesLourdes" },
                  { label: "Gestes répétitifs", value: "gestesRepétitifs" },
                ])}
                {renderFormGroup("Profession", "text", "profession", formData.profession, "Entrer la profession")}
              </form>
            </div>
          )}
          <button className="edit-button" onClick={isEditable ? handleSubmit : toggleEdit}>
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
          {openSections.vieQuotidienne && (
            <div className="vie-quotidienne-details">
              <form className="vie-quotidienne-form">
                {renderCheckboxGroup("Lieu de vie", "lieuVie", [
                  { label: "Maison", value: "Maison" },
                  { label: "Appartement", value: "Appartement" },
                  { label: "EHPAD", value: "EHPAD" },
                  { label: "RDC", value: "RDC" },
                  { label: "A l'étage", value: "A l'étage" },
                  { label: "Isolé", value: "Isolé" },
                  { label: "En famille", value: "En famille" },
                ])}
                {renderRadioGroup("Aide extérieur", "aideExterieur", [
                  { label: "Quotidienne", value: "Quotidienne" },
                  { label: "Hebdomadaire", value: "Hebdomadaire" },
                  { label: "Pluri-hebdomadaire", value: "pluri-hebdomadaire" },
                  { label: "Mensuel", value: "Mensuel" },
                  { label: "Permanente", value: "Permanente" },
                ])}
                {renderCheckboxGroup("Situation", "situation", [
                  { label: "Célibataire", value: "Célibataire" },
                  { label: "Marié", value: "Marié" },
                  { label: "Avec enfant", value: "Avec enfant" },
                  { label: "Sans enfant", value: "Sans enfant" },
                ])}
                {renderFormGroup("Sport et loisirs", "textarea", "sportLoisirs", formData.sportLoisirs, "Décrire les activités sportives et de loisirs")}
                {renderFormGroup("Remarque", "textarea", "remarque", formData.remarque, "Ajouter une remarque")}
              </form>
            </div>
          )}
          <button className="edit-button" onClick={isEditable ? handleSubmit : toggleEdit}>
          {isEditable ? "Finir modification" : "Modifier"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PersonalInfo;
