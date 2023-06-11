const axios = require("axios");

const Merchant = require("../models/merchantModel");
const Transaction = require("../models/transactionModel");

const { sendSms } = require("../utilities/helpers");

const stkpush = async (req, res) => {
  const { phone, amount, merchant_code } = req.body;

  try {
    if (!phone || !amount || !merchant_code) {
      throw {
        message: "required parameters missing",
      };
    }

    //check existing merchant

    const existingMerchant = await Merchant.findOne({
      account_number: merchant_code,
    });

    if (!existingMerchant) {
      // console.log("merchant not found");
      throw {
        message:
          "Merchant does not exist in our Database. Please check merchant Number!!",
      };
    }

    //send push
    const phone1 = phone.substring(1);
    const date = new Date();
    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);
    const shortCode = process.env.MPESA_PAYBILL;
    const passkey = process.env.MPESA_PASSKEY;

    const callbackurl = process.env.CALLBACK_URL;

    const password = new Buffer.from(shortCode + passkey + timestamp).toString(
      "base64"
    );

    const resp = await axios.post(
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerBuyGoodsOnline",
        Amount: amount,
        PartyA: phone1,
        PartyB: 8157892,
        PhoneNumber: phone1,
        CallBackURL: `${callbackurl}?merchant_code=${merchant_code}`,
        AccountReference: merchant_code,
        TransactionDesc: "rhone",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    //if push successfull
    //console.log(resp.data);
    res.status(200).json(resp.data);
  } catch (error) {
    //console.log(error.message);
    res.status(400).json(error.message);
  }
};

const handleStkCallback = async (req, res) => {
  const merchantAccountNo = req.query.merchant_code;

  if (!req.body.Body.stkCallback.CallbackMetadata) {
    //console.log(req.body.Body.stkCallback.ResultDesc);
    // sendSms(req.body.Body.stkCallback.ResultDesc, "0768793923");
    res.status(200).json("ok");
    return;
  }

  const amount = req.body.Body.stkCallback.CallbackMetadata.Item[0].Value;
  const code = req.body.Body.stkCallback.CallbackMetadata.Item[1].Value;

  const body = req.body.Body.stkCallback.CallbackMetadata;
  // const body2 = req.body.Body.stkCallback
  // console.log(body2)

  // const phone1 =
  //   body.Item[4].Value.toString().substring(
  //     3
  //   ) ||  body.Item[3].Value.toString().substring(
  //     3
  //   )

  const phoneNumberObj = body.Item.find((obj) => obj.Name === "PhoneNumber");
  const phone1 = phoneNumberObj.Value.toString().substring(3);

  const phone = `0${phone1}`;

  try {
    //check for merchant account details
    const merchant = await Merchant.findOne({
      account_number: merchantAccountNo,
    });
    if (!merchant) {
      throw new Error("merchant id not valid");
    }
    //save the transaction
    // console.log(merchant);
    const msg = `Your have received Kes.${amount} from ${phone} payment for: ${merchant.business_name}.\nRef: ${code}`;
    // const msg = `Your payment of Kes.${amount} to ${merchant.business_name} has been sent.\nRef: ${code}`;
    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.customer_phone = phone;
    transaction.merchant = merchant._id;
    transaction.transaction_code = code;
    transaction.transaction_type = "MPESA-STK";

    const newTransaction = await transaction.save();

    // console.log(msg);
    // sendSms(msg, merchant.phone);
    res.status(200).json("ok");
  } catch (error) {
    console.log(error.message);
    res.status(200).json("ok");
  }
};

const getAllTransactions = (req, res) => {
  Transaction.find(function (err, data) {
    if (err) {
      res.status(500).json(err.message);
    } else {
      res.status(200).json(data);
    }
  })
    .sort({ createdAt: -1 })
    .populate("merchant")
    .select("-merchant.password");
};

const getMerchantTransactions = async (req, res) => {
  const merchant_id = req.params.id;

  try {
    if (!merchant_id) {
      return res.status(400).json("required merchant id missing");
    }

    const merchant_transactions = await Transaction.find({
      merchant: merchant_id,
    });

    res.status(200).json({
      total: merchant_transactions.length,
      data: merchant_transactions,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  handleStkCallback,
  stkpush,
  getAllTransactions,
  getMerchantTransactions,
};
