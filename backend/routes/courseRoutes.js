const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { protect } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");
const { validate } = require("../middleware/validate");
const { courseSchema, updateCourseSchema } = require("../validators/courseValidator");

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", protect, isAdmin, validate(courseSchema), createCourse);
router.put("/:id", protect, isAdmin, validate(updateCourseSchema), updateCourse);
router.delete("/:id", protect, isAdmin, deleteCourse);

module.exports = router;
