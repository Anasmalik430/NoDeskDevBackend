import mongoose from "mongoose";

const techConsultSchema = new mongoose.Schema(
  {
    // Client Information
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    whatsapp: {
      type: String,
      required: [true, "WhatsApp number is required"],
      trim: true,
    },

    // Consultation Details
    techType: {
      type: String,
      required: [true, "Tech type is required"],
      trim: true,
    },
    language: {
      type: [String], // Array of languages
      required: [true, "At least one language is required"],
      default: [],
    },
    preferredLang: {
      type: String,
      required: [true, "Preferred language is required"],
      trim: true,
    },
    preferredTime: {
      type: String,
      required: [true, "Preferred time is required"],
      trim: true,
    },

    // Consultation Status
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Scheduled", "Completed", "Cancelled"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Indexes for faster searches
techConsultSchema.index({ email: 1 });
techConsultSchema.index({ phone: 1 });
techConsultSchema.index({ status: 1 });

const TechConsult = mongoose.model("TechConsult", techConsultSchema);

export default TechConsult;