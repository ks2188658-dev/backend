const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { adminProtect } = require("../middleware/adminMiddleware");

// ✅ Admin Login
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: "Invalid admin credentials" });
    }

    console.log("Admin Logged In:", { email });

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in .env");
      return res.status(500).json({ success: false, message: "Server misconfiguration" });
    }

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.json({ success: true, message: "Admin login successful", token });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Protected dashboard
router.get("/dashboard", adminProtect, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

module.exports = router;