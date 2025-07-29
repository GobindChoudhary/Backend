import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

const MoodyPlayer = ({ setSongs }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // ensure models are in public/models
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
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
        const mood = sorted[0][0];

        try {
          const res = await axios.get(
            `http://localhost:3000/songs?mood=${mood}`
          );
          setSongs(res.data.songs);
        } catch (err) {
          console.error("Error fetching songs:", err);
        }
      }
    }
  };

  return (
    <div className="p-4 md:flex md:items-start md:gap-6">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="max-w-md w-full rounded-md shadow-md"
      />
      <div className="md:px-4 mt-4 md:mt-0 flex flex-col gap-4">
        <h1 className="text-white text-2xl font-semibold">
          Live mood detection
        </h1>
        <p className="text-white font-semibold max-w-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          quia maxime modi iusto reiciendis magnam?
        </p>
        <button
          onClick={interval}
          className="border px-4 py-2 max-w-40 rounded-md font-bold bg-blue-400 hover:bg-blue-800 text-white transition-colors"
        >
          Detect Mood
        </button>
      </div>
    </div>
  );
};

export default MoodyPlayer;
