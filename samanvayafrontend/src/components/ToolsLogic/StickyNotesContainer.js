import React, { useState } from "react";
import StickyNote from "./StickyNote";
import "./StickyNotesContainer.css";

const StickyNotesContainer = () => {
  const [stickyNotes, setStickyNotes] = useState([]);
  const [noteId, setNoteId] = useState(1);

  const addStickyNote = () => {
    const newNote = {
      id: noteId,
      content: "New Note",
    };
    setStickyNotes([...stickyNotes, newNote]);
    setNoteId(noteId + 1);
  };

  const deleteStickyNote = (id) => {
    setStickyNotes(stickyNotes.filter((note) => note.id !== id));
  };

  const updateStickyNote = (id, newContent) => {
    setStickyNotes(
      stickyNotes.map((note) =>
        note.id === id ? { ...note, content: newContent } : note
      )
    );
  };

  return (
    <div className="sticky-notes-board">
      <button className="sticky-notes-board__add-btn" onClick={addStickyNote}>
        Add Sticky Note
      </button>

      {stickyNotes.map((note) => (
        <StickyNote
          key={note.id}
          id={note.id}
          content={note.content}
          onDelete={deleteStickyNote}
          onUpdate={updateStickyNote}
        />
      ))}
    </div>
  );
};

export default StickyNotesContainer;
