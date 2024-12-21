import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import "./TimeTool.css";

const TimeTool = () => {
  const [time, setTime] = useState(60);
  const [isActive, setIsActive] = useState(false);

  const intervalRef = useRef(null);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            const newTime = prevTime - 1;
            return newTime;
          }
          clearInterval(intervalRef.current);
          return 0;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setTime(60);
  };

  const increaseTime = () => {
    if (!isActive) {
      const newTime = time + 60;
      setTime(newTime);
    }
  };

  const decreaseTime = () => {
    if (!isActive && time > 10) {
      const newTime = time - 30;
      setTime(newTime);
    }
  };

  useEffect(() => {
    if (time === 0 && isActive) {
      clearInterval(intervalRef.current);
      setIsActive(false);
      alert("Time's up!");
    }
  }, [time, isActive]);

  return (
    <Draggable>
      <div className="time-tool">
        <div className="time">
          <button className="time-tool__decrease" onClick={decreaseTime}>
            -
          </button>
          <div className="time-tool__display">{formatTime(time)}</div>
          <button className="time-tool__increase" onClick={increaseTime}>
            +
          </button>
        </div>
        <div className="time-tool__controls">
          {isActive ? (
            <button className="time-tool__btn" onClick={pauseTimer}>
              Pause
            </button>
          ) : (
            <button className="time-tool__btn" onClick={startTimer}>
              Start
            </button>
          )}
          <button className="time-tool__btn" onClick={stopTimer}>
            Reset
          </button>
        </div>
      </div>
    </Draggable>
  );
};

export default TimeTool;
