const mongoose = require("mongoose");
const { Schema } = mongoose;

const merchantSchema = new Schema(
  {
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    id_number:{type: String, required: true},
    email: { type: String},
    phone: { type: String, required: true, unique: true },
    business_name: { type: String, required: true },
    location: { type: String },
    account_number: { type: String, required: true,  unique: true },
    raw_password:{type:String},
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
