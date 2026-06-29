const axios = require("axios");
const Enrollment = require("../models/Enrollment");
const Transaction = require("../models/Transaction");
const Course = require("../models/Course");

// @route  POST /api/payment/initialize
// @access Private (student)
const initializePayment = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Check if already enrolled
    const existing = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
      paymentStatus: "paid",
    });
    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    // Amount in kobo (Paystack uses smallest currency unit)
    const amountInKobo = course.price * 100;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: req.user.email,
        amount: amountInKobo,
        metadata: {
          courseId: course._id.toString(),
          userId: req.user._id.toString(),
          courseName: course.title,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { authorization_url, reference } = response.data.data;

    // Save a pending transaction
    await Transaction.create({
      user: req.user._id,
      course: courseId,
      amount: course.price,
      reference,
      status: "pending",
    });

    res.json({
      message: "Payment initialized",
      authorization_url,
      reference,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/payment/verify?reference=xxx
// @access Private (student)
const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.query;
    if (!reference) {
      return res.status(400).json({ message: "Payment reference is required" });
    }

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = response.data.data;

    if (data.status !== "success") {
      return res.status(400).json({ message: "Payment not successful" });
    }

    const { courseId, userId } = data.metadata;

    // Update transaction status
    await Transaction.findOneAndUpdate(
      { reference },
      { status: "success" },
      { new: true }
    );

    // Create or update enrollment
    await Enrollment.findOneAndUpdate(
      { user: userId, course: courseId },
      { user: userId, course: courseId, paymentStatus: "paid" },
      { upsert: true, new: true }
    );

    res.json({ message: "Payment verified. Enrollment successful." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { initializePayment, verifyPayment };
