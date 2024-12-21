import React from "react";
import "./Features.css";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import pentool from "../../../Assets/PenTool.png";
import notes from "../../../Assets/StickyNotes.png";
import timer from "../../../Assets/SandClock.png";
import voting from "../../../Assets/Voting.png";
import mic from "../../../Assets/Mic.png";
import chat from "../../../Assets/Chat.png";
import react from "../../../Assets/Reactions.png";

const imageVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const descriptionVariants = {
  hidden: { opacity: 0, x: 500 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const Features = () => {
  return (
    <div className="features">
      <h1>
        <ReactTyped
          strings={[
            "Intuitive Features for a Seamless Workflow",
            "Collaborate Effortlessly with Powerful Tools",
            "Innovative Solutions for Team Success",
          ]}
          typeSpeed={40}
          backSpeed={20}
          loop={true}
        />
      </h1>

      <div className="tools feature-list features-right">
        <motion.div
          className="img"
          whileInView="visible"
          initial="hidden"
          variants={imageVariants}
        >
          <img src={pentool} className="features-image" alt="Pen Tool" />
        </motion.div>
        <motion.div
          className="feature-description"
          whileInView="visible"
          initial="hidden"
          variants={descriptionVariants}
        >
          <h1>Draw with Precision</h1>
          <p>
            Samanvaya offers a suite of versatile tools designed to make
            collaboration seamless. From drawing shapes to adding text, our
            tools give you the power to transform ideas into action right on the
            whiteboard.
          </p>
        </motion.div>
      </div>

      <div className="sticky-notes feature-list features-left">
        <motion.div
          className="feature-description"
          whileInView="visible"
          initial="hidden"
          variants={descriptionVariants}
        >
          <h1>Pin Your Thoughts</h1>
          <p>
            Leave sticky notes anywhere on the whiteboard to keep track of
            ideas, important reminders, or tasks. Perfect for brainstorming
            sessions or team meetings, notes stay visible for everyone to see
            and update.
          </p>
        </motion.div>
        <motion.div
          className="img"
          whileInView="visible"
          initial="hidden"
          variants={imageVariants}
        >
          <img src={notes} className="features-image" alt="Sticky Notes" />
        </motion.div>
      </div>

      <div className="timer feature-list features-right">
        <motion.div
          className="img"
          whileInView="visible"
          initial="hidden"
          variants={imageVariants}
        >
          <img src={timer} className="features-image" alt="Timer" />
        </motion.div>
        <motion.div
          className="feature-description"
          whileInView="visible"
          initial="hidden"
          variants={descriptionVariants}
        >
          <h1>Time Your Tasks</h1>
          <p>
            Keep your team on track with the built-in timer. Whether you're
            timing a brainstorming session, keeping tabs on a meeting, or
            managing a presentation, our timer helps ensure tasks are completed
            within the given time frame.
          </p>
        </motion.div>
      </div>

      <div className="voting feature-list features-left">
        <motion.div
          className="feature-description"
          whileInView="visible"
          initial="hidden"
          variants={descriptionVariants}
        >
          <h1>Consensus at a Click</h1>
          <p>
            Need to make quick decisions? The voting feature allows everyone to
            share their input with a simple click. Whether it's for
            decision-making or feedback, gather consensus without disrupting the
            flow of your work.
          </p>
        </motion.div>
        <motion.div
          className="img"
          whileInView="visible"
          initial="hidden"
          variants={imageVariants}
        >
          <img src={voting} className="features-image" alt="Voting" />
        </motion.div>
      </div>

      <div className="mic feature-list features-right">
        <motion.div
          className="img"
          whileInView="visible"
          initial="hidden"
          variants={imageVariants}
        >
          <img src={mic} className="features-image" alt="Mic" />
        </motion.div>
        <motion.div
          className="feature-description"
          whileInView="visible"
          initial="hidden"
          variants={descriptionVariants}
        >
          <h1>Speak and Share</h1>
          <p>
            Activate the mic to share your thoughts in real-time. Whether you
            want to lead a discussion or share a quick comment, this feature
            will ensure your voice is heard loud and clear.
          </p>
        </motion.div>
      </div>

      <div className="chat feature-list features-left">
        <motion.div
          className="feature-description"
          whileInView="visible"
          initial="hidden"
          variants={descriptionVariants}
        >
          <h1>Instant Team Chat</h1>
          <p>
            Collaborate more effectively by using the built-in chat feature. You
            can share ideas, ask questions, or provide feedback instantly,
            making communication smoother and more productive.
          </p>
        </motion.div>
        <motion.div
          className="img"
          whileInView="visible"
          initial="hidden"
          variants={imageVariants}
        >
          <img src={chat} className="features-image" alt="Chat" />
        </motion.div>
      </div>

      <div className="react feature-list features-right">
        <motion.div
          className="img"
          whileInView="visible"
          initial="hidden"
          variants={imageVariants}
        >
          <img src={react} className="features-image" alt="Reactions" />
        </motion.div>
        <motion.div
          className="feature-description"
          whileInView="visible"
          initial="hidden"
          variants={descriptionVariants}
        >
          <h1>Express with Reactions</h1>
          <p>
            Express yourself with reactions. Whether you're giving quick
            feedback or celebrating a great idea, this feature adds a fun and
            interactive way to engage with content on the whiteboard.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
