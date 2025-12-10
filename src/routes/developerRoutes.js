import express from "express";
import {
  addDeveloper,
  deleteDeveloper,
  getAllDevelopers,
  getDeveloperById,
  getDeveloperBySlug,
  updateDeveloper,
} from "../controllers/developersController.js";

const router = express.Router();

// POST - Add a new developer
router.post("/add-developer", addDeveloper);

// GET - Get all developers
router.get("/developers", getAllDevelopers);

// GET single developer by ID
router.get("/developer/:id", getDeveloperById);

// GET single developer by slug
router.get("/developer/slug/:slug", getDeveloperBySlug);

// PUT update developer
router.put("/developer/:id", updateDeveloper);

// DELETE developer
router.delete("/developer/:id", deleteDeveloper);

export default router;
