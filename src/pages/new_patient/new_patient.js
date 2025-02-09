import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import CollapsibleSection from "../../components/section/section";
import DynamicForm from "../../components/form/form";
import "./new_patient.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { sections } from "../../assets/templates/form_template";
import { postNewPatient } from "../../api/fetching";
import Microphone from "../../components/microphone/microphone";

/**
 * PersonalInfo component handles the creation of a new patient.
 * It includes form sections for different patient information categories.
 * It also integrates a microphone component for voice input.
 */
const PersonalInfo = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // State to hold new patient information
    const [newPatient, setNewPatient] = useState({
        nom: "",
        prenom: "",
        date_naissance: "",
        sexe: "homme",
        email: "",
        tel: "",
        carte_vitale: "",
        kineid: user.id,
        adresse: {
            code_postal: "",
            rue: "",
            ville: ""
        },
        anamnese: {
            antecedents: "",
            antecedents_familiaux: "",
            historique_maladie: "",
            motif: ""
        },
        morphostatique: {
            lateralite: "droite",
            taille: 0,
            poids: 0,
            remarques: ""
        },
        travail: {
            profession: "",
            sport: ""
        }
    });

    /**
     * Handle microphone data update.
     * Merges the updated patient data received from the microphone with the existing state.
     * @param {Object} updatedPatient - The updated patient data from the microphone.
     */
    const handleMicrophoneUpdate = (updatedPatient) => {
        console.log("🔵 Données reçues du microphone :", updatedPatient);

        setNewPatient((prevPatient) => {
            const mergedPatient = {
                ...prevPatient,
                ...updatedPatient,
                adresse: { 
                    ...prevPatient.adresse, 
                    ...updatedPatient.adresse 
                },
                morphostatique: { 
                    ...prevPatient.morphostatique, 
                    ...updatedPatient.morphostatique 
                },
                anamnese: { 
                    ...prevPatient.anamnese, 
                    ...updatedPatient.anamnese 
                },
                travail: { 
                    ...prevPatient.travail, 
                    ...updatedPatient.travail 
                }
            };
            console.log("🟢 Patient mis à jour après fusion :", mergedPatient);
            return mergedPatient;
        });
    };

    // Log the updated state of newPatient whenever it changes
    React.useEffect(() => {
        console.log("🟡 État mis à jour de newPatient :", newPatient);
    }, [newPatient]);

    /**
     * Handle form submission.
     * Updates the newPatient state based on the form data and posts the new patient data to the server.
     * @param {Event} e - The form submission event.
     * @param {string} sectionName - The name of the form section being submitted.
     */
    const handleOnsubmit = (e, sectionName) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log(`Section: ${sectionName}`, data);

        setNewPatient((prevPatient) => {
            const updatedPatient = (() => {
                switch (sectionName) {
                    case "Administratif":
                        return {
                            ...prevPatient,
                            nom: data.nom || prevPatient.nom,
                            prenom: data.prenom || prevPatient.prenom,
                            date_naissance: data.date_naissance || prevPatient.date_naissance,
                            sexe: data.sexe || prevPatient.sexe,
                            email: data.email || prevPatient.email,
                            tel: data.tel || prevPatient.tel,
                            carte_vitale: data.carte_vitale || prevPatient.carte_vitale,
                            adresse: {
                                ...prevPatient.adresse,
                                rue: data.rue || prevPatient.adresse.rue,
                                code_postal: data.code_postal || prevPatient.adresse.code_postal,
                                ville: data.ville || prevPatient.adresse.ville,
                                pays: data.country || prevPatient.adresse.pays
                            }
                        };
                    case "Morphostatique":
                        return {
                            ...prevPatient,
                            morphostatique: {
                                ...prevPatient.morphostatique,
                                taille: data.taille || prevPatient.morphostatique.taille,
                                poids: data.poids || prevPatient.morphostatique.poids,
                                lateralite: data.lateralite || prevPatient.morphostatique.lateralite,
                                remarque: data.remarques || prevPatient.morphostatique.remarque
                            }
                        };
                    case "Anamnèse":
                        return {
                            ...prevPatient,
                            anamnese: {
                                ...prevPatient.anamnese,
                                historique_maladie: data.historique_maladie || prevPatient.anamnese.historique_maladie,
                                antecedents: data["ante-medical"] || prevPatient.anamnese.antecedents,
                                antecedents_chirurgicaux: data["ante-chirurgical"] || prevPatient.anamnese.antecedents_chirurgicaux,
                                antecedents_familiaux: data["antecedents_familiaux"] || prevPatient.anamnese.antecedents_familiaux
                            }
                        };
                    case "Situation professionnelle":
                        return {
                            ...prevPatient,
                            travail: {
                                ...prevPatient.travail,
                                situation_actuelle: data["situation-actuelle"] || prevPatient.travail.situation_actuelle,
                                type_travail: data["type-travail"] || prevPatient.travail.type_travail,
                                profession: data.profession || prevPatient.travail.profession
                            }
                        };
                    case "Vie quotidienne":
                        return {
                            ...prevPatient,
                            vieQuotidienne: {
                                ...prevPatient.vieQuotidienne,
                                lieu_vie: data["lieu-vie"] || prevPatient.vieQuotidienne.lieu_vie,
                                alimentation: data.alimentation || prevPatient.vieQuotidienne.alimentation,
                                sports: data.sports || prevPatient.vieQuotidienne.sports,
                                loisirs: data.loisirs || prevPatient.vieQuotidienne.loisirs,
                                vie_privee: data["vie-privee"] || prevPatient.vieQuotidienne.vie_privee
                            }
                        };
                    default:
                        return prevPatient;
                }
            })();

            console.log('Updated Patient:', updatedPatient);
            postNewPatient(updatedPatient).then(() => {
                navigate('/dashboard');
            }).catch((error) => {
                console.error('Error posting new patient:', error);
            });
            return updatedPatient;
        });
    };

    if (!user) {
        console.error('User not found in AuthContext');
        return (<h1>You are not logged in.</h1>);
    }

    return (
        <>
            <Header />
            <h1>Nouveau patient</h1>
            <div className="form-container">
            <Microphone updatePatient={setNewPatient} handleMicrophoneUpdate={handleMicrophoneUpdate}  />
                {sections.map((section, index) => (
                    <CollapsibleSection key={index} title={section.title}>
                        <DynamicForm
                            fields={section.fields}
                            onSubmit={handleOnsubmit}
                            sectionName={section.title}
                            values={newPatient}
                            setValues={setNewPatient}
                        />
                    </CollapsibleSection>
                ))}
            </div>
            <Footer />
        </>
    );
};

export default PersonalInfo;