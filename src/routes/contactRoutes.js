import express from "express";
import { createContact, deleteContact, getAllContacts, getContactById, updateContactStatus } from "../controllers/contactController.js";

const router = express.Router();

// CREATE - New contact form submission
router.post("/contact", createContact);

// GET ALL - Admin panel
router.get("/contacts", getAllContacts);

// GET SINGLE
router.get("/contact/:id", getContactById);

// UPDATE STATUS
router.put("/contact/:id", updateContactStatus);

// DELETE
router.delete("/contact/:id", deleteContact);

export default router;