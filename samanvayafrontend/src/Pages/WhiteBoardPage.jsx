import React, { useState, useEffect } from "react";
import Navbar from "../components/WhiteBoard/Navbar/Navbar";
import Toolbar from "../components/WhiteBoard/Toolbar/Toolbar";
import Canvas from "../components/WhiteBoard/Canvas/Canvas";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";

const WhiteboardPage = () => {
  const [activeTool, setActiveTool] = useState(
    localStorage.getItem("activeTool") || null
  );
  const [showVoting, setShowVoting] = useState(
    JSON.parse(localStorage.getItem("showVoting")) || false
  );
  const [showTimer, setShowTimer] = useState(
    JSON.parse(localStorage.getItem("showTimer")) || false
  );
  const [showStickyNote, setshowStickyNote] = useState(
    JSON.parse(localStorage.getItem("showStickyNote")) || false
  );
  const [selectedShape, setSelectedShape] = useState(
    localStorage.getItem("selectedShape") || null
  );
  const [selectedColor, setSelectedColor] = useState(
    localStorage.getItem("selectedColor") || "#000000"
  );

  useEffect(() => {
    localStorage.setItem("showStickyNote", JSON.stringify(showStickyNote));
  }, [showStickyNote]);

  return (
    <>
      <Navbar
        setShowTimer={() => setShowTimer(!showTimer)}
        setShowVoting={() => setShowVoting(!showVoting)}
        setshowStickyNote={() => setshowStickyNote(!showStickyNote)}
      />
      <MusicPlayer />
      <Toolbar
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        setSelectedShape={setSelectedShape}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <Canvas
        activeTool={activeTool}
        showTimer={showTimer}
        showVoting={showVoting}
        showStickyNote={showStickyNote}
        selectedShape={selectedShape}
        selectedColor={selectedColor}
      />
    </>
  );
};

export default WhiteboardPage;
