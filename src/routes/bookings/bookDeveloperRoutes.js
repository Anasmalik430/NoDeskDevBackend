import express from "express";
import { createBooking, deleteBooking, getAllBookings, getBookingById, getMyBookings, updateBooking } from '../../controllers/bookings/bookDeveloperController.js'

const router = express.Router();

// CREATE
router.post("/book-developer", createBooking);

// READ ALL
router.get("/bookings", getAllBookings);

// READ SINGLE
router.get("/booking/:id", getBookingById);

// UPDATE
router.put("/booking/:id", updateBooking);

// DELETE
router.delete("/booking/:id", deleteBooking);

// OPTIONAL: For Client's bookings (via email)
router.get("/my-bookings/:email", getMyBookings);

export default router;
