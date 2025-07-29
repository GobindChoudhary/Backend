import { useState } from "react";

const SongList = ({ songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);

  const handlePlayPause = (index) => {
    if (isPlaying === index) {
      setIsPlaying(null);
    } else {
      setIsPlaying(index);
    }
  };

  return (
    <div className="w-full max-w-4xl px-4 py-6 flex flex-col gap-4">
      <h2 className="text-white text-xl font-semibold mb-2">
        Recommended Tracks
      </h2>

      {songs.map((song, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-gray-900">{song.title}</h3>
            <p className="text-sm text-gray-600 uppercase">{song.artist}</p>
          </div>

          {isPlaying === index && (
            <audio key={index} src={song.audio} autoPlay className="hidden" />
          )}

          <button
            onClick={() => handlePlayPause(index)}
            className="text-2xl text-gray-800 hover:text-purple-600 transition-colors"
          >
            {isPlaying === index ? (
              <i className="ri-pause-large-line" />
            ) : (
              <i className="ri-play-large-fill" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SongList;
