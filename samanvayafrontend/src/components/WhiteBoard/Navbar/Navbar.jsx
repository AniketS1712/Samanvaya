import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../../Assets/Logo.JPG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import FutureFunctionality from "./futureFunctionality";
import {
  faHourglass,
  faCheckToSlot,
  faNoteSticky,
  faUser,
  faShareFromSquare,
  faRightLong,
  faLeftLong,
} from "@fortawesome/free-solid-svg-icons";

function Navbar({ setShowVoting, setShowTimer, setshowStickyNote }) {
  const [showApps, setShowApps] = useState(true);
  const [activeButtons, setActiveButtons] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const toggleApps = () => {
    setShowApps(!showApps);
  };

  const handleButtonClick = (name) => {
    setActiveButtons((prev) =>
      prev.includes(name)
        ? prev.filter((button) => button !== name)
        : [...prev, name]
    );
  };

  const handleFutureFunctionalityClick = () => {
    setShowAlert(true);
  };

  const navOptAppsButtons = {
    Time: {
      icon: faHourglass,
      onClick: () => {
        setShowTimer();
        handleButtonClick("Time");
      },
    },
    Vote: {
      icon: faCheckToSlot,
      onClick: () => {
        setShowVoting((prev) => !prev);
        handleButtonClick("Vote");
      },
    },
    Notes: {
      icon: faNoteSticky,
      onClick: () => {
        setshowStickyNote((prev) => !prev);
        handleButtonClick("Notes");
      },
    },
  };

  const navNeedAppsButtons = {
    Profile: { icon: faUser, onClick: handleFutureFunctionalityClick },
    Present: { text: "Present", onClick: handleFutureFunctionalityClick },
    Share: { icon: faShareFromSquare, onClick: handleFutureFunctionalityClick },
  };

  return (
    <div className="navbar">
      <div className="nav-name">
        <img src={logo} alt="" />
        <Link to="/">
          <h1 className="project-name">Samanvaya</h1>
        </Link>
        <Link to="/RoomForm">
          <button className="create-roombtn">Create Room</button>
        </Link>
      </div>

      <div className="nav-apps">
        <div className="nav-opt-apps">
          <button className="hidebtn" onClick={toggleApps}>
            {showApps ? (
              <FontAwesomeIcon icon={faRightLong} />
            ) : (
              <FontAwesomeIcon icon={faLeftLong} />
            )}
          </button>
          {showApps &&
            Object.keys(navOptAppsButtons).map((buttonName) => (
              <button
                key={buttonName}
                className={`${buttonName.toLowerCase()}btn ${
                  activeButtons.includes(buttonName) ? "active" : ""
                }`}
                onClick={navOptAppsButtons[buttonName].onClick}
              >
                <FontAwesomeIcon icon={navOptAppsButtons[buttonName].icon} />
              </button>
            ))}
        </div>

        <div className="nav-need-apps">
          {Object.keys(navNeedAppsButtons).map((buttonName) => (
            <button
              key={buttonName}
              className={`${buttonName.toLowerCase()}btn ${
                activeButtons.includes(buttonName) ? "active" : ""
              }`}
              onClick={
                navNeedAppsButtons[buttonName].onClick
                  ? navNeedAppsButtons[buttonName].onClick
                  : () => handleButtonClick(buttonName)
              }
            >
              {navNeedAppsButtons[buttonName].icon ? (
                <FontAwesomeIcon icon={navNeedAppsButtons[buttonName].icon} />
              ) : (
                navNeedAppsButtons[buttonName].text
              )}
            </button>
          ))}
        </div>
      </div>

      <FutureFunctionality
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        message="This option will be available in the future."
      />
    </div>
  );
}

export default Navbar;
