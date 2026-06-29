const express = require("express");
const router = express.Router();
const { enrollInCourse, getMyCourses } = require("../controllers/enrollmentController");
const { protect } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { enrollSchema } = require("../validators/cartValidator");

router.post("/enroll", protect, validate(enrollSchema), enrollInCourse);
router.get("/my-courses", protect, getMyCourses);

module.exports = router;
