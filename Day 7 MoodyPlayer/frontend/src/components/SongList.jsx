const SongList = ({ songs }) => {
  console.log(songs);
  return (
    <div className="container bg-red-800">
      {songs.map((song, i) => (
        <audio className="text-white" key={i} src={song.audio} controls></audio>
      ))}
    </div>
  );
};

export default SongList;
