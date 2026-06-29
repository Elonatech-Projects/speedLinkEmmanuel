const Course = require("../models/Course");

// @route  GET /api/courses
// @access Public
const getAllCourses = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Course.countDocuments(filter);
    const courses = await Course.find(filter).skip(skip).limit(Number(limit));

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      courses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/courses/:id
// @access Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  POST /api/courses
// @access Admin
const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ message: "Course created", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  PUT /api/courses/:id
// @access Admin
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course updated", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  DELETE /api/courses/:id
// @access Admin
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };
