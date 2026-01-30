const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true
    },

    role: {
      type: String,
      enum: ["ADMIN", "MANAGER", "STAFF"],
      required: true
    },

    token: {
      type: String,
      required: true,
      unique: true
    },

    expiresAt: {
      type: Date,
      required: true
    },

    acceptedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invite", inviteSchema);
