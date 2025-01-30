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
    return await response.json();
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
    return await response.json();
  } catch (error) {
    console.error("Failed to get consultations", error);
    return [];
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