import React, { useState } from "react";
import MoodyPlayer from "./components/MoodyPlayer";
import SongList from "./components/SongList";
import { set } from "mongoose";

function App() {
  const [songs, setSongs] = useState([]);

  return (
    <div className="min-h-screen bg-gray-800">
      <MoodyPlayer setSongs={setSongs} />
      <SongList songs={songs} />
    </div>
  );
}

export default App;
