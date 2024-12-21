import React from "react";
import "./AboutSamanvaya.css";
import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import team from "../../../Assets/Two-Planning-orange.png";
import realtime from "../../../Assets/Real-Time.png";
import { SiFramer, SiSocketdotio, SiReact } from "react-icons/si";

const rotateAnimation = {
  animate: {
    rotate: [0, 360],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "linear",
    },
  },
};

const AboutSamanvaya = () => {
  return (
    <div className="samanvaya">
      <h1>About Samanvaya</h1>
      <div className="samanvaya-content">
        <div className="content">
          <img src={team} alt="Team collaborating" className="about-image" />
          <p>
            <b>Samanvaya</b> is a real-time collaborative whiteboard application
            designed to facilitate teamwork and creativity in an intuitive,
            seamless way. Whether you're working with a team remotely or
            brainstorming with classmates, Samanvaya brings ideas to life in a
            shared virtual space.
          </p>
        </div>

        <div className="content">
          <img
            src={realtime}
            alt="Real-time collaboration"
            className="about-image"
          />
          <p>
            With features like <b>room creation</b>, <b>real-time updates</b>,
            and <b>collaborative tools</b>, Samanvaya empowers users to work
            together, share thoughts, and solve problems in real time. It's the
            perfect tool for professionals, educators, and students alike.
          </p>
        </div>
      </div>

      <div className="tech-stack-layer">
        <h2>Technology Stack</h2>
        <div className="tech-stack">
          <div className="tech-item">
            <motion.div {...rotateAnimation}>
              <SiReact className="tech-icon" />
            </motion.div>
            <h3>React</h3>
            <p>
              <b>React</b> is a JavaScript library for building dynamic user
              interfaces. In Samanvaya, React is used to create reusable
              components and manage the app's front-end, ensuring a seamless
              user experience.
            </p>
          </div>
          <div className="tech-item">
            <motion.div {...rotateAnimation}>
              <SiFramer className="tech-icon" />
            </motion.div>
            <h3>Framer-Motion</h3>
            <p>
              <b>Framer Motion</b> provides powerful animation tools for React.
              It helps bring the Samanvaya app to life with smooth animations
              for interactions such as real-time updates and transitions.
            </p>
          </div>
          <div className="tech-item">
            <motion.div {...rotateAnimation}>
              <SiSocketdotio className="tech-icon" />
            </motion.div>
            <h3>WebSocket</h3>
            <p>
              <b>WebSocket</b> is a communication protocol that enables
              real-time data transmission between the server and clients. This
              is crucial for the real-time collaboration features of Samanvaya.
            </p>
          </div>
        </div>
      </div>

      <div className="challenges-faced-layer">
        <h2>Challenges Faced: My Journey</h2>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "#15250e", color: "#fff" }}
          >
            <span className="chapter1">Chapter 1: <br /> Learning React</span>
            <h3 className="vertical-timeline-element-title">Learning React</h3>
            <p>
              When I started this project, I had zero experience with{" "}
              <b>React</b>. Learning its component-based structure and managing
              states felt overwhelming...
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "#15250e", color: "#fff" }}
          >
            <span className="chapter2">Chapter 2: <br /> Real-Time Collaboration</span>
            <h3 className="vertical-timeline-element-title">
              Real-Time Collaboration
            </h3>
            <p>
              Building <b>real-time collaboration</b> was one of the toughest
              parts. WebSocket and managing synchronization between users was
              all new to me...
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "#15250e", color: "#fff"}}
          >
            <span className="chapter3">Chapter 3: <br /> First Solo Project</span>
            <h3 className="vertical-timeline-element-title">
              First Solo Project
            </h3>
            <p>
              Being my first <b>solo project</b>, staying motivated and focused
              was hard. I often felt lost or bored after days of work...
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
      <div id="infinity"></div>
    </div>
  );
};

export default AboutSamanvaya;
