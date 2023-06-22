const mongoose = require('mongoose');
const schema = mongoose.Schema;

const reverseDeductionSchema = new schema({
    deduction:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"reverseDeduction"
    },
    merchant:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Merchant"
    },
    amount:{type:String, required: true}
},
{
    timestamps:true
}
)

module.exports = mongoose.model("reverseDeduction",reverseDeductionSchema);