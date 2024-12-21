import React, { useState, useRef } from "react";
import "./MusicPlayer.css";
import song1 from "./songs/WanoTheme.mp3";
import song2 from "./songs/Naruto-Blue-Bird.mp3"; // Add additional songs here

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  // Playlist of songs
  const playlist = [song1, song2]; // Add more songs to the array

  // Toggle play and pause
  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Play the next song in the playlist
  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
    setProgress(0);
    setIsPlaying(false);
    audioRef.current.pause(); // Pause the current song before switching
    audioRef.current.load();  // Ensure the new song is loaded
    audioRef.current.play();  // Play the next song
    setIsPlaying(true);
  };

  const previousSong = () => {
    const prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(prevIndex);
    setProgress(0);
    setIsPlaying(false);
    audioRef.current.pause();
    audioRef.current.load();
    audioRef.current.play();
    setIsPlaying(true);
  };

  const skipSong = () => {
    audioRef.current.currentTime = 0;
    setProgress(0);
  };

  const handleProgress = () => {
    const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(percentage);
  };

  const handleVolumeChange = (event) => {
    const volumeValue = event.target.value;
    setVolume(volumeValue);
    audioRef.current.volume = volumeValue;
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="music-player-container">
      {isMinimized ? (
        <button className="minimized-button" onClick={toggleMinimize}>
          🎵
        </button>
      ) : (
        <div className="music-player">
          <audio
            ref={audioRef}
            src={playlist[currentSongIndex]}
            onTimeUpdate={handleProgress}
            onEnded={nextSong}
            onCanPlayThrough={() => {
              if (isPlaying) audioRef.current.play();
            }}
          />

          <button className="minimize-btn" onClick={toggleMinimize}>
            🎵
          </button>

          <div className="player-controls">
            <button onClick={previousSong}>Previous</button>
            <button onClick={playPause}>{isPlaying ? "Pause" : "Play"}</button>
            <button onClick={skipSong}>Skip</button>
            <button onClick={nextSong}>Next</button>
          </div>

          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="volume-control">
            <label>Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
