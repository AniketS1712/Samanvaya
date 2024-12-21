import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeNavbar from "./components/HomePage/HomeNavbar/HomeNavbar";
import Hero from "./components/HomePage/Hero/Hero";
import Features from "./components/HomePage/Features/Features";
import AboutSamanvaya from "./components/HomePage/AboutSamanvaya/AboutSamanvaya";
import About from "./components/HomePage/About/About";
import Footer from "./components/HomePage/Footer/Footer";
import RoomForm from "./components/RoomForm/RoomForm";
import WhiteboardPage from "./Pages/WhiteBoardPage";
import Contactform from "./components/HomePage/Contact/Contactform";
import LoginSignupPage from "./components/LoginSignupPage/LoginSignupPage";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<><HomeNavbar /><Hero /><Features /><Footer /></>}/>
          <Route path="/About-Samanvaya" element={<><HomeNavbar /><AboutSamanvaya /><Footer /></>}/>
          <Route path="/About" element={<><HomeNavbar /><About /><Footer /></>}/>
          <Route path="/Contact" element={<Contactform />} />
          <Route path="/WhiteBoard" element={<WhiteboardPage />} />
          <Route path="/RoomForm" element={<RoomForm />} />
          <Route path="/login" element={<LoginSignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
