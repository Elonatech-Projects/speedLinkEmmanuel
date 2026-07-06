const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
// backend/server.js
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000",                  // Local testing
  process.env.CLIENT_URL // Production domain
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow server-to-server or postman requests with no origin
    if (!origin) return callback(null, true);
    
    // Automatically match regular production list OR any dynamic Vercel testing domains
    if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS policy restriction applied"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api", require("./routes/enrollmentRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Speedlink Learning API is running ✅" });
});

// Error handler (must be last)
const { errorHandler } = require("./middleware/errorHandler");
app.use(errorHandler);

// Connect to MongoDB then start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

module.exports = app;
