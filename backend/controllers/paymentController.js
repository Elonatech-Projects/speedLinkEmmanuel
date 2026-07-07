const axios = require("axios");
const Enrollment = require("../models/Enrollment");
const Transaction = require("../models/Transaction");
const Course = require("../models/Course");
const Cart = require("../models/Cart");

// @route  POST /api/payment/initialize
// @access Private (student) — single course
const initializePayment = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const existing = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
      paymentStatus: "paid",
    });
    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const amountInKobo = course.price * 100;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: req.user.email,
        amount: amountInKobo,
        callback_url: `${process.env.CLIENT_URL}/payment/verify`,
        metadata: {
          courseId: course._id.toString(),
          userId: req.user._id.toString(),
          courseName: course.title,
          type: "single",
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

    await Transaction.create({
      user: req.user._id,
      course: courseId,
      amount: course.price,
      reference,
      status: "pending",
    });

    res.json({ message: "Payment initialized", authorization_url, reference });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  POST /api/payment/initialize-cart
// @access Private (student) — entire cart in one transaction
const initializeCartPayment = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user._id }).populate("course");

    if (!cartItems.length) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const unenrolled = [];
    for (const item of cartItems) {
      const exists = await Enrollment.findOne({
        user: req.user._id,
        course: item.course._id,
        paymentStatus: "paid",
      });
      if (!exists) unenrolled.push(item);
    }

    if (!unenrolled.length) {
      return res.status(400).json({ message: "You are already enrolled in all cart courses" });
    }

    const totalAmount = unenrolled.reduce((sum, item) => sum + item.course.price, 0);
    const amountInKobo = totalAmount * 100;
    const courseIds = unenrolled.map((item) => item.course._id.toString());

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: req.user.email,
        amount: amountInKobo,
        callback_url: `${process.env.CLIENT_URL}/payment/verify`,
        metadata: {
          courseIds,
          userId: req.user._id.toString(),
          type: "cart",
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

    await Transaction.create({
      user: req.user._id,
      amount: totalAmount,
      reference,
      status: "pending",
    });

    res.json({ message: "Cart payment initialized", authorization_url, reference });
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
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      }
    );

    const data = response.data.data;

    if (data.status !== "success") {
      return res.status(400).json({ message: "Payment not successful" });
    }

    const { courseId, courseIds, userId, type } = data.metadata;

    await Transaction.findOneAndUpdate({ reference }, { status: "success" }, { new: true });

    if (type === "cart" && courseIds) {
      for (const cId of courseIds) {
        await Enrollment.findOneAndUpdate(
          { user: userId, course: cId },
          { user: userId, course: cId, paymentStatus: "paid" },
          { upsert: true, new: true }
        );
      }
      await Cart.deleteMany({ user: userId });
    } else if (courseId) {
      await Enrollment.findOneAndUpdate(
        { user: userId, course: courseId },
        { user: userId, course: courseId, paymentStatus: "paid" },
        { upsert: true, new: true }
      );
    }

    res.json({ message: "Payment verified. Enrollment successful." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { initializePayment, initializeCartPayment, verifyPayment };
