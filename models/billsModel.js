const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.set('strictQuery', false)
const billSchema = new Schema(
  {
    name: { type: String, required: true },
    period: { type: String, required: true, enum: ["DAILY", "WEEKLY","2 WEEKS", "MONTHLY", "YEARLY"] },
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
