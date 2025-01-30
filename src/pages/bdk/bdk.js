import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import "./bdk.css";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';


const BDK = () => {
  const { user } = useContext(AuthContext);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Liste des caméras disponibles
  const listDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videos = devices.filter((device) => device.kind === "videoinput");
    setVideoDevices(videos);
    if (videos.length > 0) setSelectedDeviceId(videos[0].deviceId);
  };

  useEffect(() => {
    listDevices();
  }, []);

  // Activer la webcam
  const startCamera = async () => {
    try {
      const constraints = selectedDeviceId
        ? { video: { deviceId: { exact: selectedDeviceId } } }
        : { video: true };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      streamRef.current = stream;
      setIsCameraOn(true);
    } catch (error) {
      if (error.name === 'OverconstrainedError') {
        console.error("Constraints cannot be satisfied by available devices:", error);
        // Fallback to default video constraints
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          streamRef.current = stream;
          setIsCameraOn(true);
        } catch (fallbackError) {
          console.error("Error accessing the webcam with fallback constraints:", fallbackError);
        }
      } else {
        console.error("Error accessing the webcam:", error);
      }
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

  if (!user) {
    console.error('User not found in AuthContext');
    return <h1>You are not logged in.</h1>;
  }

  return (
    <div className="bdk-container">
      <Header />

      <h1>BDK - Gestion de la Webcam</h1>

      <div className="video-frame">
        <video ref={videoRef} className="video" />
      </div>

      <div className="controls">
        <select
          onChange={(e) => setSelectedDeviceId(e.target.value)}
          value={selectedDeviceId}
        >
          {videoDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Caméra ${device.deviceId}`}
            </option>
          ))}
        </select>
        <button
          onClick={startCamera}
          className="start-camera-button"
          disabled={isCameraOn}
        >
          Démarrer
        </button>
        <button
          onClick={stopCamera}
          className="stop-button"
          disabled={!isCameraOn}
        >
          Stop
        </button>
      </div>

      {/* Tableau en dessous des boutons */}
      <table className="bdk-table">
        <thead>
          <tr>
            <th>Test</th>
            <th>Valeurs</th>
            <th>Ref</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Genou droit</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="sub-row">Flexion</td>
            <td>estimation en cours</td>
            <td></td>
          </tr>
          <tr>
            <td className="sub-row">Extension</td>
            <td>estimation en cours</td>
            <td></td>
          </tr>
          <tr>
            <td>Genou gauche</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="sub-row">Flexion</td>
            <td>NA</td>
            <td></td>
          </tr>
          <tr>
            <td className="sub-row">Extension</td>
            <td>NA</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default BDK;
