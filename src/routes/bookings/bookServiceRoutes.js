import express from "express";
import { sendEmail } from "../../config/nodemailer.js";

const router = express.Router();

router.post("/book-service", async (req, res) => {
  try {
    const { name, phone, email, service, description, budget } = req.body;

    console.log("📩 Received booking request:", { name, email, service });

    // Validation
    if (!name || !phone || !email || !service || !description) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Email HTML template (Admin)
    const adminEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
          .field { margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #667eea; }
          .label { font-weight: bold; color: #667eea; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🎉 New Service Booking Request</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Name:</span> ${name}
            </div>
            <div class="field">
              <span class="label">Phone:</span> ${phone}
            </div>
            <div class="field">
              <span class="label">Email:</span> ${email}
            </div>
            <div class="field">
              <span class="label">Service:</span> ${service}
            </div>
            <div class="field">
              <span class="label">Description:</span><br>${description}
            </div>
            <div class="field">
              <span class="label">Budget:</span> ${budget || "Not specified"}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email HTML template (User)
    const userEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .highlight { color: #667eea; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Request Received!</h1>
          </div>
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for reaching out to <span class="highlight">NodeskDeveloper</span>!</p>
            <p>We have received your request for <span class="highlight">${service}</span>.</p>
            <p>Our team will review your requirements and contact you within <strong>2 hours</strong> on:</p>
            <ul>
              <li>📧 ${email}</li>
              <li>📱 ${phone}</li>
            </ul>
            <p>We look forward to working with you!</p>
            <br>
            <p>Best regards,</p>
            <p><strong>NodeskDeveloper Team</strong></p>
          </div>
        </div>
      </body>
      </html>
    `;

    console.log("📤 Sending emails...");

    // Send both emails in parallel with timeout
    const emailPromises = [
      sendEmail(
        process.env.EMAIL_USER,
        `🔔 New Service Request: ${service}`,
        adminEmailHTML
      ),
      sendEmail(
        email,
        "✅ Service Request Received - NodeskDeveloper",
        userEmailHTML
      ),
    ];

    // Wait for emails with 10 second timeout
    const results = await Promise.race([
      Promise.all(emailPromises),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Email timeout")), 10000)
      ),
    ]);

    console.log("Emails sent successfully");

    res.status(200).json({
      success: true,
      message: "Request received! We'll contact you within 2 hours.",
    });
  } catch (error) {
    console.error("Error in book-service route:", error.message);
    
    // Still send success response to user (email fail ko user ko dikhane ki zarurat nahi)
    res.status(200).json({
      success: true,
      message: "Request received! We'll contact you within 2 hours.",
    });
  }
});

export default router;