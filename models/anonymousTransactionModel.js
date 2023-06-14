const mongoose = require('mongoose');
const schema = mongoose.Schema;


const anonymousSchema = new schema({
    amount: { type: String, required: true },
    customer_phone: { type: String, required: true },
    merchant: {
      type:"string",
      default:"anonymous"
    },
    transaction_code: {
      type: String,
      required: true,
    },
    transaction_type: {
      type: String,
      //   enum: ["Cash", "Mpesa"],
      default: "Mpesa",
    },
},
{
    timestamps: true,
}
)

module.exports = mongoose.model("anonymous", anonymousSchema);