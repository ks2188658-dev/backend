const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifiedtoken");
const Order = require("../models/order");


// ===============================
// 🔥 CREATE ORDER
// ===============================
router.post("/", verifyToken, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const newOrder = new Order({
      user: req.user.id,
      items,
      totalAmount,
      status: "Pending",
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order failed",
    });
  }
});


// ===============================
// 🔥 GET USER ORDERS
// ===============================
router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      orders: orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});


module.exports = router;