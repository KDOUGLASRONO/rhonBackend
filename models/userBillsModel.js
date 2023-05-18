const mongoose = require("mongoose");
const { Schema } = mongoose;

const user_billSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Merchant",
    },
    bill: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Bill",
    },
    is_active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const UserBill = mongoose.model("UserBill", user_billSchema);

module.exports = UserBill;
