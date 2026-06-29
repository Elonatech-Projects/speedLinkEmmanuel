const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// @route  POST /api/enroll
// @access Private (student)
const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const existing = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
    });
    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: courseId,
      paymentStatus: "pending",
    });

    await enrollment.populate("course");

    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/my-courses
// @access Private (student)
const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate("course")
      .sort({ createdAt: -1 });

    res.json({ enrollments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { enrollInCourse, getMyCourses };
