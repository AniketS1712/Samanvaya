import React from 'react';
import './Hero.css';
import hero from "../../../Assets/Hero.png";

function Hero() {
  return (
    <div className="hero">
      <div className="info">
        <h1>Collaborate Seamlessly in Real-Time</h1>
      </div>
      <img src={hero} alt="hero" width={"700px"}/>
    </div>
  )
}

export default Hero
