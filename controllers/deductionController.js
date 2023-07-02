const { response } = require("express")
const Deduction = require("../models/deductionModel")
const Merchant = require("../models/merchantModel")
const mongoose = require("mongoose");
const reverseDeduction = require("../models/reverseDeductionModel");

const deductions = async (req,res)=>{
    const deductionId = req.params.id
    //console.log("deductionId: ", deductionId)
    try{
        const deductions = await Deduction.find({
            status:"Active"
        })
        .populate("merchant")
        .populate("bill")
        res.status(200).send(deductions);
    }
    catch(err){
        //console.log("error geting deductions", err);
        res.status(500).send(err);
    }

}
const merchantDeduction = async (req, res) => {
    const merchant_id = req.params.id;
    try{
        const deductions = await Deduction.find({
            merchant: merchant_id,
            status:"Active"
        }).populate("bill");
        res.status(200).send(deductions)
    }
    catch(err){
        res.send(err);
    }


}
const reverseDeductions = async(req,res)=>{
    //console.log("got here")
    const deduction_id = req.params.id
    console.log("deduction id ", deduction_id)
     const session = await mongoose.startSession()

    try{
      
        const deduction = await Deduction.findById(deduction_id)
        console.log("status",deduction.status)
        if(deduction.status!="Active"){
            return res.status(400).send({message:"deduction not active"});
        }
        
        //acid

        await session.withTransaction(async()=>{
            const opts = {session}

            if(deduction.status == "Active"){
                deduction.status = "Deleted"
                await deduction.save(opts)
            }
               

            const newReverseDeduction = reverseDeduction({
                deduction: deduction_id,
                merchant: deduction.merchant,
                amount: deduction.amount,
            })
            await newReverseDeduction.save(opts);
            console.log("reversal was successful");

        })
        //acid
    }
    catch(error){
        console.log(error)
        return res.status(400).send({message:"failed to reverse bill"})
    }
    finally{
         session.endSession();

    }
    res.status(200).send({message: 'reversal was successful'});
}
module.exports = {
    deductions,
    merchantDeduction,
    reverseDeductions
};