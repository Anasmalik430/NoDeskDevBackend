import express from "express";
import { createTechConsult, deleteTechConsult, getAllTechConsults, getTechConsultById, updateTechConsult } from "../../controllers/bookings/techConsultController.js";

const router = express.Router();

// CREATE - Client books consultation
router.post("/tech-consult", createTechConsult);

// GET ALL - Admin panel
router.get("/tech-consults", getAllTechConsults);

// GET SINGLE
router.get("/tech-consult/:id", getTechConsultById);

// UPDATE (status, scheduling, etc.)
router.put("/tech-consult/:id", updateTechConsult);

// DELETE (if needed)
router.delete("/tech-consult/:id", deleteTechConsult);

export default router;
