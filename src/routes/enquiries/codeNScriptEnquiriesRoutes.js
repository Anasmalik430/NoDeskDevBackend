import express from "express";
import { createEnquiry, deleteEnquiry, getAllEnquiries, getEnquiryById } from "../../controllers/enquiries/codeNScriptEnquiriesController.js";

const router = express.Router();

// POST - Create new enquiry (public – from detail page form)
router.post("/code-n-script-enquiries", createEnquiry);

// GET - All enquiries (admin only – protect this route if needed)
router.get("/code-n-script-enquiries", getAllEnquiries);

// GET - Single enquiry by ID (admin)
router.get("/code-n-script-enquiry/:id", getEnquiryById);

// DELETE - Delete enquiry (admin)
router.delete("/code-n-script-enquiry/:id", deleteEnquiry);

export default router;