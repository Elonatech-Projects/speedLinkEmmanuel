const User = require("../models/User");
const Course = require("../models/Course");
const Transaction = require("../models/Transaction");

// @route  GET /api/admin/users
// @access Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ total: users.length, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/admin/courses
// @access Admin
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json({ total: courses.length, courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/admin/transactions
// @access Admin
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("user", "username email")
      .populate("course", "title price")
      .sort({ createdAt: -1 });
    res.json({ total: transactions.length, transactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, getAllCourses, getAllTransactions };
