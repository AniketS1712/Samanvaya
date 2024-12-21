import { useState, useEffect, useCallback } from "react";

const LineTool = ({ canvasRef,selectedColor }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [savedCanvasImage, setSavedCanvasImage] = useState(null);

  const handleMouseDown = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!isDrawing) {
      setStartPos({ x, y });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const savedImage = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      setSavedCanvasImage(savedImage);

      setIsDrawing(true);
    } else {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (savedCanvasImage) {
        context.putImageData(savedCanvasImage, 0, 0);
      }

      context.beginPath();
      context.moveTo(startPos.x, startPos.y);
      context.lineTo(x, y);
      context.stroke();

      setIsDrawing(false);
    }
  }, [isDrawing, startPos, savedCanvasImage, canvasRef]);

  const handleMouseMove = useCallback((e) => {
    if (isDrawing) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (savedCanvasImage) {
        context.putImageData(savedCanvasImage, 0, 0);
      }

      context.beginPath();
      context.moveTo(startPos.x, startPos.y);
      context.lineTo(x, y);
      context.strokeStyle = selectedColor;
      context.stroke();
    }
  }, [isDrawing, startPos, savedCanvasImage, canvasRef, selectedColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseDown, handleMouseMove, canvasRef]);

  return null;
};

export default LineTool;
