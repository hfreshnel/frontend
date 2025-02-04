import React, { useState, useRef } from "react";
import micOn from "../../assets/images/mic_on.svg";
import micOff from "../../assets/images/mic_off.svg";
import { sendAudioToAPI } from "../../api/fetching";
import "./microphone.css";

const Microphone = ({ updatePatient  }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);

    // Fonction pour convertir "5 mars 1985" en "1985-03-05"
  const convertirDate = (dateString) => {
    const moisMap = {
      janvier: "01", février: "02", mars: "03", avril: "04", mai: "05", juin: "06",
      juillet: "07", août: "08", septembre: "09", octobre: "10", novembre: "11", décembre: "12"
    };

    const regex = /^(\d{1,2}) (\w+) (\d{4})$/;
    const match = dateString.match(regex);
    
    if (match) {
      const jour = match[1].padStart(2, "0"); // Ajoute un zéro devant si besoin
      const mois = moisMap[match[2].toLowerCase()]; // Convertir mois en chiffre
      const annee = match[3];

      return `${annee}-${mois}-${jour}`;
    }
    return ""; // Retourne une chaîne vide si le format est invalide
  };
  
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            mediaRecorder.current.ondataavailable = (e) => {
                audioChunks.current.push(e.data);
            };
            mediaRecorder.current.onstop = async () => {
                const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
                setAudioURL(URL.createObjectURL(audioBlob));
        
                try {
                    const response = await sendAudioToAPI(audioBlob);
                    console.log('Audio sent to API:', response);
        
                    updatePatient((prevPatient) => ({
                        ...prevPatient,
                        nom: response.personne?.split(' ')[1] || prevPatient.nom,
                        prenom: response.personne?.split(' ')[0] || prevPatient.prenom,
                        date_naissance: prevPatient.date_naissance,
                        tel: response["Numéro de téléphone"] || prevPatient.tel,
                        email: response.Email || prevPatient.email,
                        adresse: {
                            ...prevPatient.adresse,
                            rue: response.Adresse || prevPatient.adresse.rue,
                            ville: response.Ville || prevPatient.adresse.ville,
                            code_postal: response["Code Postal"] || prevPatient.adresse.code_postal
                        },
                        morphostatique: {
                            ...prevPatient.morphostatique,
                            taille: response.Taille || prevPatient.morphostatique.taille,
                            poids: response.Poids || prevPatient.morphostatique.poids,
                            lateralite: response.Latéralité || prevPatient.morphostatique.lateralite
                        },
                        anamnese: {
                            ...prevPatient.anamnese,
                            historique_maladie: response.Maladie || prevPatient.anamnese.historique_maladie,
                            symptomes: response.Symptômes || prevPatient.anamnese.symptomes
                        },
                        travail: {
                            ...prevPatient.travail,
                            profession: response.Profession || prevPatient.travail.profession,
                            sport: response["Sport et loisirs"] || prevPatient.travail.sport
                        }
                    }));
                } catch (error) {
                    console.error('Failed to send audio to API:', error);
                }
            };
            mediaRecorder.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Failed to start recording:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            setIsRecording(false);
        }
    };

    return (
        <div className="microphone-container">
            <button className="audio-button" onClick={isRecording ? stopRecording : startRecording}>
                <img src={isRecording ? micOff : micOn} alt="Microphone" className="mic-icon" />
            </button>
            {audioURL && <audio src={audioURL} controls />}
        </div>
    );
};

export default Microphone;