import React, { useState } from "react";
import "./Contactform.css";
import contactCard from "../../../Assets/suggestion-contact.png";

function Contactform() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const message = event.target.message.value.trim();
    if (!name || !email || !message) {
      setError("All fields are required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8090/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message || "Your feedback has been sent!");
        event.target.reset();
      } else {
        setError(data.error || "Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError(`An unexpected error occurred: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2>Reach Out to Us</h2>
        <p>
          <strong>Email:</strong>
          <br /> Aniket@example.com
        </p>
        <p>
          <strong>Phone:</strong>
          <br /> +91 xxxxxxxxxx
        </p>
        <p>
          <strong>Address:</strong>
          <br /> Location: Delhi, India
        </p>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448193.95104313316!2d76.76356386805335!3d28.644287350488735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1731394065734!5m2!1sen!2sin"
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="contact-form">
        <h2>Share Your Ideas or Ask Us Anything</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" name="name" required aria-label="Name" />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            aria-label="Email"
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            aria-label="Message"
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div className="contact-card">
        <img src={contactCard} alt="Contact Card" />
        <h2>Join Our Project</h2>
        <h3>One Step Away from Making a Difference</h3>
      </div>
    </div>
  );
}

export default Contactform;
