import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "1f92ab8e4c31b7c9d2f4e8a7c6d91f2837f4ab12e9c8d7a6f3c2b1a9d8e7f6c4";

// Helper to generate token & set cookie
const sendTokenResponse = (user, statusCode, res, message) => {
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "30d" }
  );

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res.status(statusCode).cookie("token", token, cookieOptions).json({
    success: true,
    message,
    user: { id: user._id, email: user.email, role: user.role },
  });
};

// @desc    Register User
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Auto-assign admin for your specific emails
    const adminEmails = ["itsanas474@gmail.com", "nodeskdevadmin@gmail.com"];
    const role = adminEmails.includes(email.toLowerCase()) ? "admin" : "user";

    const user = await User.create({ email, password: hashedPassword, role });

    sendTokenResponse(user, 201, res, "Registration successful");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password"); // explicitly get password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    sendTokenResponse(user, 200, res, "Logged in successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Logout User / Clear Cookie
export const logoutUser = (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "Logged out" });
};

// @desc    Get Current Profile
export const getMe = async (req, res) => {
  // req.user is already populated by protect middleware
  res.status(200).json({ success: true, user: req.user });
};

// @desc    Admin Only: Get All Users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json({ success: true, count: users.length, data: users });
};