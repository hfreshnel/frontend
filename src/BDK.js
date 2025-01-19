import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BDK.css";

const BDK = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Liste des caméras disponibles
  const listDevices = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.error("L'API MediaDevices n'est pas supportée dans ce navigateur.");
      alert("Votre navigateur ne supporte pas l'accès aux périphériques vidéo.");
      return;
    }
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === "videoinput");
      console.log("Caméras détectées :", videoDevices); // Affiche les caméras détectées
      setVideoDevices(videoDevices);
      if (videoDevices.length > 0) setSelectedDeviceId(videoDevices[0].deviceId);
    } catch (error) {
      console.error("Erreur lors de la récupération des périphériques :", error);
      alert("Erreur lors de la récupération des périphériques. Vérifiez vos paramètres.");
    }
  };

  useEffect(() => {
    listDevices();
  }, []);

  // Activer la webcam
 const startCamera = async () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error("L'API MediaDevices.getUserMedia n'est pas supportée.");
    alert("Votre navigateur ne supporte pas getUserMedia.");
    return;
  }
  try {
    console.log("Tentative d'accès à la caméra avec l'ID :", selectedDeviceId);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: selectedDeviceId } },
    });
    console.log("Flux vidéo reçu :", stream);
    videoRef.current.srcObject = stream;
    videoRef.current.play();
    streamRef.current = stream;
    setIsCameraOn(true);
  } catch (error) {
    console.error("Erreur lors de l'accès à la webcam :", error);
    alert("Erreur : " + error.message);
  }
};


  // Désactiver la webcam
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  return (
    <div className="bdk-container">
      {/* Bouton pour revenir à la page principale */}
      <Link to="/" className="back-button">
        Retour à la page principale
      </Link>

      <h1>BDK - Gestion de la Webcam</h1>

      <div className="video-frame">
        <video ref={videoRef} className="video" />
      </div>

      <div className="controls">
        {/* Liste déroulante des caméras disponibles */}
        <select
          onChange={(e) => setSelectedDeviceId(e.target.value)}
          value={selectedDeviceId}
        >
          {videoDevices.map((device, index) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Caméra ${index + 1}`}
            </option>
          ))}
        </select>
        
        <button onClick={startCamera} className="start-camera-button" disabled={isCameraOn}>
          Démarrer
        </button>
        <button onClick={stopCamera} className="stop-button" disabled={!isCameraOn}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default BDK;
