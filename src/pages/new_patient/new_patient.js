import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./new_patient.css";

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

  const [isPersonalInfoEditable, setIsPersonalInfoEditable] = useState(true);
  const [isMorphostatiqueEditable, setIsMorphostatiqueEditable] = useState(true);
  const [isAnamneseEditable, setIsAnamneseEditable] = useState(true);
  const [isTravailEditable, setIsTravailEditable] = useState(true);
  const [isVieQuotidienneEditable, setIsVieQuotidienneEditable] = useState(true);

  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(true);
  const [isMorphostatiqueOpen, setIsMorphostatiqueOpen] = useState(true);
  const [isAnamneseOpen, setIsAnamneseOpen] = useState(true);
  const [isTravailOpen, setIsTravailOpen] = useState(true);
  const [isVieQuotidienneOpen, setIsVieQuotidienneOpen] = useState(true);

  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

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
  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
          const audioUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = audioUrl;
          a.download = "recording.wav";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing microphone: ", error);
      }
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="fiche-kine-container">
      <h1>Nouveau Patient</h1>

      <Link to="/" className="back-button">
        Retour à la page principale
      </Link>
      {/* Bouton enregistrement audio */}
      <button className="audio-button" onClick={toggleRecording}>
        <img 
          src="/path-to-your-image.png" 
          alt="Audio Icon" 
          className="audio-icon" 
        />
        {isRecording ? "Arrêter l'enregistrement" : "Enregistrement audio"}
      </button>

      
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
                  disabled={!isPersonalInfoEditable}
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
                  disabled={!isPersonalInfoEditable}
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
                  disabled={!isPersonalInfoEditable}
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
                  disabled={!isPersonalInfoEditable}
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
                  disabled={!isPersonalInfoEditable}
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
                  disabled={!isPersonalInfoEditable}
                />
              </div>
            </form>
          </div>
        )}
        <div className="button-container">
          <button
            className="edit-button"
            onClick={() => setIsPersonalInfoEditable(!isPersonalInfoEditable)}
          >
            {isPersonalInfoEditable ? "Finir modification" : "Modifier"}
          </button>
        </div>
      </div>

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
                  disabled={!isMorphostatiqueEditable}
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
                  disabled={!isMorphostatiqueEditable}
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
                      disabled={!isMorphostatiqueEditable}
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
                      disabled={!isMorphostatiqueEditable}
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
                      disabled={!isMorphostatiqueEditable}
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
                  disabled={!isMorphostatiqueEditable}
                  placeholder="Ajouter une remarque"
                />
              </div>
            </form>
          </div>
        )}
        <button
          className="edit-button"
          onClick={() => setIsMorphostatiqueEditable(!isMorphostatiqueEditable)}
        >
          {isMorphostatiqueEditable ? "Finir modification" : "Modifier"}
        </button>
      </div>

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
                  disabled={!isAnamneseEditable}
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
                  disabled={!isAnamneseEditable}
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
                  disabled={!isAnamneseEditable}
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
                  disabled={!isAnamneseEditable}
                  placeholder="Décrire les antécédents familiaux"
                />
              </div>
            </form>
          </div>
        )}
        <button
          className="edit-button"
          onClick={() => setIsAnamneseEditable(!isAnamneseEditable)}
        >
          {isAnamneseEditable ? "Finir modification" : "Modifier"}
        </button>
      </div>

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
              <div className="form-group">
                <label htmlFor="situationProfessionnelle">
                  Situation professionnelle
                </label>
                <input
                  type="text"
                  id="situationProfessionnelle"
                  name="situationProfessionnelle"
                  value={formData.situationProfessionnelle}
                  onChange={handleChange}
                  disabled={!isTravailEditable}
                  placeholder="Décrire la situation professionnelle"
                />
              </div>
              <div className="form-group">
                <label htmlFor="typeTravail">Type de travail</label>
                <input
                  type="text"
                  id="typeTravail"
                  name="typeTravail"
                  value={formData.typeTravail}
                  onChange={handleChange}
                  disabled={!isTravailEditable}
                  placeholder="Décrire le type de travail"
                />
              </div>
              <div className="form-group">
                <label htmlFor="profession">Profession</label>
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  disabled={!isTravailEditable}
                  placeholder="Décrire la profession"
                />
              </div>
            </form>
          </div>
        )}
        <button
          className="edit-button"
          onClick={() => setIsTravailEditable(!isTravailEditable)}
        >
          {isTravailEditable ? "Finir modification" : "Modifier"}
        </button>
      </div>

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
              <div className="form-group">
                <label htmlFor="lieuVie">Lieu de vie</label>
                <input
                  type="text"
                  id="lieuVie"
                  name="lieuVie"
                  value={formData.lieuVie}
                  onChange={handleChange}
                  disabled={!isVieQuotidienneEditable}
                  placeholder="Décrire le lieu de vie"
                />
              </div>
              <div className="form-group">
                <label htmlFor="aideExterieur">Aide extérieure</label>
                <input
                  type="text"
                  id="aideExterieur"
                  name="aideExterieur"
                  value={formData.aideExterieur}
                  onChange={handleChange}
                  disabled={!isVieQuotidienneEditable}
                  placeholder="Décrire l'aide extérieure"
                />
              </div>
              <div className="form-group">
                <label htmlFor="sportLoisirs">Sport et loisirs</label>
                <input
                  type="text"
                  id="sportLoisirs"
                  name="sportLoisirs"
                  value={formData.sportLoisirs}
                  onChange={handleChange}
                  disabled={!isVieQuotidienneEditable}
                  placeholder="Décrire les sports et loisirs"
                />
              </div>
            </form>
          </div>
        )}
        <button
          className="edit-button"
          onClick={() => setIsVieQuotidienneEditable(!isVieQuotidienneEditable)}
        >
          {isVieQuotidienneEditable ? "Finir modification" : "Modifier"}
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
