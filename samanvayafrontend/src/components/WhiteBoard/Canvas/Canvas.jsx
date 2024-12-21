import React, { useRef, useEffect, useState } from "react";
import "./Canvas.css";
import TextTool from "../../ToolsLogic/TextTool";
import LineTool from "../../ToolsLogic/LineTool";
import { drawShape } from "../../ToolsLogic/shapesLogic";
import TimeTool from "../../ToolsLogic/TimeTool";
import VoteTool from "../../ToolsLogic/VoteTool";
import StickyNotesContainer from "../../ToolsLogic/StickyNotesContainer";
import socket from "../../../socket";
import { useLocation } from "react-router-dom";

function Canvas({
  activeTool,
  showVoting,
  showTimer,
  showStickyNote,
  selectedShape,
  selectedColor,
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const savedImage = useRef(null);
  const shapeHistory = useRef([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomCode = queryParams.get("roomCode");

  useEffect(() => {
    localStorage.setItem("shapeHistory", JSON.stringify(shapeHistory.current));
  }, [shapeHistory.current.length]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket ID:", socket.id);
    });
    socket.on("userJoined", (data) => {
      console.log("New user joined with socket ID:", data.socketId);
      console.log("Username:", data.username);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from Canvas");
    });
    socket.on("drawShape", (shapeData) => {
      drawReceivedShape(shapeData);
      shapeHistory.current.push(shapeData);
    });
    socket.on("drawLine", (lineData) => {
      drawReceivedLine(lineData);
      shapeHistory.current.push(lineData);
    });
    socket.on("drawText", (textData) => {
      drawReceivedText(textData);
      shapeHistory.current.push(textData);
    });

    return () => {
      socket.off("connect");
      socket.off("userJoined");
      socket.off("disconnect");
      socket.off("drawShape");
      socket.off("drawLine");
      socket.off("drawText");
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (roomCode) {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL();
        socket.emit("saveCanvas", {
          roomCode: roomCode,
          canvasImage: dataURL,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 90;
    context.fillStyle = "#eeeeee";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const drawReceivedShape = (shapeData) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    reRenderCanvas(context);
  };

  const drawReceivedLine = (lineData) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    reRenderCanvas(context);
  };

  const drawReceivedText = (textData) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    reRenderCanvas(context);
    context.fillStyle = textData.color;
    context.font = textData.font || "20px Arial";
    context.fillText(textData.text, textData.x, textData.y);

    if (!shapeHistory.current.includes(textData)) {
      shapeHistory.current.push(textData);
    }
    console.log("text");
  };

  const reRenderCanvas = (context) => {
    context.fillStyle = "#eeeeee";
    console.log("Re-rendering canvas:", context);
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    shapeHistory.current.forEach((shapeData) => {
      if (shapeData.shape) {
        context.strokeStyle = shapeData.color;
        context.fillStyle = shapeData.color;
        drawShape(
          shapeData.shape,
          context,
          shapeData.startX,
          shapeData.startY,
          shapeData.endX,
          shapeData.endY,
          shapeData.color
        );
      } else if (
        shapeData.startX !== undefined &&
        shapeData.endX !== undefined
      ) {
        context.strokeStyle = shapeData.color;
        context.beginPath();
        context.moveTo(shapeData.startX, shapeData.startY);
        context.lineTo(shapeData.endX, shapeData.endY);
        context.stroke();
      } else if (shapeData.text) {
        context.fillStyle = shapeData.color;
        context.font = shapeData.font || "20px Arial";
        context.fillText(shapeData.text, shapeData.x, shapeData.y);
      }
    });
  };

  const handleMouseDown = (e) => {
    if (activeTool === "Shapes" && selectedShape) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      setStartPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsDrawing(true);
      savedImage.current = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
    }
    if (activeTool === "Line") {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      setStartPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsDrawing(true);
      savedImage.current = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentX(x);
    setCurrentY(y);
    context.putImageData(savedImage.current, 0, 0);
    context.strokeStyle = selectedColor || "#000";
    context.fillStyle = selectedColor || "#000";

    if (activeTool === "Shapes" && selectedShape) {
      drawShape(
        selectedShape,
        context,
        startPos.x,
        startPos.y,
        x,
        y,
        selectedColor
      );
    } else if (activeTool === "Line") {
      context.strokeStyle = selectedColor || "#000";
      context.beginPath();
      context.moveTo(startPos.x, startPos.y);
      context.lineTo(x, y);
      context.stroke();
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);

      if (activeTool === "Shapes" && selectedShape) {
        const currentShapeData = {
          shape: selectedShape,
          startX: startPos.x,
          startY: startPos.y,
          endX: currentX,
          endY: currentY,
          color: selectedColor || "#000",
          roomCode: roomCode,
        };
        shapeHistory.current.push(currentShapeData);
        socket.emit("drawShape", currentShapeData);
      } else if (activeTool === "Line") {
        const currentLineData = {
          startX: startPos.x,
          startY: startPos.y,
          endX: currentX,
          endY: currentY,
          color: selectedColor || "#000",
          roomCode: roomCode,
        };
        shapeHistory.current.push(currentLineData);
        socket.emit("drawLine", currentLineData);
      }
    }
  };

  const handleTextAdd = (text, x, y) => {
    const textData = {
      text: text,
      x: x,
      y: y,
      color: selectedColor || "#000",
      font: "20px Arial",
      roomCode: roomCode,
    };
    shapeHistory.current.push(textData);
    socket.emit("drawText", textData);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid #000",
          cursor:
            activeTool === "Text"
              ? "text"
              : activeTool === "Line"
              ? "pointer"
              : "crosshair",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      {activeTool === "Text" && (
        <TextTool
          canvasRef={canvasRef}
          selectedColor={selectedColor}
          onAddText={handleTextAdd}
        />
      )}
      {activeTool === "Line" && (
        <LineTool
          canvasRef={canvasRef}
          selectedColor={selectedColor}
          onAddLine={handleMouseDown}
        />
      )}

      {showTimer && (
        <div
          className="draggable"
          style={{
            position: "absolute",
            top: "100px",
            left: "900px",
            zIndex: 1000,
          }}
        >
          <TimeTool />
        </div>
      )}

      {showVoting && (
        <div
          className="draggable"
          style={{
            position: "absolute",
            top: "100px",
            left: "900px",
            zIndex: 1000,
          }}
        >
          <VoteTool />
        </div>
      )}
      {showStickyNote && (
        <div
          className="draggable"
          style={{
            position: "absolute",
            top: "50px",
            left: "1050px",
            zIndex: 1000,
          }}
        >
          <StickyNotesContainer />
        </div>
      )}
    </div>
  );
}

export default Canvas;
