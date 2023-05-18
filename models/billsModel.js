const mongoose = require("mongoose");
const { Schema } = mongoose;

const billSchema = new Schema(
  {
    name: { type: String, required: true },
    period: { type: String, required: true, enum: ["Monthly", "Yearly"] },
    amount: { type: String, required: true },
    // created_by: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "Merchant",
    // },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
