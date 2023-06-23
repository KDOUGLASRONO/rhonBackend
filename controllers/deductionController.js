const { response } = require("express")
const Deduction = require("../models/deductionModel")
const Merchant = require("../models/merchantModel")
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
    //console.log("deduction id ", deduction_id)
    try{
        const deduction = await Deduction.findById(deduction_id)
        console.log("status",deduction.status)
        
        if(deduction.status == "Active"){
            deduction.status = "Deleted"
            console.log("new deduction", deduction)
            await deduction.save()
        }

        const newReverseDeduction = reverseDeduction({
            deduction: deduction_id,
            merchant: deduction.merchant,
            amount: deduction.amount,
        })

        await newReverseDeduction.save()
        res.status(200).json({message:"success"});
    }
    catch(error){
        res.json(error)
    }
}
module.exports = {
    deductions,
    merchantDeduction,
    reverseDeductions
};