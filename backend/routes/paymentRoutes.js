const express = require("express");
const router = express.Router();
const { initializePayment, initializeCartPayment, verifyPayment } = require("../controllers/paymentController");
const { protect } = require("../middleware/auth");

router.post("/initialize", protect, initializePayment);
router.post("/initialize-cart", protect, initializeCartPayment);
router.get("/verify", protect, verifyPayment);

module.exports = router;
