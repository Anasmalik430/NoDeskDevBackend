import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./src/database/connectDB.js";
import developerRoutes from "./src/routes/developerRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import bookDeveloperRoutes from "./src/routes/bookings/bookDeveloperRoutes.js"
import enquireDeveloperRoutes from "./src/routes/bookings/enquireDeveloperRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import requestProductDemoRoutes from "./src/routes/bookings/requestProductDemoRoutes.js";
import buyProductEnquireRoutes from "./src/routes/bookings/buyProductEnquireRoutes.js";
import installOwnCodeRoutes from "./src/routes/bookings/installOwnCodeRoutes.js";
import codeInstallBookingRoutes from "./src/routes/bookings/codeInstallBookingRoutes.js";
import techConsultRoutes from "./src/routes/bookings/techConsultRoutes.js";
import technicalMaintenanceRoutes from "./src/routes/bookings/technicalMaintenanceRoutes.js";
import errorFixingRoutes from "./src/routes/bookings/errorFixingRoutes.js";
import projectEstimationRoutes from "./src/routes/bookings/projectEstimationRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";
import careerRoutes from "./src/routes/careerRoutes.js";
import codeNScriptCardsRoutes from "./src/routes/codeNScriptCardsRoutes.js";
import codeNScriptEnquiryRoutes from "./src/routes/enquiries/codeNScriptEnquiriesRoutes.js";

import job from "./src/config/cron.js";

dotenv.config();

await connectDB();

const app = express();

if (process.env.NODE_ENV === "production") {
  job.start();
}

// ===== Middleware =====
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        "https://www.nodeskdeveloper.com",
        "https://nodeskdeveloper.com",
        "http://localhost:3000", // for development
      ];
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// All developer routes
app.use("/api", developerRoutes);
app.use("/api", projectRoutes);
app.use("/api", userRoutes);
app.use("/api", bookDeveloperRoutes);
app.use("/api", enquireDeveloperRoutes);
app.use("/api", requestProductDemoRoutes);
app.use("/api", buyProductEnquireRoutes);
app.use("/api", installOwnCodeRoutes);
app.use("/api", codeInstallBookingRoutes);
app.use("/api", techConsultRoutes);
app.use("/api", technicalMaintenanceRoutes);
app.use("/api", errorFixingRoutes);
app.use("/api", projectEstimationRoutes);
app.use("/api", contactRoutes);
app.use("/api", careerRoutes);
app.use("/api", codeNScriptCardsRoutes);
app.use("/api", codeNScriptEnquiryRoutes);


// Health check route (Render ko pata chale server alive hai)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend alive!" });
});

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "NodeskDeveloper Backend Live!",
    version: "1.0.0",
    frontend: "https://www.nodeskdeveloper.com",
  });
});

// Global error handler (production mein crash nahi hoga)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // console.log(`Live URL: https://my-backend.onrender.com`);
});
