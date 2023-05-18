const mongoose = require("mongoose");
const { Schema } = mongoose;

const resetCodeSchema = new Schema(
  {
    amount: { type: String, required: true },
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Merchant",
    },
  },
  { timestamps: true }
);

const ResetCode = mongoose.model("ResetCode", resetCodeSchema);

module.exports = ResetCode;
