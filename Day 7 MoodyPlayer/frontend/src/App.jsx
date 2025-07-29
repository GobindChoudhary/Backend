import React, { useState } from "react";
import MoodyPlayer from "./components/MoodyPlayer";
import SongList from "./components/SongList";

function App() {
  const [songs, setSongs] = useState([]);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white px-4 py-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        <MoodyPlayer setSongs={setSongs} />
        <SongList songs={songs} />
      </div>
    </div>
  );
}

export default App;
