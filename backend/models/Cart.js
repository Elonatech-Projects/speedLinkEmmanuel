const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate cart entries (same user + same course)
cartSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Cart", cartSchema);
