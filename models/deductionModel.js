const mongoose = require("mongoose");
const { Schema } = mongoose;

const deductionSchema = new Schema(
  {
    amount: { type: String, required: true },
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Merchant",
    },
    merchant_bill: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserBill",
    },
    bill:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Bill"
    }
  },
  { timestamps: true }
);

const Deduction = mongoose.model("Deduction", deductionSchema);

module.exports = Deduction;
