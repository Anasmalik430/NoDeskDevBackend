import mongoose from "mongoose";

const codeNScriptEnquiriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    // Images Array
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.every(
            (img) => typeof img === "string" && img.trim().length > 0
          );
        },
        message: "Each image must be a valid string URL",
      },
    },

    // Pricing
    basePrice: {
      type: Number,
      required: [true, "Base price is required"],
      min: [0, "Base price cannot be negative"],
    },

    // Additional Services (Boolean or Selected Services)
    installation: {
      type: Boolean,
      default: false,
    },

    customization: {
      type: Boolean,
      default: false,
    },

    branding: {
      type: Boolean,
      default: false,
    },

    paymentGatewayIntegration: {
      type: Boolean,
      default: false,
    },

    deployment: {
      type: Boolean,
      default: false,
    },

    cloudSetup: {
      type: Boolean,
      default: false,
    },

    playConsoleUpload: {
      type: Boolean,
      default: false,
    },

    iosConsoleUpload: {
      type: Boolean,
      default: false,
    },

    // Links
    codeLink: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, "Please provide a valid URL"],
    },

    codePreview: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, "Please provide a valid URL"],
    },

    previousLink: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, "Please provide a valid URL"],
    },

    // Installation Type Array
    installationType: {
      type: [String],
      default: [],
      enum: {
        values: ["Web", "Android", "iOS", "Desktop", "Server"],
        message: "{VALUE} is not a valid installation type",
      },
    },

    // Code Languages Array
    codeLanguages: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.every(
            (lang) => typeof lang === "string" && lang.trim().length > 0
          );
        },
        message: "Each code language must be a valid string",
      },
    },

    // Client Side Requirements Array
    clientSideRequirements: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.every(
            (req) => typeof req === "string" && req.trim().length > 0
          );
        },
        message: "Each requirement must be a valid string",
      },
    },

    // Description
    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,

    // Remove __v field from output
    versionKey: false,
  }
);

// Indexes for better query performance
codeNScriptEnquiriesSchema.index({ name: 1 });
codeNScriptEnquiriesSchema.index({ basePrice: 1 });
codeNScriptEnquiriesSchema.index({ installationType: 1 });
codeNScriptEnquiriesSchema.index({ codeLanguages: 1 });
codeNScriptEnquiriesSchema.index({ createdAt: -1 });

// Create and export the model
const CodeNScriptEnquiries = mongoose.model("CodeNScriptEnquiries", codeNScriptEnquiriesSchema);

export default CodeNScriptEnquiries;
