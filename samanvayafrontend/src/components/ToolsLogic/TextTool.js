import React, { useState, useEffect, useCallback } from "react";

const TextTool = ({ canvasRef, selectedColor, onAddText }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [text, setText] = useState("");
  const [inputWidth, setInputWidth] = useState(20);

  const drawText = (ctx, text, x, y) => {
    ctx.font = "16px Arial";
    ctx.fillStyle = selectedColor || "#000";
    ctx.fillText(text, x, y);
  };

  const handleKeyDown = (e) => {
    if (isTyping) {
      if (e.key === "Enter") {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        drawText(ctx, text, textPosition.x, textPosition.y);
        onAddText(text, textPosition.x, textPosition.y);
        setIsTyping(false);
        setText("");
      } else if (e.key === "Backspace") {
        setText((prev) => prev.slice(0, -1));
      }
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCanvasClick = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setTextPosition({ x, y });
      setIsTyping(true);
      setText("");
    },
    [canvasRef]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const tempContext = canvas.getContext("2d");
    tempContext.font = "16px Arial";
    const textWidth = tempContext.measureText(text).width;

    setInputWidth(textWidth + 20);
  }, [text, canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [canvasRef, handleCanvasClick]);

  return (
    <>
      {isTyping && (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{
            position: "absolute",
            left: textPosition.x + "px",
            top: textPosition.y + "px",
            width: inputWidth + "px",
            border: "none",
            fontSize: "16px",
            background: "transparent",
            outline: "none",
            color: selectedColor || "#000",
            whiteSpace: "nowrap",
            zIndex: 10, // Ensure it appears above the canvas
          }}
          autoFocus
        />
      )}
    </>
  );
};

export default TextTool;
