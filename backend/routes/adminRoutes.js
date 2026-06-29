const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getAllCourses,
  getAllTransactions,
} = require("../controllers/adminController");
const { protect } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");

router.use(protect, isAdmin); // All admin routes require auth + admin role

router.get("/users", getAllUsers);
router.get("/courses", getAllCourses);
router.get("/transactions", getAllTransactions);

module.exports = router;
