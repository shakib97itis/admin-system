const nodemailer = require("nodemailer");
const { CustomError } = require("../utilities/CustomError");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter once 
transporter.verify((error, success) => {
  if (error) {
    console.error("Email transporter error:", error);
  } else {
    console.log("Email server is ready");
  }
});

exports.emailSend = async (
  to,
  htmlTemplate,
  subject = "Complate your Registration"
) => {
  try {
    await transporter.sendMail({
      from: `"Admin" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlTemplate,
    });
  } catch (error) {
    console.error("Email send failed:", error);
    throw new CustomError(500, "Failed to send email");
  }
};
