const mongoose = require("mongoose");
const { Schema } = mongoose;

const transferSchema = new Schema(
  {
    amount: { type: String, required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Merchant",
    },
    receiptient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Merchant",
    },
    reference: { type: String, required: true },
  },
  { timestamps: true }
);

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
