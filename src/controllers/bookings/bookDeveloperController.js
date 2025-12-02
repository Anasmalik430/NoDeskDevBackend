import BookDeveloper from "../../models/bookings/BookDeveloper.js";

// CREATE Booking
export const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;

    const newBooking = new BookDeveloper(bookingData);
    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully!",
      data: newBooking,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create booking",
    });
  }
};

// GET ALL Bookings (Admin ya list ke liye)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookDeveloper.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET Single Booking
export const getBookingById = async (req, res) => {
  try {
    const booking = await BookDeveloper.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE Booking (status, etc.)
export const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await BookDeveloper.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE Booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await BookDeveloper.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET My Bookings by Email (Client ke liye useful)
export const getMyBookings = async (req, res) => {
  try {
    const { email } = req.params;
    const bookings = await BookDeveloper.find({ email }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};