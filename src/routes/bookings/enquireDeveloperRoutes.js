import express from "express";
import { createEnquiry, deleteEnquiry, getAllEnquiries, getEnquiryById, updateEnquiry } from "../../controllers/bookings/enquireDeveloperController.js";

const router = express.Router();

// CREATE
router.post("/enquire-developer", createEnquiry);

// READ ALL (Admin)
router.get("/enquiries", getAllEnquiries);

// READ SINGLE
router.get("/enquiry/:id", getEnquiryById);

// UPDATE (status change etc.)
router.put("/enquiry/:id", updateEnquiry);

// DELETE
router.delete("/enquiry/:id", deleteEnquiry);

export default router;