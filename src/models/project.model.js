const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    status: {
      type: String,
      enum: ["ACTIVE", "ARCHIVED", "DELETED"],
      default: "ACTIVE"
    },

    isDeleted: {
      type: Boolean,
      default: false
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
