const express = require("express");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Test Route
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Users route working",
    data: [],
  });
});

// Google / Firebase Login
router.post("/login", verifyToken, async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        uid: user.uid,
        email: user.email,
        name: user.name || "",
        picture: user.picture || "",
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
});

// Get Logged In User Profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;