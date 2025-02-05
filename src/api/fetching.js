const API_URL = "http://localhost:8080";

//post new kine
export const postNewKine = async (kine) => {
  try {
    const response = await fetch(`${API_URL}/kine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(kine),
    });
    if (!response.ok) {
      throw new Error("Failed to post new kine");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to post new kine", error);
    return null;
  }
};

//connect kine
export const connectUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/kine/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Failed to connect user");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to connect user", error);
    return null;
  }
};

//update kine
export const updateKine = async (kine) => {
  try {
    const response = await fetch(`${API_URL}/kine/${kine.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(kine),
    });
    if (!response.ok) {
      throw new Error("Failed to update kine");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to update kine", error);
    return null;
  }
};

//get all patients from kine/patients/{kineId}
export const getPatients = async (kineId) => {
  try {
    const response = await fetch(`${API_URL}/kine/patients/${kineId}`);
    if (!response.ok) {
      throw new Error("Failed to get patients");
    }
    const data = await response.json();
    return data.patients;
  } catch (error) {
    console.error("Failed to get patients", error);
    return [];
  }
};

//get patient by id from patient/{patientId}
export const getPatientById = async (patientId) => {
  try {
    const response = await fetch(`${API_URL}/patient/${patientId}`);
    if (!response.ok) {
      throw new Error("Failed to get patient");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to get patient", error);
    return null;
  }
};

//post new patient
export const postNewPatient = async (patient) => {
  try {
    const response = await fetch(`${API_URL}/patient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    });
    if (!response.ok) {
      throw new Error("Failed to post new patient");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to post new patient", error);
    return null;
  }
};

//update patient
export const updatePatient = async (patient) => {
  try {
    const response = await fetch(`${API_URL}/patient/${patient.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    });
    if (!response.ok) {
      throw new Error("Failed to update patient");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to update patient", error);
    return null;
  }
};

//get patient cusultations by patientId
export const getConsultations = async (patientId) => {
  try {
    const response = await fetch(`${API_URL}/patient/consultations/${patientId}`);
    if (!response.ok) {
      throw new Error("Failed to get consultations");
    }
    const data = await response.json();
    return data.consultations;
  } catch (error) {
    console.error("Failed to get consultations", error);
    return [];
  }
};

//get bdk files with consultation id
 export const getBDKFiles = async (consultationId) => {
  try {
    const response = await fetch(`${API_URL}/consultation/download/${consultationId}`);
    console.log("Request", `${API_URL}/consultation/download/${consultationId}`);
    if (!response.ok) {
      throw new Error("Failed to get BDK files");
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    console.log("bdk file URL", url);
    return url;
  } catch (error) {
    console.error("Failed to get BDK files", error);
    return null;
  }
};

//post new consultation
export const postNewConsultation = async (consultation) => {
  try {
    const response = await fetch(`${API_URL}/consultation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consultation),
    });
    if (!response.ok) {
      throw new Error("Failed to post new consultation");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to post new consultation", error);
    return null;
  }
};

//get consultation by id
export const getConsultationById = async (consultationId) => {
  try {
    const response = await fetch(`${API_URL}/consultation/${consultationId}`);
    if (!response.ok) {
      throw new Error("Failed to get consultation");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to get consultation", error);
    return null;
  }
};

//stream video
export const streamVideo = async (videoBlob) => {
  try {
    const response = await fetch(`${API_URL}/video`, {
      method: "POST",
      body: videoBlob,
    });
    if (!response.ok) {
      throw new Error("Failed to stream video");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to stream video", error);
    return null;
  }
};

//post audio file
export const sendAudioToAPI = async (blob) => {
  const formData = new FormData();
  formData.append('file', blob, 'recording.wav');

  try {
    const response = await fetch('http://localhost:8000/transcription/speech-to-text/', {
      method: 'POST',
      body: formData,
    });
    // Vérifier si la réponse est OK
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

    const result = await response.json();
    console.log('Success:', result);
    console.log(result.transcription);
      // Envoyer la transcription à une deuxième API
      try {
        const sendTextToAPI = await fetch('http://localhost:8082/ner_task/extract_entities', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body:  JSON.stringify({
            text: result.transcription, 
          }),
        });

        // Vérifier si la réponse de la deuxième API est OK
        if (!sendTextToAPI.ok) {
          throw new Error(`Erreur HTTP (deuxième API): ${sendTextToAPI.status}`);
        }

        const sendTextToAPIResult = await sendTextToAPI.json();
        console.log('Success:', sendTextToAPIResult);
        // Retourner le résultat de la deuxième API
        return sendTextToAPIResult;

      } catch (sendTextToAPIError) {
        console.error('Erreur lors de l\'envoi à la deuxième API:', sendTextToAPIError);
      }
  } catch (error) {
    console.error('Error uploading audio:', error);
  }
};

//upload video
export const uploadVideo = async (videoBlob, genouId, patientId) => {
  const formData = new FormData();
  formData.append('file', videoBlob, 'video.mp4');

  try {
    const response = await fetch(`${API_URL}/upload/${genouId}/${patientId}`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const result = await response.json();
    console.log('Success:', result);
    return result;
  } catch (error) {
    console.error('Error uploading video:', error);
  }
};