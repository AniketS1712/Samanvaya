const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = express.Router();
const Room = require("./models/Room");
const Feedback = require("./models/Feedback");
const { sendEmail } = require("./email");
dotenv.config();

const io = new Server(server, {
  cors: {
    origin: "samanvaya.onrender.com",
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST"],
}));
app.use(express.json());
app.use("/api", router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

const predefinedRoomCodes = [
  "ROOM01",
  "ROOM02",
  "ROOM03",
  "ROOM04",
  "ROOM05",
  "ROOM06",
  "ROOM07",
  "ROOM08",
  "ROOM09",
  "ROOM10",
];

const isValidUsername = (username) => /^[a-zA-Z0-9_]{3,20}$/.test(username);

io.on("connection", (socket) => {
  console.log("User Connected: ");
  console.log(socket.id);

  socket.on("createRoom", async (data, callback) => {
    const { roomName, username } = data;

    if (!isValidUsername(username)) {
      return callback({
        success: false,
        message:
          "Invalid username. Use 3-20 characters: letters, numbers, or underscores.",
      });
    }

    if (
      !roomName ||
      typeof roomName !== "string" ||
      roomName.trim().length === 0
    ) {
      return callback({ success: false, message: "Invalid room name." });
    }

    try {
      const rooms = await Room.find({});
      if (rooms.length >= 10) {
        return callback({
          success: false,
          message: "Maximum room limit reached. Cannot create more rooms.",
        });
      }

      const availableRoomCode = predefinedRoomCodes.find((code) =>
        rooms.every((room) => room.roomCode !== code)
      );

      if (!availableRoomCode) {
        return callback({
          success: false,
          message: "No available room codes left.",
        });
      }

      const newRoom = new Room({
        roomName: roomName.trim(),
        roomCode: availableRoomCode,
        createdBy: username,
        leader: username,
        members: [username],
      });

      await newRoom.save();

      socket.join(availableRoomCode);
      socket.roomCode = availableRoomCode;
      socket.username = username;

      callback({ success: true, roomCode: availableRoomCode });
    } catch (error) {
      callback({
        success: false,
        message: "Server error while creating room.",
      });
    }
  });

  // Handle Joining of the room
  socket.on("joinRoom", async (data, callback) => {
    const { roomCode, username } = data;

    if (!isValidUsername(username)) {
      return callback({
        success: false,
        message:
          "Invalid username. Use 3-20 characters: letters, numbers, or underscores.",
      });
    }

    if (
      !roomCode ||
      typeof roomCode !== "string" ||
      roomCode.trim().length !== 6
    ) {
      return callback({ success: false, message: "Invalid room code." });
    }

    try {
      const room = await Room.findOne({
        roomCode: roomCode.trim().toUpperCase(),
      });

      if (!room) {
        return callback({ success: false, message: "Room not found." });
      }

      if (room.members.length >= 5) {
        return callback({ success: false, message: "Room is full." });
      }

      if (room.members.includes(username)) {
        return callback({
          success: false,
          message: "User already in the room.",
        });
      }

      room.members.push(username);
      await room.save();

      socket.join(roomCode);
      socket.roomCode = roomCode;
      socket.username = username;

      if (room) {
        io.to(roomCode).emit("userJoined", { socketId: socket.id, username });
        callback({ success: true, roomCode });
      }
    } catch (error) {
      callback({ success: false, message: "Server error while joining room." });
    }
  });

  socket.on("saveCanvas", async ({ roomCode, canvasData, canvasImage }) => {
    if (!roomCode) return;

    try {
      await Room.findOneAndUpdate(
        { roomCode },
        {
          $push: { canvasData: canvasData },
          canvasImage: canvasImage,
        },
        { upsert: true }
      );
    } catch (error) {
      console.error("Error saving canvas data:", error);
    }
  });

  socket.on("drawShape", (shapeData) => {
    const roomCode = socket.roomCode;
    if (roomCode) {
      io.to(roomCode).emit("drawShape", shapeData);
    }
  });

  socket.on("drawLine", (lineData) => {
    const roomCode = socket.roomCode;
    if (roomCode) {
      io.to(lineData.roomCode).emit("drawLine", lineData);
    }
  });

  socket.on("drawText", (textData) => {
    const roomCode = textData.roomCode;
    if (roomCode) {
      io.to(roomCode).emit("drawText", textData);
    }
  });
});

router.post("/feedback", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    const emailResponse = await sendEmail(feedback);
    res.status(200).send({ message: "Feedback saved and Email sent successfully!" });
  } catch (err) {
    res.status(500).send({ error: "Failed to save feedback or send email" });
  }
});

module.exports = router;
