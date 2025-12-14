import CodeNScriptEnquiries from "../../models/enquiries/CodeNScriptEnquiries.js"

// Create new enquiry (from frontend form)
export const createEnquiry = async (req, res) => {
  try {
    const { name, images, basePrice, installation, customization, branding, paymentGatewayIntegration, deployment, cloudSetup, playConsoleUpload, iosConsoleUpload, codeLink, codePreview, previousLink, installationType, codeLanguages, clientSideRequirements, description, } = req.body;

    // Basic validation (Mongoose will handle most, but good to double-check critical fields)
    if (!name || !basePrice) {
      return res.status(400).json({
        success: false,
        message: "Name and basePrice are required",
      });
    }

    const newEnquiry = await CodeNScriptEnquiries.create({
      name,
      images: images || [],
      basePrice,
      installation: !!installation,
      customization: !!customization,
      branding: !!branding,
      paymentGatewayIntegration: !!paymentGatewayIntegration,
      deployment: !!deployment,
      cloudSetup: !!cloudSetup,
      playConsoleUpload: !!playConsoleUpload,
      iosConsoleUpload: !!iosConsoleUpload,
      codeLink,
      codePreview,
      previousLink,
      installationType: installationType || [],
      codeLanguages: codeLanguages || [],
      clientSideRequirements: clientSideRequirements || [],
      description: description || "",
    });

    res.status(201).json({
      success: true,
      data: newEnquiry,
      message: "Enquiry created successfully",
    });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// Get all enquiries (for admin panel)
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await CodeNScriptEnquiries.find()
      .sort({ createdAt: -1 });

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

// Get single enquiry by ID (admin view detail)
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

// Optional: Delete enquiry (admin)
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