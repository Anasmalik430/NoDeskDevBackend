import CodeNScriptEnquiries from "../../models/enquiries/CodeNScriptEnquiries.js";

// Create new enquiry
export const createEnquiry = async (req, res) => {
  try {
    const enquiryData = req.body;

    // Handle comma-separated strings to arrays
    if (enquiryData.codeLanguages && typeof enquiryData.codeLanguages === "string") {
      enquiryData.codeLanguages = enquiryData.codeLanguages
        .split(",")
        .map((lang) => lang.trim())
        .filter(Boolean);
    }
    if (enquiryData.clientSideRequirements && typeof enquiryData.clientSideRequirements === "string") {
      enquiryData.clientSideRequirements = enquiryData.clientSideRequirements
        .split(",")
        .map((req) => req.trim())
        .filter(Boolean);
    }
    if (enquiryData.installationType && typeof enquiryData.installationType === "string") {
      enquiryData.installationType = enquiryData.installationType
        .split(",")
        .map((type) => type.trim())
        .filter(Boolean);
    }

    const newEnquiry = await CodeNScriptEnquiries.create(enquiryData);

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: newEnquiry,
    });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to submit enquiry",
    });
  }
};

// Get all enquiries (Admin)
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await CodeNScriptEnquiries.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single enquiry by ID (Admin)
export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await CodeNScriptEnquiries.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// NEW: Update enquiry by ID (e.g., change status or other fields - Admin only)
export const updateEnquiryById = async (req, res) => {
  try {
    const updates = req.body;

    // Optional: Restrict which fields can be updated
    const allowedUpdates = [
      "status",
      "name",
      "clientName",
      "images",
      "basePrice",
      "installation",
      "customization",
      "branding",
      "paymentGatewayIntegration",
      "deployment",
      "cloudSetup",
      "playConsoleUpload",
      "iosConsoleUpload",
      "codeLink",
      "codePreview",
      "previousLink",
      "installationType",
      "codeLanguages",
      "clientSideRequirements",
      "description",
    ];

    const filteredUpdates = {};
    allowedUpdates.forEach((field) => {
      if (updates[field] !== undefined) {
        filteredUpdates[field] = updates[field];
      }
    });

    // Handle array conversions if needed (same as create)
    if (filteredUpdates.codeLanguages && typeof filteredUpdates.codeLanguages === "string") {
      filteredUpdates.codeLanguages = filteredUpdates.codeLanguages
        .split(",")
        .map((lang) => lang.trim())
        .filter(Boolean);
    }
    if (filteredUpdates.clientSideRequirements && typeof filteredUpdates.clientSideRequirements === "string") {
      filteredUpdates.clientSideRequirements = filteredUpdates.clientSideRequirements
        .split(",")
        .map((req) => req.trim())
        .filter(Boolean);
    }
    if (filteredUpdates.installationType && typeof filteredUpdates.installationType === "string") {
      filteredUpdates.installationType = filteredUpdates.installationType
        .split(",")
        .map((type) => type.trim())
        .filter(Boolean);
    }

    const updatedEnquiry = await CodeNScriptEnquiries.findByIdAndUpdate(
      req.params.id,
      filteredUpdates,
      { new: true, runValidators: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry updated successfully",
      data: updatedEnquiry,
    });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update enquiry",
    });
  }
};

// Delete enquiry (Admin)
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await CodeNScriptEnquiries.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};