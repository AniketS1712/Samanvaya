import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";
import "./RoomForm.css";

function RoomForm() {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [joinSuccess, setJoinSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomCreated, setRoomCreated] = useState(false);

  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();
    socket.emit("createRoom", { roomName, username }, (response) => {
      if (response.success) {
        setRoomCode(response.roomCode);
        setRoomCreated(true);
        navigate(
          `/WhiteBoard?roomCode=${response.roomCode}&username=${username}`
        );
      } else {
        setErrorMessage(response.message || "Failed to create room.");
      }
    });
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    socket.emit("joinRoom", { roomCode: joinCode, username }, (response) => {
      setJoinSuccess(response.success);
      if (response.success) {
        console.log("Joined Room Code:", response.roomCode);
        navigate(`/WhiteBoard?roomCode=${joinCode}&username=${username}`);
      } else {
        setErrorMessage(response.message || "Failed to join room.");
      }
    });
  };

  return (
    <div className="container">
      {/* Create Room Section */}
      <div className="formSection">
        <h2>Create Room</h2>
        <form onSubmit={handleCreateRoom}>
          <div className="inputGroup">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="roomName">Room Name:</label>
            <input
              type="text"
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
              placeholder="Enter room name"
            />
          </div>
          <button type="submit" className="button">
            Create Room
          </button>
          {roomCreated && (
            <div className="inputGroup">
              <label htmlFor="roomCode">Room Code:</label>
              <input type="text" id="roomCode" value={roomCode} disabled />
            </div>
          )}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      </div>

      {/* Join Room Section */}
      <div className="formSection">
        <h2>Join Room</h2>
        <form onSubmit={handleJoinRoom}>
          <div className="inputGroup">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="joinCode">Room Code:</label>
            <input
              type="text"
              id="joinCode"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              required
              placeholder="Enter room code"
            />
          </div>
          <button type="submit" className="button">
            Join Room
          </button>
          {joinSuccess === false && (
            <p style={{ color: "red" }}>Failed to join the room.</p>
          )}
          {errorMessage && joinSuccess === null && (
            <p style={{ color: "red" }}>{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default RoomForm;
