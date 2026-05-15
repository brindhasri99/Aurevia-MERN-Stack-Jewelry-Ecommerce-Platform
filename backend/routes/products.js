const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { protect, requireRole } = require("../middleware/authMiddleware");

// ── GET /api/products ──────────────────────────────────────
// Public — get all products, optional ?category= filter
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Get products error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// ── GET /api/products/:id ──────────────────────────────────
// Public — single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Get product error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// ── POST /api/products ─────────────────────────────────────
// Donor or Admin — add new product
router.post("/", protect, requireRole("donor", "admin"), async (req, res) => {
  try {
    const { name, price, category, stock, image } = req.body;

    if (!name || !price || !category)
      return res.status(400).json({ msg: "Name, price and category are required" });

    const product = await Product.create({
      name,
      price: Number(price),
      category,
      stock: stock ? Number(stock) : 10,
      image: image || "",
      addedBy: req.user._id,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Add product error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// ── PUT /api/products/:id ──────────────────────────────────
// Admin only — update product
router.put("/:id", protect, requireRole("admin"), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Update product error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// ── DELETE /api/products/:id ───────────────────────────────
// Admin only — delete product
router.delete("/:id", protect, requireRole("admin"), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
