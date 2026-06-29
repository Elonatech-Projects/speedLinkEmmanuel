const express = require("express");
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");
const { protect } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { addToCartSchema } = require("../validators/cartValidator");

router.post("/", protect, validate(addToCartSchema), addToCart);
router.get("/", protect, getCart);
router.delete("/:id", protect, removeFromCart);

module.exports = router;
