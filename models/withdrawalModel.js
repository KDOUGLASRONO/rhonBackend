const mongoose = require("mongoose");
const { Schema } = mongoose;

const withdrawalSchema = new Schema(
  {
    amount: { type: String, required: true },
    paid_to: { type: String, required: true },
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Merchant",
    },
    transaction_code: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Complete", "Failed"],
      default: "Pending",
    },
    conversation_id: {
      type: String,
      required: true,
    },
    transaction_type: {
      type: String,
      // enum: ["Cash", "Mpesa"],
      default: "Mpesa",
    },
  },
  { timestamps: true }
);

const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);

module.exports = Withdrawal;
