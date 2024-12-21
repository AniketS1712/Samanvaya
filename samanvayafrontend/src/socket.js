import { io } from "socket.io-client";

const socket = io("wss://samanvayabackend.onrender.com", {
  transports: ["websocket", "polling"],
});
socket.on("connect", () => {socket.on("connect", () => {
  console.log("Socket ID:", socket.id);
  console.log("Socket connected successfully");
});
socket.on("disconnect", () => {
  console.log("Socket disconnected");
});
socket.on("error", (error) => {
  console.error("Socket error:", error);
});
  console.log("Socket ID:", socket.id);
});
export default socket;
