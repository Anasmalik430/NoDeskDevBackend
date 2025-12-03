import TechConsult from "../../models/bookings/TechConsult.js";

// CREATE Consultation Request
export const createTechConsult = async (req, res) => {
  try {
    const consultData = req.body;

    const newConsult = new TechConsult(consultData);
    await newConsult.save();

    res.status(201).json({
      success: true,
      message: "Tech consultation booked successfully!",
      data: newConsult,
    });
  } catch (error) {
    console.error("Create TechConsult Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to book consultation",
    });
  }
};

// GET ALL Consultations
export const getAllTechConsults = async (req, res) => {
  try {
    const consults = await TechConsult.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: consults.length,
      data: consults,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET Single Consultation
export const getTechConsultById = async (req, res) => {
  try {
    const consult = await TechConsult.findById(req.params.id);
    if (!consult) {
      return res.status(404).json({ success: false, message: "Consultation not found" });
    }
    res.status(200).json({ success: true, data: consult });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE Consultation (mainly status)
export const updateTechConsult = async (req, res) => {
  try {
    const updatedConsult = await TechConsult.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedConsult) {
      return res.status(404).json({ success: false, message: "Consultation not found" });
    }

    res.status(200).json({
      success: true,
      message: "Consultation updated successfully",
      data: updatedConsult,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE Consultation
export const deleteTechConsult = async (req, res) => {
  try {
    const consult = await TechConsult.findByIdAndDelete(req.params.id);
    if (!consult) {
      return res.status(404).json({ success: false, message: "Consultation not found" });
    }
    res.status(200).json({ success: true, message: "Consultation deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};