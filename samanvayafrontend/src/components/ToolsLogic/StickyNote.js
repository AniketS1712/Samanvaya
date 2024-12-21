import React, { useState } from "react";
import Draggable from "react-draggable";
import "./StickyNote.css";

const StickyNote = ({ id, content, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteContent, setNoteContent] = useState(content);
  const [noteColor, setNoteColor] = useState("#ffeb3b"); // Default yellow color
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleContentChange = (e) => {
    setNoteContent(e.target.value);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      onUpdate(id, noteContent);
    }
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (color) => {
    setNoteColor(color);
    setShowColorPicker(false);
  };

  return (
    <Draggable>
      <div className="sticky-note" style={{ backgroundColor: noteColor }}>
        {isEditing ? (
          <textarea
            className="sticky-note__textarea"
            value={noteContent}
            onChange={handleContentChange}
          />
        ) : (
          <p className="sticky-note__content">{noteContent}</p>
        )}

        <div className="sticky-note__controls">
          <button className="sticky-note__edit-btn" onClick={toggleEdit}>
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            className="sticky-note__color-btn"
            onClick={toggleColorPicker}
          >
            Color
          </button>
          {showColorPicker && (
            <div className="sticky-note__color-picker">
              <button
                className="color-option yellow"
                onClick={() => handleColorChange("#ffeb3b")}
              ></button>
              <button
                className="color-option red"
                onClick={() => handleColorChange("#f44336")}
              ></button>
              <button
                className="color-option green"
                onClick={() => handleColorChange("#4caf50")}
              ></button>
              <button
                className="color-option blue"
                onClick={() => handleColorChange("#2196f3")}
              ></button>
            </div>
          )}
          <button
            className="sticky-note__delete-btn"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </Draggable>
  );
};

export default StickyNote;
