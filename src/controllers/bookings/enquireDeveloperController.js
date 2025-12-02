import EnquireDeveloper from "../../models/bookings/EnquireDeveloper.js";

// CREATE Enquiry
export const createEnquiry = async (req, res) => {
  try {
    const enquiryData = req.body;
    const newEnquiry = new EnquireDeveloper(enquiryData);
    await newEnquiry.save();

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully!",
      data: newEnquiry,
    });
  } catch (error) {
    console.error("Create Enquiry Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to submit enquiry",
    });
  }
};

// GET ALL Enquiries
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await EnquireDeveloper.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET Single Enquiry
export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await EnquireDeveloper.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }
    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE Enquiry (mainly status)
export const updateEnquiry = async (req, res) => {
  try {
    const updatedEnquiry = await EnquireDeveloper.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry updated successfully",
      data: updatedEnquiry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE Enquiry
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await EnquireDeveloper.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }
    res.status(200).json({ success: true, message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};