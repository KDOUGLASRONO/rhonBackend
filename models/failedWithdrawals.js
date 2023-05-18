const mongoose = require("mongoose");
const { Schema } = mongoose;

const failedWithdrawalSchema = new Schema(
  {
    withdrawal: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Withdrawal",
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FailedWithdrawal = mongoose.model(
  "FailedWithdrawal",
  failedWithdrawalSchema
);

module.exports = FailedWithdrawal;
