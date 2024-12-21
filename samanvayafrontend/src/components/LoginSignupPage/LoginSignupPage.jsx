import React, { useState } from "react";
import TeamWorkAnimation from "./TeamWorkAnimation";
import "./LoginSignupPage.css";

function LoginSignupPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-page-container">
      <div className={`animation ${isLogin ? "show-login" : "hide"}`}>
        <TeamWorkAnimation />
      </div>

      <div className="login-form">
        <div
          className={`form-container ${isLogin ? "show-login" : "show-signup"}`}
        >
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>
          <form>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Re-enter your password"
                  required
                />
              </div>
            )}
            <button type="submit" className="form-button">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="form-toggle">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button className="toggle-button" onClick={toggleForm}>
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
      <div className={`animation ${!isLogin ? "show-signup" : "hide"}`}>
        <TeamWorkAnimation />
      </div>
    </div>
  );
}

export default LoginSignupPage;
