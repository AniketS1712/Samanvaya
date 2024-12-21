import React from "react";
import "./Footer.css";
import twitter from "../../../Assets/twitter.png";
import instagram from "../../../Assets/instagram.jpg";
import github from "../../../Assets/github.png";
import facebook from "../../../Assets/facebook.png";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Samanvaya. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/Contact">Contact</Link>
          <Link>Privacy Policy</Link>
        </div>
        <div className="social-links">
          <Link className="link" to="https://github.com/AniketS1712">
            <span className="glow-effect"></span>
            <div className="button-content">
              <img src={github} className="icon" alt="" />
              <span className="text">GitHub</span>
            </div>
          </Link>
          <Link className="link" to="https://www.instagram.com/aniket._1712/profilecard">
            <span className="glow-effect"></span>
            <div className="button-content">
              <img src={instagram} className="icon" alt="" />
              <span className="text">Instagram</span>
            </div>
          </Link>
          <button className="link">
            <span className="glow-effect"></span>
            <div className="button-content">
              <img src={twitter} className="icon" alt="" />
              <span className="text">Twitter</span>
            </div>
          </button>
          <button className="link">
            <span className="glow-effect"></span>
            <div className="button-content">
              <img src={facebook} className="icon" alt="" />
              <span className="text">Facebook</span>
            </div>
          </button>
        </div>
        <div className="disclaimer">
          <p>
            This project is for personal and educational use only. All images
            and resources used are for demonstration purposes and may not be
            used commercially.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
