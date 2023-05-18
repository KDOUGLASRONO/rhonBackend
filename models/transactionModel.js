const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    amount: { type: String, required: true },
    customer_phone: { type: String, required: true },
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Merchant",
    },
    transaction_code: {
      type: String,
      required: true,
    },
    transaction_type: {
      type: String,
      //   enum: ["Cash", "Mpesa"],
      default: "Mpesa",
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
