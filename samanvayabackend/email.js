const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (feedback) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Feedback Received",
    text: `Name: ${feedback.name}\nEmail: ${feedback.email}\nMessage: ${feedback.message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info.response;
  } catch (err) {
    throw new Error("Failed to send email");
  }
};

module.exports = {sendEmail};