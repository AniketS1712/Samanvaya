import React from "react";
import "./About.css";
import home from "../../../Assets/home.png";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const timelineData = [
  {
    date: "29 August 2024",
    title: "Concept Born",
    description:
      "The idea for Samanvaya was conceptualized, setting the foundation for a seamless collaborative platform.",
  },
  {
    date: "12 September 2024",
    title: "Front-end Completed",
    description:
      "The user interface and front-end functionality of the app were developed, focusing on a seamless user experience.",
  },
  {
    date: "3 October 2024",
    title: "Logic Built",
    description:
      "All core logic for real-time collaboration and room management was implemented.",
  },
  {
    date: "7 November 2024",
    title: "Real-Time Collaboration",
    description:
      "The final feature—real-time collaborative functionality—was completed, marking the full development of the project.",
  },
];

function About() {
  const getAnimation = (direction, delay = 0) => {
    return {
      initial:
        direction === "left"
          ? { opacity: 0, x: -500 }
          : { opacity: 0, y: -500 },
      animate: { opacity: 1, x: 0, y: 0 },
      transition: { duration: 1.2, delay, ease: "easeOut" },
    };
  };
  return (
    <div className="about-page-layer">
      <div className="about-page">
        <div className="about-section">
          <motion.div className="about-samanvaya" {...getAnimation("left")}>
            <h2 className="about-heading">About Samanvaya</h2>
            <p>
              Samanvaya is a real-time collaborative whiteboard application
              designed to enhance teamwork and creativity. Whether you're
              brainstorming ideas, sketching out designs, or presenting your
              vision, Samanvaya provides the tools to bring your team together
              in one virtual space.
            </p>
          </motion.div>

          <motion.div className="about-vision" {...getAnimation("left", 0.5)}>
            <h2 className="about-heading">The Vision</h2>
            <p>
              Our goal is to create a seamless, intuitive, and interactive
              platform for collaboration. Samanvaya fosters communication,
              enabling teams to work more effectively regardless of their
              physical location.
            </p>
          </motion.div>

          <motion.div className="special-thanks" {...getAnimation("left", 1)}>
            <h2 className="about-heading">Special Thanks</h2>
            <p>
              A big thank you to everyone who supported the development of
              Samanvaya. From feedback during the initial stages to
              encouragement throughout the project—it wouldn't have been
              possible without your help.
            </p>
          </motion.div>
        </div>

        <motion.div className="dev-home" {...getAnimation("top")}>
          <div className="about-developer">
            <h2 className="about-heading">About the Developer</h2>
            <p>
              Hi, I'm Aniket Singhal, a passionate web developer currently
              pursuing a degree in Computer Science. Samanvaya is my college
              minor project, and it reflects my interest in building tools that
              foster collaboration and enhance productivity.
            </p>
            <p>
              When I'm not coding, you can find me exploring new tech trends,
              working on personal projects, or brainstorming ideas for the next
              big thing. If you'd like to learn more about me and my other work,
              feel free to check out my portfolio below.
            </p>
          </div>
          <div className="home">
            <Link className="home-btn" to="https://anikets1712.github.io/CODSOFT/PORTFOLIO/portfolio.html">Visit My Portfolio</Link>
            <button className="home-btn">
              <img src={home} alt="" />
              <p>Back to Home</p>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="timeline-container">
        <div className="timeline">
          {timelineData.map((event, index) => (
            <motion.div
              className="timeline-item"
              key={index}
              initial={{ zIndex: -1, opacity: 0, y: 100 }}
              whileInView={{ zIndex: 0, opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 1, delay: index * 0.3, ease: "easeOut" }}
            >
              <div className="timeline-circle"></div>
              <div className="triangle"></div>
              <div className="timeline-content">
                <h3>{event.date}</h3>
                <h4>{event.title}</h4>
                <p>{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
