const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    roomCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      match: /^[A-Z0-9]{6}$/,
    },
    createdBy: {
      type: String,
      required: true,
    },
    leader: {
      type: String,
      required: true,
    },
    members: {
      type: [String],
      default: [],
      maxlength: 5,
    },
    canvasData: [
      {
        shape: String,
        startX: Number,
        startY: Number,
        endX: Number,
        endY: Number,
        color: String,
      },
    ],
    canvasImage: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", RoomSchema);
