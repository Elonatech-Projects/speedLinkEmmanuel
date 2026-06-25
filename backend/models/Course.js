const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
    },
    price: {
      type: Number,
      required: [true, "Course price is required"],
      min: 0,
    },
    duration: {
      type: String,
      required: [true, "Course duration is required"],
    },
    category: {
      type: String,
      required: [true, "Course category is required"],
      enum: [
        "Web Development",
        "Cybersecurity",
        "Networking",
        "Data Science",
        "Digital Marketing",
        "Cloud Computing",
        "UI/UX Design",
        "ERP & Business",
      ],
    },
    image: {
      type: String,
      required: [true, "Thumbnail URL is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
