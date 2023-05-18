const mongoose = require("mongoose");
const { Schema } = mongoose;

const stockSchema = new Schema(
  {
    opening_stock: { type: String, required: true },
    ending_time: { type: String },
    merchant_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Merchant",
    },
    closing_stock: {
      type: String,
      required: true,
      default: this.opening_stock,
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
