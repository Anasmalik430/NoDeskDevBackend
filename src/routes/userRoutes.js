import express from "express";
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  getMe, 
  getAllUsers 
} from "../controllers/userController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Profile (Any logged in user)
router.get("/me", protect, getMe);

// Admin Only routes
router.get("/users", protect, authorize("admin"), getAllUsers);

export default router;