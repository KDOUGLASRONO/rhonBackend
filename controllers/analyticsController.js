const Merchant = require("../models/merchantModel");
const Transaction = require("../models/transactionModel");
const Transfer = require("../models/transferModel");
const User = require("../models/userModel");
const Withdrawal = require("../models/withdrawalModel");
const Deductions = require('../models/deductionModel');
const deleteBillTransaction = require("../models/deleteBillTransactionModel");
const reverseDeduction = require("../models/reverseDeductionModel");
const { getUserBalance } = require("../utilities/helpers");
const mongoose = require("mongoose");

//all merchants
//all pending registrations
//total payments
//total withdrawn
//all users
const getAnalytics = async (req, res) => {
  try {
    const allUsersTotal = await User.find();
    const allMerchantsTotal = await Merchant.find();
    const payments = await Transaction.find();
    const deletedBillTransaction = await deleteBillTransaction.find();
    let totalPayed = 0;
    payments.forEach((p) => (totalPayed = totalPayed + parseInt(p.amount)));
    const withdrawals = await Withdrawal.find({ status: "Complete" });
    let totalWithdrawn = 0;
    withdrawals.forEach(
      (w) => (totalWithdrawn = totalWithdrawn + parseInt(w.amount))
    );
    // const totalWithdrawn =
    //   withdrawals.reduce((current, obj) => current + parseInt(obj.amount)) || 0;

    // const balance = totalPayed - totalWithdrawn;
    const data = {
      users: allUsersTotal.length,
      merchants: allMerchantsTotal.length,
      payments: totalPayed,
      withdrawals: totalWithdrawn,
      pending_merchants: allMerchantsTotal.filter(
        (merchant) => merchant.isApproved == false
      ).length,
    };

    res.status(200).json(data);
  } catch (error) {
    /*console.log(error);*/
    res.status(400).json(error.message);
  }
};

const merchantSpecificData = async (req, res) => {
 
  const id = req.params.id;
  //console.log("id", id);

  //name , phone , email , status
  //total withdrawn , total transacted , total transfers in , total transafers out ,balance
  try {
    const merchant = await Merchant.findById(id);
    //console.log("merchant", merchant)
    if (!merchant) {
      return res.status(400).json("merchant not found");
    }
    const b_name = merchant.business_name;
    const b_phone = merchant.phone;
    const b_email = merchant.email;
    const b_status = merchant.isApproved;

    // transaction
    const payments = await Transaction.find({
      merchant: merchant._id
    });
    //console.log("payments: "+ payments.length)
  
    let totalPayed = 0;
    payments.forEach((p) => (totalPayed = totalPayed + parseInt(p.amount)));

    //withdrawals
    const withdrawals = await Withdrawal.find({
      status: "Complete",
      merchant: merchant._id,
    });
    //console.log("withdrawals: " + withdrawals.length)
    let totalWithdrawn = 0;
    withdrawals.forEach(
      (w) => (totalWithdrawn = totalWithdrawn + parseInt(w.amount))
    );

    //deductions
    const merchantDeductions = await Deductions.find({
      merchant: id,
      status:"Active"
    })
    //to reverse deleted bills
    /*
    merchantDeductions.map(async(deduction)=>{
      deduction.status = "Active"
      await deduction.save();
    })
    */

    //console.log("deductions: ", merchantDeductions.length)

    const totalMerchantDeductions = merchantDeductions?.map((item)=>{
      return item.amount
    }).reduce((a,b)=>{
      return parseInt(a) + parseInt(b)
    },0);

    //delete merchnt bill: reverses active dedcutions and reflect in balance.
    const deletedBillTransactions = await deleteBillTransaction.find({
      merchant: merchant._id
    });

    //console.log("deleted bill transactions:", deletedBillTransactions)
    const deletedBillTransactionsAmount = deletedBillTransactions?.map((item)=>{
      return item.activeDeductions
    }).reduce((a,b)=>{
      return parseInt(a)+ parseInt(b)
    },0)

    //console.log("deleted bill transactions amount:", deletedBillTransactionsAmount)
    //reverse deductions

    const merchantReverseDeductions = await reverseDeduction.find({
      merchant: id
    })
    //console.log("deduction found")
    const totalReverseDeductions = merchantReverseDeductions.map((item)=>{
      return item.amount
    }).reduce((a,b)=>{
      return parseInt(a) + parseInt(b)
    },0)
    //console.log("amount deductions: ", totalReverseDeductions);
    const balance = await getUserBalance(merchant._id);

    //console.log("balance: ", balance)

    let transfer_sent = 0;
    let transfer_received = 0;

    const transfers_in = await Transfer.find({
      receiptient: merchant._id,
    });

    transfers_in.forEach((tr) => {
      transfer_received = transfer_received + parseInt(tr.amount);
    });
    //
    const transfers_out = await Transfer.find({
      sender: merchant._id,
    });

    transfers_out.forEach((tr) => {
      transfer_sent = transfer_sent + parseInt(tr.amount);
    });

    res.status(200).json({
      name: b_name,
      phone: b_phone,
      email: b_email,
      status: b_status,
      payments: totalPayed,
      withdrawn: totalWithdrawn,
      balance: balance,
      activeDeductions: totalMerchantDeductions,
      transfers_out: transfer_sent,
      transfers_in: transfer_received,
      reversed_deductions: totalReverseDeductions,
      delete_bill_deductions: deletedBillTransactionsAmount
    });
  } catch (error) {
    //console.log(error);
    res.json(error.message);
  }
};

module.exports = {
  getAnalytics,
  merchantSpecificData,
};
