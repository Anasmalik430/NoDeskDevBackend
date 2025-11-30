import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/database/connectDB.js";
import developerRoutes from "./src/routes/developerRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import job from "./src/config/cron.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "production") {
  job.start();
}

app.use(
  cors({
    origin: ["https://www.nodeskdeveloper.com", "https://nodeskdeveloper.com"],
    credentials: true,
  })
);

// JSON body parser (increased limit for screenshots)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// All developer routes
app.use("/api", developerRoutes);
app.use("/api", projectRoutes);

// Health check route (Render ko pata chale server alive hai)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend alive!" });
});

// Home route
app.get("/", (req, res) => {
  res.json({ 
    message: "NodeskDeveloper Backend Live!", 
    version: "1.0.0",
    frontend: "https://www.nodeskdeveloper.com"
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
