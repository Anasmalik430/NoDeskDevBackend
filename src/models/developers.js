import mongoose from "mongoose";

const developerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    photo: {
      type: String,
      required: [true, "Photo URL is required"],
      trim: true,
    },
    skills: {
      type: [String],
      required: [true, "At least one skill is required"],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "Skills array cannot be empty",
      },
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
      min: [0, "Experience cannot be negative"],
      max: [50, "Experience cannot exceed 50 years"],
    },
    hourlyRate: {
      type: Number,
      required: [true, "Hourly rate is required"],
      min: [0, "Hourly rate cannot be negative"],
    },
    availability: {
      type: String,
      required: [true, "Availability is required"],
      enum: {
        values: ["Full-time", "Part-time", "Contract"],
        message: "Availability must be Full-time, Part-time, or Contract",
      },
    },
    level: {
      type: String,
      required: [true, "Level is required"],
      enum: {
        values: ["Beginner", "Intermediate", "Expert"],
        message: "Level must be Beginner, Intermediate, or Expert",
      },
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    preferredLanguage: {
     type: [String],
      required: [true, "At least one preferred language is required"],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "preferred language array cannot be empty",
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Index for faster queries
developerSchema.index({ skills: 1, level: 1, available: 1 });

const Developer = mongoose.model("Developer", developerSchema);

export default Developer;