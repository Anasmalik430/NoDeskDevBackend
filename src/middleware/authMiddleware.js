import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "1f92ab8e4c31b7c9d2f4e8a7c6d91f2837f4ab12e9c8d7a6f3c2b1a9d8e7f6c4";

// 1. Protect Middleware: Verifies if user is logged in
export const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Login required to access this resource" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach user to request (Excluding password)
    req.user = await User.findById(decoded.id).select("-password");
    
    if (!req.user) {
      return res.status(404).json({ success: false, message: "User no longer exists" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Session expired, please login again" });
  }
};

// 2. Authorize Middleware: Check for specific roles (e.g., admin)
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Role (${req.user.role}) is not authorized to access this resource` 
      });
    }
    next();
  };
};