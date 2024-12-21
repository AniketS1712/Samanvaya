import React, { useState } from "react";
import "./Toolbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowPointer,
  faLinesLeaning,
  faPalette,
  faPlay,
  faShapes,
  faT,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle, faSquare } from "@fortawesome/free-regular-svg-icons";
import { SketchPicker } from "react-color";

function Toolbar({ activeTool, setActiveTool, setSelectedShape, setSelectedColor }) {
  const [hoverButton, setHoverButton] = useState(null);
  const [showShapesPanel, setShowShapesPanel] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState("#000000");

  const buttons = [
    { name: "Select", icon: faArrowPointer },
    { name: "Text", icon: faT },
    { name: "Shapes", icon: faShapes },
    { name: "Line", icon: faLinesLeaning },
    { name: "Color", icon: faPalette },
  ];

  const handleButtonClick = (name) => {
    setActiveTool(name);
    if (name === "Shapes") {
      setShowShapesPanel(!showShapesPanel);
    } else {
      setShowShapesPanel(false);
    }

    if (name === "Color") {
      setShowColorPicker(!showColorPicker);
    } else {
      setShowColorPicker(false);
    }
  };

  const handleShapeClick = (shape) => {
    setSelectedShape(shape);
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
    setSelectedColor(color.hex);
  };

  return (
    <div className="toolbar">
      {buttons.map((button) => (
        <div
          key={button.name}
          className="button-container"
          onMouseEnter={() => setHoverButton(button.name)}
          onMouseLeave={() => setHoverButton(null)}
        >
          <button
            className={`${button.name}btn ${
              activeTool === button.name ? "active" : ""
            }`}
            onClick={() => handleButtonClick(button.name)}
          >
            <FontAwesomeIcon icon={button.icon} className="fa-icon" />
          </button>
          {hoverButton === button.name && (
            <div className="tooltip">{button.name}</div>
          )}

          {button.name === "Shapes" && showShapesPanel && (
            <div className="shapes-panel">
              <button
                onClick={() => handleShapeClick("Circle")}
                className="shape-button"
              >
                <FontAwesomeIcon icon={faCircle} />
              </button>
              <button
                onClick={() => handleShapeClick("Square")}
                className="shape-button"
              >
                <FontAwesomeIcon icon={faSquare} />
              </button>
              <button
                onClick={() => handleShapeClick("Triangle")}
                className="shape-button"
              >
                <FontAwesomeIcon
                  icon={faPlay}
                  style={{ transform: "rotate(-90deg)" }}
                />
              </button>
            </div>
          )}
        </div>
      ))}

      {showColorPicker && (
        <div className="color-picker">
          <SketchPicker
            color={color}
            onChange={handleColorChange}
            disableAlpha={true}
          />
        </div>
      )}
    </div>
  );
}

export default Toolbar;
