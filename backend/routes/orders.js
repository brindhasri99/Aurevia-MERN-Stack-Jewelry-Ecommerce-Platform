const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { protect, optionalAuth, requireRole } = require("../middleware/authMiddleware");

// ── POST /api/orders ───────────────────────────────────────
// Place a new order — works for logged-in users AND guests
router.post("/", optionalAuth, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ msg: "No items in order" });

    const order = await Order.create({
      user: req.user ? req.user._id : null,
      items,
      totalAmount,
      status: "Pending",
    });

    res.status(201).json({ msg: "Order placed successfully", order });
  } catch (err) {
    console.error("Place order error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// ── GET /api/orders ────────────────────────────────────────
// Admin sees all orders; customer sees only their own
router.get("/", protect, async (req, res) => {
  try {
    let orders;
    if (req.user.role === "admin") {
      orders = await Order.find()
        .populate("user", "email role")
        .sort({ createdAt: -1 });
    } else {
      orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    }
    res.json(orders);
  } catch (err) {
    console.error("Get orders error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// ── GET /api/orders/:id ────────────────────────────────────
// Single order — owner or admin only
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "email");
    if (!order) return res.status(404).json({ msg: "Order not found" });

    if (
      req.user.role !== "admin" &&
      order.user?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    res.json(order);
  } catch (err) {
    console.error("Get order error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// ── PUT /api/orders/:id ────────────────────────────────────
// Admin only — update order status (Pending → Shipped → Delivered)
router.put("/:id", protect, requireRole("admin"), async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ msg: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error("Update order error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
