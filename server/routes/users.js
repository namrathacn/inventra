console.log("🔥 USERS ROUTE LOADED");

const express = require("express");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// ==============================
// TEST
// ==============================

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Users route working",
  });
});

// ==============================
// LOGIN
// ==============================

router.post("/login", verifyToken, async (req, res) => {
  console.log("🔥 LOGIN ROUTE HIT");
  console.log("Authorization Header:");
  console.log(req.headers.authorization);

  try {
    const user = req.user;

    console.log("Decoded User:");
    console.log(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==============================
// PROFILE
// ==============================

router.get("/profile", verifyToken, async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = router;