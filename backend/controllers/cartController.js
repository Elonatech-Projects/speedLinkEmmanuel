const Cart = require("../models/Cart");
const Course = require("../models/Course");

// @route  POST /api/cart
// @access Private (student)
const addToCart = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const existing = await Cart.findOne({ user: req.user._id, course: courseId });
    if (existing) return res.status(400).json({ message: "Course already in cart" });

    const cartItem = await Cart.create({ user: req.user._id, course: courseId });
    await cartItem.populate("course");

    res.status(201).json({ message: "Added to cart", cartItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/cart
// @access Private (student)
const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user._id }).populate("course");
    const total = cartItems.reduce((sum, item) => sum + (item.course?.price || 0), 0);
    res.json({ cartItems, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  DELETE /api/cart/:id
// @access Private (student)
const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });
    res.json({ message: "Removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToCart, getCart, removeFromCart };
