const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  _id:      { type: mongoose.Schema.Types.Mixed },
  id:       { type: mongoose.Schema.Types.Mixed },
  name:     String,
  price:    Number,
  quantity: Number,
  image:    String,
  category: String,
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // null = guest order
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
