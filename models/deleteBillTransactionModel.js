const mongoose = require('mongoose')
const schema = mongoose.Schema;

const deleteBillTransactionSchema = new schema({
    merchant: {
        type:mongoose.Schema.Types.ObjectId, 
        required: true,
        ref:"Merchant"
    },
    userBill:{
        type:mongoose.Schema.Types.ObjectId,
        required: true, 
        ref:"UserBill"
    },
    bill:{
        type:mongoose.Schema.Types.ObjectId,
        required: true, 
        ref:"Bill"
    },
    totalDeducted:{
        type:String, 
        required:true
    },
    activeDeductions:{
        type:String, 
        required:true, 
        default:"0"
    }
},
{timestamps:true}
)

module.exports = mongoose.model("deleteBillTransaction",deleteBillTransactionSchema)