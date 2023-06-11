const { response } = require("express")
const Deduction = require("../models/deductionModel")
const Merchant = require("../models/merchantModel")

const deductions = async (req,res)=>{
    const deductionId = req.params.id
    //console.log("deductionId: ", deductionId)
    try{
        const deductions = await Deduction.find()
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
        const deductions = await Deduction.find({merchant: merchant_id}).populate("bill");
        res.status(200).send(deductions)
    }
    catch(err){
        res.send(err);
    }


}
module.exports = {
    deductions,
    merchantDeduction
};