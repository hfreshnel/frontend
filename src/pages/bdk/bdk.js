import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { uploadVideo } from "../../api/fetching"; // Import the uploadVideo function
import "./bdk.css";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';


const BDK = () => {
  const { user } = useContext(AuthContext);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const { patientId, option } = useParams();
  const initialAngles = option === "1" ? {
    "genou-droit-flexion": "estimation en cours",
    "genou-droit-extension": "estimation en cours",
    "genou-gauche-flexion": "NA",
    "genou-gauche-extension": "NA",
  } : {
    "genou-droit-flexion": "NA",
    "genou-droit-extension": "NA",
    "genou-gauche-flexion": "estimation en cours",
    "genou-gauche-extension": "estimation en cours",
  };
  const [angles, setAngles] = useState(initialAngles);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

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
  const stopCamera = async () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      const mediaRecorder = new MediaRecorder(streamRef.current);
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const response = await uploadVideo(blob, option, patientId);
        if (response && response.angles) {
          if (option === "1") {
            setAngles({
              "genou-droit-flexion": response.angles.Flexion,
              "genou-droit-extension": response.angles.Extension,
              "genou-gauche-flexion": "NA",
              "genou-gauche-extension": "NA",
            });
          } else if (option === "0") {
            setAngles({
              "genou-droit-flexion": "NA",
              "genou-droit-extension": "NA",
              "genou-gauche-flexion": response.angles.Flexion,
              "genou-gauche-extension": response.angles.Extension,
            });
          }
        }
      };

      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
        setIsCameraOn(false);
      }, 1000); // Adjust the timeout as needed
    }
  };

  const handleValidation = () => {
    navigate(`/patient/${patientId}/consultation`, { state: { angles } });
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
            <td data-id="genou-droit-flexion">{angles["genou-droit-flexion"]}</td>
            <td></td>
          </tr>
          <tr>
            <td className="sub-row">Extension</td>
            <td data-id="genou-droit-extension">{angles["genou-droit-extension"]}</td>
            <td></td>
          </tr>
          <tr>
            <td>Genou gauche</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="sub-row">Flexion</td>
            <td data-id="genou-gauche-flexion">{angles["genou-gauche-flexion"]}</td>
            <td></td>
          </tr>
          <tr>
            <td className="sub-row">Extension</td>
            <td data-id="genou-gauche-extension">{angles["genou-gauche-extension"]}</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <button onClick={handleValidation} className="validation-button">
        Valider
      </button>

      <Footer />
    </div>
  );
};

export default BDK;
