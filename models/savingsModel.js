const mongoose = require("mongoose");
const { Schema } = mongoose;

const savingSchema = new Schema(
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

const Saving = mongoose.model("Saving", savingSchema);

module.exports = Saving;
