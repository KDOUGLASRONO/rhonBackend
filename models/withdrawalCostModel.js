const mongoose = require('mongoose');
const schema = mongoose.Schema;

let withdrawalCostSchema = new schema({
    amount: { type: String, required: true },
    paid_to: { 
        type: String, 
        required: true,
        default: "Rhon" 
    },
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Merchant",
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
  )

  module.exports = mongoose.model("withdrawalCost", withdrawalCostSchema)