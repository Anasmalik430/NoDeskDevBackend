import mongoose from "mongoose";

const bookDeveloperSchema = new mongoose.Schema(
  {
    // Client Information
    clientName: {
      type: String,
      required: [true, "Your name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
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

    // Project Information
    projectType: {
      type: String,
      required: [true, "Project type is required"],
      trim: true,
    },
    estimatedBudget: {
      type: String,
      required: [true, "Budget is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    // Developer Information (clean & single source of truth)
    developer: {
      id: {
        type: String,
        required: [true, "Developer ID is required"],
      },
      name: {
        type: String,
        required: [true, "Developer name is required"],
        trim: true,
      },
      level: {
        type: String,
        required: true,
        enum: ["Beginner", "Intermediate", "Expert"],
      },
      experience: {
        type: Number,
        required: [true, "Experience in years is required"],
        min: [0, "Experience cannot be negative"],
      },
      hourlyRate: {
        type: Number,           // ← Ab yahi ek jagah rate rahega
        required: [true, "Hourly rate is required"],
        min: [1, "Rate must be at least 1"],
      },
    },

    // Booking Status
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast queries
bookDeveloperSchema.index({ email: 1 });
bookDeveloperSchema.index({ "developer.id": 1 });
bookDeveloperSchema.index({ status: 1 });

const BookDeveloper = mongoose.model("BookDeveloper", bookDeveloperSchema);

export default BookDeveloper;