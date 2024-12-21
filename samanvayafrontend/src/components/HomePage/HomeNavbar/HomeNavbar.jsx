import React, { useState } from 'react';
import './HomeNavbar.css';
import logo from '../../../Assets/Logo.JPG';
import { Link } from 'react-router-dom';

function HomeNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="home-navbar">
      <div className="home-main-navbar">
        <div className="logo">
          <img src={logo} alt="Samanvaya Logo" />
          <h1>Samanvaya</h1>
        </div>

        <div className={`nav-links ${isOpen ? 'active' : ''}`} id="navbarMenu">
          <Link className="links" to="/About-Samanvaya" onClick={() => setIsOpen(false)}>
            <span className="top-key"></span>
            <span className="text">What is Samanvaya</span>
            <span className="bottom-key-2"></span>
          </Link>
          <Link className="links" to="/RoomForm" onClick={() => setIsOpen(false)}>
            <span className="top-key"></span>
            <span className="text">Whiteboard</span>
            <span className="bottom-key-2"></span>
          </Link>
          <Link className="links" to="/About" onClick={() => setIsOpen(false)}>
            <span className="top-key"></span>
            <span className="text">About</span>
            <span className="bottom-key-2"></span>
          </Link>
          <Link className="links" to="/Contact" onClick={() => setIsOpen(false)}>
            <span className="top-key"></span>
            <span className="text">Contact</span>
            <span className="bottom-key-2"></span>
          </Link>
          <Link className="links" to="/" onClick={() => setIsOpen(false)}>
            <span className="top-key"></span>
            <span className="text">Home</span>
            <span className="bottom-key-2"></span>
          </Link>
        </div>

        {/* Hamburger Menu Icon */}
        <div
          className="hamburger"
          onClick={toggleMenu}
          role="button"
          aria-label="Toggle navigation"
          aria-controls="navbarMenu"
          aria-expanded={isOpen}
        >
          <div className={`bar ${isOpen ? 'change' : ''}`}></div>
          <div className={`bar ${isOpen ? 'change' : ''}`}></div>
          <div className={`bar ${isOpen ? 'change' : ''}`}></div>
        </div>
      </div>
    </div>
  );
}

export default HomeNavbar;
