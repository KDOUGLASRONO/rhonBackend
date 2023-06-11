const mongoose = require("mongoose");
const { Schema } = mongoose;

const merchantSchema = new Schema(
  {
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email: { type: String, unique: true },
    phone: { type: String, required: true, unique: true },
    business_name: { type: String, required: true },
    location: { type: String },
    account_number: { type: String, required: true,  unique: true },
    password: { type: String, required: true },
    isApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Merchant = mongoose.model("Merchant", merchantSchema);

module.exports = Merchant;
