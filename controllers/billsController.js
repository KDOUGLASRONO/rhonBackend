const Bill = require("../models/billsModel");
const Merchant = require("../models/merchantModel");
const UserBill = require("../models/userBillsModel");
const deleteBillTransaction = require("../models/deleteBillTransactionModel");
const deductions = require("../models/deductionModel");
const mongoose = require("mongoose");
const { merchantDeduction } = require("./deductionController");

//add bill is done by admin
const addBill = async (req, res) => {
  const { name, amount, period } = req.body;
  //console.log("add bill", req.body)
  try {
    if (!name || !amount || !period) {
      return res.status(400).json("missing required params");
    }
    if (Number(amount) < 1) {
      return res.status(400).json("invalid Bill amount");
    }

    const existingBill = await Bill.findOne({
      name: name,
      period: period,
    });

    if (existingBill) {
      return res.status(400).json(`Bill ${name} for ${period} already exists`);
    }
    const bill = new Bill({
      name,
      period,
      amount,
    });

    const newBill = await bill.save();
    res.status(200).json(newBill);
  } catch (error) {
    /*console.log(error);*/
    res.status(400).json(error.message);
  }
};

const getAllBills = async (req, res) => {
  try {
    const allBills = await Bill.find().sort({ createdAt: -1 });
    res.status(200).json(allBills);
  } catch (error) {
    //console.log(error);
    res.status(400).json(error.message);
  }
};

const editBill = async (req, res) => {
  const { name, amount, period } = req.body;
  const id = req.params.id;
  try {
    const existingBill = await Bill.findOne({
      _id: id,
    });

    if (!existingBill) {
      return res.status(400).json("Bill not found or was deleted");
    }
    if (amount) {
      if (Number(amount) < 1) {
        return res.status(400).json("invalid Bill amount");
      }
    }

    existingBill.name = name || existingBill.name;
    existingBill.amount = amount || existingBill.amount;
    existingBill.period = period || existingBill.period;

    const editedBill = await existingBill.save();
    res.status(200).json(editedBill);
  } catch (error) {
    //console.log(error);
    res.status(400).json(error.message);
  }
};

const deleteBill = async (req, res) => {
  const id = req.params.id;
  try {
    const existingBill = await Bill.findOne({
      _id: id,
    });

    if (!existingBill) {
      return res.status(400).json("Bill not found or was deleted");
    }

    await Bill.findByIdAndDelete(id);
    res.status(204).json("deleted");
  } catch (error) {
    //console.log(error);
    res.status(400).json(error.message);
  }
};

//delete merchant bill by admin
const deleteMerchantBill = async (req, res) => {

  const userBill_id = req.params.id;
  console.log("userBill_id: " + userBill_id);
  //acid
  const session = await mongoose.startSession();
  try{
    const merchantBill = await UserBill.findById(userBill_id).populate("bill");
    if(!merchantBill) {
      return res.statsu(400).send({message:"merchantBill not found"})
    }

    //deductions assoiated with that merchnatBill
    const merchantBillDeductions = await deductions.find({merchant_bill:userBill_id,status:"Active"})

    const totalDeductions = merchantBillDeductions?.map((singleMerchantBillDeduction)=>{
      return singleMerchantBillDeduction.amount
    }).reduce((a,b)=>{return parseInt(a) + parseInt(b)},0)
    
    console.log("Total Deductions", totalDeductions);

    await session.withTransaction( async()=>{
      const opts = {session}
      //update deductions
     
      await deductions.updateMany({merchant_bill:userBill_id,status:"Active"},{status:"Deleted"},opts);
      //update userBill(mercnat bill to isaCTIVE: FALSE)
      merchantBill.is_active = false;
      await merchantBill.save(opts);

      //delete bll transaction schema
      let newDeleteBillTransaction = new deleteBillTransaction({
        merchant: merchantBill.merchant,
        userBill: merchantBill._id,
        bill: merchantBill.bill._id,
        totalDeducted:totalDeductions,
        activeDeductions:totalDeductions
      })

      const existingDeletedUserBill = await deleteBillTransaction.findOne({
        userBill:userBill_id
      })

      if(existingDeletedUserBill){
        existingDeletedUserBill.totalDeducted = totalDeductions;
        existingDeletedUserBill.activeDeductions = totalDeductions

        await existingDeletedUserBill.save(opts);
      }
      else{
        await newDeleteBillTransaction.save(opts);
      }
      console.log("merchnat bill successfully updated")
    })
    res.status(200).send({message: "Successfully updated"})
  }
  catch(error){
    console.log(error)
    res.status(400).send({message: "Error updating"})
  }
  finally{
    session.endSession();
  }
  //acid
}

//merchant bills
const addMerchantBill = async (req, res) => {
  const { merchant_id, bill_id, start_date } = req.body;
  console.log("adding bills", req.body)

  const getStartDate =()=>{
    if(new Date().getDate()<6 && new Date().getDate()>0){
      return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    }
    else{
      return new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
    }
  }

  try {
    if (!merchant_id || !bill_id) {
      return res.status(400).json("required parameters missing");
    }

    //add bill to user
    const existingMerchant = await Merchant.findOne({ _id: merchant_id });
    if (!existingMerchant) {
      return res.status(400).json("Merchant with that id not found");
    }

    const existingBill = await Bill.findOne({ _id: bill_id });
    if (!existingBill) {
      return res.status(400).json("Bill with that id not found");
    }

    const existingMerchantBill = await UserBill.findOne({
      user: merchant_id,
      bill: bill_id,
    });
   
    if (existingMerchantBill) {
      if(!existingMerchantBill.is_active){
        await existingMerchantBill.update({
          is_active: true
        });
        return res.status(200).json(existingMerchantBill);
      }
      return res.status(400).json("merchant already enrolled to bill");
    }
    const userbill = new UserBill();
    userbill.merchant = merchant_id;
    userbill.bill = bill_id;
    userbill.start_date = (!start_date)? getStartDate(): start_date;

    const newUserBill = await (
      await (await userbill.save()).populate("merchant")
    ).populate("bill");

    newUserBill.merchant.password = "###########";
    res.status(200).json(newUserBill);
  } catch (error) {
    //console.log(error);
    res.status(400).json(error.message);
  }
};

const getAllMerchantBills = async (req, res) => {
  const merchant_id = req.params.id;
  console.log("id: " + merchant_id)

  try {
    const bills = await UserBill.find({
      merchant: merchant_id,
      is_active: true,
    })
      .populate("merchant")
      .populate("bill");

    bills.forEach((b) => {
      b.merchant.password = "########";
    });
    //console.log("found user",bills)
    res.status(200).json(bills);
  } catch (error) {
    //console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports = {
  addBill,
  getAllBills,
  editBill,
  deleteBill,
  deleteMerchantBill,
  addMerchantBill,
  getAllMerchantBills,
};
