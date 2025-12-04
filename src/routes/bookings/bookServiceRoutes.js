import express from "express";
import { sendEmail } from "../../config/nodemailer.js";

const router = express.Router();

router.post("/book-service", async (req, res) => {
  try {
    const { name, phone, email, service, description, budget } = req.body;

    // Validation
    if (!name || !phone || !email || !service || !description) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Email HTML template
    const emailHTML = `
      <h2>New Service Booking Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
    `;

    // Send email to yourself
    await sendEmail(
      process.env.EMAIL_USER,
      `New Service Request: ${service}`,
      emailHTML
    );

    // Send confirmation email to user
    const userEmailHTML = `
      <h2>Thank you for your service request!</h2>
      <p>Hi ${name},</p>
      <p>We have received your request for <strong>${service}</strong>.</p>
      <p>Our team will contact you within 2 hours.</p>
      <br>
      <p>Best regards,</p>
      <p>NodeskDeveloper Team</p>
    `;

    await sendEmail(email, "Service Request Received", userEmailHTML);

    res.status(200).json({
      success: true,
      message: "Request received! We'll contact you within 2 hours.",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send request",
    });
  }
});

export default router;