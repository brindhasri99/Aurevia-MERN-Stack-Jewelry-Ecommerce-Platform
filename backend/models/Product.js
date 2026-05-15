const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "gold-rings",
        "gold-necklaces",
        "gold-earrings",
        "diamond-necklaces",
        "diamond-earrings",
        "diamond-rings",
        "silver-bracelets",
        "silver-chains",
        "silver-idols",
        "victorian-earrings",
        "victorian-lockets",
        "victorian-necklaces",
      ],
    },
    stock: {
      type: Number,
      default: 10,
      min: 0,
    },
    image: {
      type: String,
      default: "",
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
