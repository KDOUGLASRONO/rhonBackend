const Merchant = require("../models/merchantModel");
const Withdrawal = require("../models/withdrawalModel");
const withdrawalCost = require("../models/withdrawalCostModel")
const FailedWithdrawal = require("../models/failedWithdrawals");
const Saving = require("../models/savingsModel");
const axios = require("axios");
const { getUserBalance } = require("../utilities/helpers");

//transaction cost
let transactionCost = (cash)=>{
  if(cash<100){
    return 0
  }
  else if(cash>99 && cash<500){
    return 6
  }
  else if(cash>499 && cash<1000){
    return 12
  }
  else{
    return 20
  }
}
//initiate withdrawal
const initiateWithdrawal = async (req, res) => {
  const { amount, pay_to, merchant_account, initiator_phone } = req.body;
  console.log("initiating withdraw", req.body)

  try {
    if (!amount || !merchant_account || !initiator_phone) {
      return res.status(400).json("required params missing");
    }

    let send_to = null;
    if (!pay_to) {
      send_to = initiator_phone;
    } else {
      send_to = pay_to;
    }

    //find account
    const existingMerchant = await Merchant.findOne({
      account_number: merchant_account,
    });

    if (!existingMerchant) {
      return res
        .status(400)
        .json("merchant with provided account number does not exist");
    }

    //check the initiator phone if is account owner
    if (initiator_phone !== existingMerchant.phone) {
      return res
        .status(400)
        .json(
          "Security Breach!! You can not withdraw from an account not registered to this phone"
        );
    }

    // if (amount < 100) {
    //   return res.status(400).json("You cannot withdraw less than 100 ");
    // }

    if (amount < 10) {
      return res.status(400).json("You cannot withdraw less than 10 ");
    }

    //transaction cost
   

    let balance = await getUserBalance(existingMerchant._id);
    console.log("balance: " + balance)

    if (balance < 1) {
      balance = 0;
    }

    if (balance < Number(amount) + Number(transactionCost(amount))) {
      console.log("balance2: " + balance)
      return res
        .status(400)
        .json(`Your current balance is ${balance}. Cannot withdraw ${amount} must pay transaction fee of ${transactionCost(amount)}`);
    }

    let deduction = 20;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayWithdrawal = await Withdrawal.findOne({
      merchant: existingMerchant._id,
    }).sort({ updatedAt: -1 });

    if (todayWithdrawal) {
      deduction = 0;
    }

    const receiving_cash = parseInt(amount) - deduction;

    const phone1 = send_to.substring(1);

    // console.log({ name: process.env.B2C_INITIATOR_NAME });
    //withdrawal logic goes here
    const resp = await axios.post(
      "https://api.safaricom.co.ke/mpesa/b2c/v1/paymentrequest",
      {
        InitiatorName: process.env.B2C_INITIATOR_NAME,
        SecurityCredential: process.env.B2C_SECRET_CRED,
        CommandID: "BusinessPayment",
        Amount: Number(amount),
        // Amount: receiving_cash,
        PartyA: process.env.B2C_SHORTCODE,
        PartyB: `254${phone1}`,
        Remarks: "Rhone withdrawal",
        QueueTimeOutURL: "https://api.rhonpesa.online/api/v1/b2c-timeout",
        ResultURL: `https://api.rhonpesa.online/api/v1/b2c-result?merchant=${existingMerchant._id}&deduction=${deduction}`,
        Occassion: "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    //save withdrawal with pending status
    const withdrawal = Withdrawal();
    withdrawal.amount = amount;
    withdrawal.paid_to = send_to;
    withdrawal.merchant = existingMerchant._id;
    withdrawal.conversation_id = resp.data.ConversationID;

    await withdrawal.save();
    res
      .status(200)
      .json(
        `Withdrawal request Received, You will receive Ksh ${receiving_cash} once processed successfully, Ksh ${deduction} will be reserved for your monthly NHIF payment`
      );
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const handleResult = async (req, res) => {
  const merchant_id = req.query.merchant;
  if (!req.body.Result.ResultParameters) {
    console.log("-------------------- B2C Result -----------------");
    console.log(req.body.Result);
    //handle failed results
    const withdrawalToUpdate = await Withdrawal.findOne({
      conversation_id: req.body.Result.ConversationID,
    });

    withdrawalToUpdate.status = "Failed";
    withdrawalToUpdate.save();

    const failedWithdrawal = FailedWithdrawal();
    failedWithdrawal.withdrawal = withdrawalToUpdate._id;
    failedWithdrawal.reason = req.body.Result.ResultDesc;

    failedWithdrawal.save();
    res.status(200).json("ok");
    return;
  }

  //successfull
  console.log("-------------------- B2C Result -----------------");

  const callbackData = req.body.Result.ResultParameters.ResultParameter;
  console.log(callbackData);
  const trnx_code = callbackData[1].Value;
  //update to complete
  const withdrawalToUpdate = await Withdrawal.findOne({
    conversation_id: req.body.Result.ConversationID,
  });

  withdrawalToUpdate.status = "Complete";
  withdrawalToUpdate.transaction_code = trnx_code;
  withdrawalToUpdate.save();

  //save to database the cost of withdrawals as revenue
  const newWithdrawalCost = new withdrawalCost({
    amount:transactionCost(withdrawalToUpdate.amount),
    merchant:(withdrawalToUpdate.merchant),
    conversation_id: req.body.Result.ConversationID,   
  });

  await newWithdrawalCost.save();
  
  res.status(200).json("ok");
};

const handleTimeout = (req, res) => {
  console.log("---------TIMEOUT------------");
  console.log(req.body);
};
//get all withdrawals
const getAllWithdrawals = async (req, res) => {
  try {
    const allWithdrawals = await Withdrawal.find()
      .sort({ updatedAt: -1 })
      .populate("merchant");

    allWithdrawals.forEach((w) => {
      w.merchant.password = "##############";
    });

    res.status(200).json(allWithdrawals);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

//get merchant withdrawals
const getMerchantWithdrawals = async (req, res) => {
  const merchant_id = req.params.id;

  try {
    if (!merchant_id) {
      return res.status(400).json("missing required params");
    }

    const existingMerchant = await Merchant.findById(merchant_id);

    if (!existingMerchant) {
      return res.status(400).json("merchant does not exist in our database");
    }

    const merchantWithdrawals = await Withdrawal.find({
      merchant: merchant_id,
    }).sort({ updatedAt: -1 });

    res.status(200).json(merchantWithdrawals);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

const getFailedWithdrawals = async (req, res) => {
  try {
    const allFailedWithdrawals = await FailedWithdrawal.find()
      .populate({
        path: "withdrawal",
        populate: {
          path: "merchant",
          select: "-password",
        },
      })
      .sort({
        createdAt: -1,
      });
    res.status(200).json(allFailedWithdrawals);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

module.exports = {
  initiateWithdrawal,
  getAllWithdrawals,
  getMerchantWithdrawals,
  handleTimeout,
  handleResult,
  getFailedWithdrawals,
};
