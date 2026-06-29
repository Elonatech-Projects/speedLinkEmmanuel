const express = require("express");
const router = express.Router();
const { initializePayment, verifyPayment } = require("../controllers/paymentController");
const { protect } = require("../middleware/auth");

router.post("/initialize", protect, initializePayment);
router.get("/verify", protect, verifyPayment);

module.exports = router;
