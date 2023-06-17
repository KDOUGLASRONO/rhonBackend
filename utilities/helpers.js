const Deduction = require("../models/deductionModel");
const Merchant = require("../models/merchantModel");
const Saving = require("../models/savingsModel");
const Transaction = require("../models/transactionModel");
const Transfer = require("../models/transferModel");
const Withdrawal = require("../models/withdrawalModel");
const withdrawalCost = require("../models/withdrawalCostModel")

const generateCode = (length) => {
  var result = "";
  var characters = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjklmnpqrstuvwxyz23456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const generate4digitCode = () => {
  var code = "";
  code = Math.floor(1000 + Math.random() * 9000);
  return code;
};

// Set your app credentials
const credentials = {
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
};

// Initialize the SDK
const AfricasTalking = require("africastalking")(credentials);

// Get the SMS service
const sms = AfricasTalking.SMS;

const sendSms = (msg, phone) => {
  const formatted_phone = `+254${phone.substring(1)}`;
  const options = {
    to: formatted_phone,
    message: msg,
    from: "",
  };

  sms
    .send(options)
    .then(() => {
      console.log("sent");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUserBalance = async (merchant_id) => {
  //find total transactions
  let totalTrnx = 0;
  const allTransactions = await Transaction.find({
    merchant: merchant_id,
  });
  allTransactions.map((t) => {
    totalTrnx = totalTrnx + parseInt(t.amount);
  });

  //find total withdrawals
  let completeWidrwl = 0;
  let pendingWidrwl = 0;
  let failedWidrwl = 0;

  const allWithdrawals = await Withdrawal.find({
    merchant: merchant_id,
  });
  allWithdrawals.map((w) => {
    if (w.status === "Complete") {
      completeWidrwl = completeWidrwl + parseInt(w.amount);
    } else if (w.status === "Pending") {
      pendingWidrwl = pendingWidrwl + parseInt(w.amount);
    } else if (w.status === "Failed") {
      failedWidrwl = failedWidrwl + parseInt(w.amount);
    } else {
      console.log(w);
    }
  });

  let transfer_sent = 0;
  let transfer_received = 0;

  const transfers_in = await Transfer.find({
    receiptient: merchant_id,
  });

  transfers_in.forEach((tr) => {
    transfer_received = transfer_received + parseInt(tr.amount);
  });
  //
  const transfers_out = await Transfer.find({
    sender: merchant_id,
  });

  transfers_out.forEach((tr) => {
    transfer_sent = transfer_sent + parseInt(tr.amount);
  });

  //all savings
  const allSavings = await Saving.find({ merchant: merchant_id });

  let total_savings = 0;
  allSavings.forEach((sv) => {
    total_savings = total_savings + parseInt(sv.amount);
  });

  let withdrawalCosts = await withdrawalCost.find({
    merchant:merchant_id
  })
  let totalWithdrawalCosts = 0;
  totalWithdrawalCosts = withdrawalCosts?.map((cost)=>{
    return cost.amount
  }).reduce((a,b)=>{return parseInt(a)+parseInt(b)},0)
  console.log("withdrawal costs", totalWithdrawalCosts)

  // const allDeductions = await Deduction.find({ merchant: merchant_id });

  // let total_deductions = 0;

  // allDeductions.forEach((d) => {
  //   total_deductions = total_deductions + parseInt(d.amount);
  // });
  //get balance
  const balance =
    totalTrnx +
    transfer_received -
    completeWidrwl -
    pendingWidrwl -
    transfer_sent -
    // total_deductions;
    total_savings -
    totalWithdrawalCosts;

  // console.log(totalTrnx);
  return balance;
};

const withdrawalCharge = (merchant_id, amount) => {
  //calculate the charge based on given business logic
};

const generateTranxRef = async () => {
  let randomLetters = "";
  for (let i = 0; i < 2; i++) {
    randomLetters += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  // Generate 4 random numbers for the string
  let randomNumbers = "";
  for (let i = 0; i < 4; i++) {
    randomNumbers += Math.floor(Math.random() * 10).toString();
  }

  // Generate 6 random characters (letters or numbers)
  let randomChars = "";
  const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
  for (let i = 0; i < 6; i++) {
    randomChars += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Combine the random letters, numbers, and characters
  const randomString = randomLetters + randomNumbers + randomChars;
  return randomString;
};

const resetDB = () => {
  console.log("reset started");
};
module.exports = {
  generateCode,
  generate4digitCode,
  sendSms,
  getUserBalance,
  withdrawalCharge,
  generateTranxRef,
};
