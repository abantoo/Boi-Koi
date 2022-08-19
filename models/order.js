const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Object, required: true },
    },
  ],
  user: {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);
