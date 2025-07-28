import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "./MoodyPlayer.css";
import axios from "axios";

const MoodyPlayer = ({ setSongs }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // put models in public/models
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Camera error:", err));
    };

    loadModels();
  }, []);

  const interval = async () => {
    if (videoRef.current && faceapi.nets.faceExpressionNet.params) {
      const detections = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();
      if (detections && detections.expressions) {
        const sorted = Object.entries(detections.expressions).sort(
          (a, b) => b[1] - a[1]
        );
        // setExpression(sorted[0][0]);  // highest probability expression
        await axios
          .get(`http://localhost:3000/songs?mood=${sorted[0][0]}`)
          .then((res) => setSongs(res.data.songs));
      }
    }
  };

  return (
    <div className="">
      <video ref={videoRef} autoPlay muted className="video" />
      {/* <h2 className="mt-4  font-bold">Detected Mood: {expression}</h2> */}
      <button
        className="border px-2 py-2 rounded-lg font-bold bg-blue-400 hover:scale(120%)"
        onClick={interval}
      >
        Detect Mood
      </button>
    </div>
  );
};

export default MoodyPlayer;
