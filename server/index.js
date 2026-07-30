const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ==============================
// Middleware
// ==============================

app.use(cors());
app.use(express.json());

// ==============================
// Root Route
// ==============================

app.get("/", (req, res) => {
  res.json({
    message: "Inventra API is running",
  });
});

// ==============================
// Debug Routes
// ==============================

app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Server working correctly",
  });
});

// ==============================
// API Routes
// ==============================

app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/users", require("./routes/users"));

// ==============================
// 404 Handler
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ==============================
// Error Handler
// ==============================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log(`🚀 Inventra Server Running`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("=================================");
});