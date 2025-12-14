import mongoose from "mongoose";

const codeNScriptEnquiriesSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    // Client Name
    clientName: {
      type: String,
      required: [true, "Client name is required"],
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

    // Additional Services with Prices
    installation: {
      type: Number,
      min: [0, "Installation price cannot be negative"],
      default: 0,
    },

    customization: {
      type: Number,
      min: [0, "Customization price cannot be negative"],
      default: 0,
    },

    branding: {
      type: Number,
      min: [0, "Branding price cannot be negative"],
      default: 0,
    },

    paymentGatewayIntegration: {
      type: Number,
      min: [0, "Payment gateway integration price cannot be negative"],
      default: 0,
    },

    deployment: {
      type: Number,
      min: [0, "Deployment price cannot be negative"],
      default: 0,
    },

    cloudSetup: {
      type: Number,
      min: [0, "Cloud setup price cannot be negative"],
      default: 0,
    },

    playConsoleUpload: {
      type: Number,
      min: [0, "Play console upload price cannot be negative"],
      default: 0,
    },

    iosConsoleUpload: {
      type: Number,
      min: [0, "iOS console upload price cannot be negative"],
      default: 0,
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
    // Status
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Scheduled", "Completed", "Cancelled"],
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,

    // Remove __v field from output
    versionKey: false,
  }
);

// Virtual field to calculate total price
codeNScriptEnquiriesSchema.virtual("totalPrice").get(function () {
  return (
    this.basePrice +
    this.installation +
    this.customization +
    this.branding +
    this.paymentGatewayIntegration +
    this.deployment +
    this.cloudSetup +
    this.playConsoleUpload +
    this.iosConsoleUpload
  );
});

// Ensure virtuals are included when converting to JSON
codeNScriptEnquiriesSchema.set("toJSON", { virtuals: true });
codeNScriptEnquiriesSchema.set("toObject", { virtuals: true });

// Indexes for better query performance
codeNScriptEnquiriesSchema.index({ name: 1 });
codeNScriptEnquiriesSchema.index({ basePrice: 1 });
codeNScriptEnquiriesSchema.index({ installationType: 1 });
codeNScriptEnquiriesSchema.index({ codeLanguages: 1 });
codeNScriptEnquiriesSchema.index({ createdAt: -1 });

// Create and export the model
const CodeNScriptEnquiries = mongoose.model(
  "CodeNScriptEnquiries",
  codeNScriptEnquiriesSchema
);

export default CodeNScriptEnquiries;
