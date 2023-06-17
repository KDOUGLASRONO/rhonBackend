const { default: axios } = require("axios");
const Merchant = require("../models/merchantModel");
const Transaction = require("../models/transactionModel");
const Anonymous = require("../models/anonymousTransactionModel");
const { sendSms } = require("../utilities/helpers");

const validatePayment = (req, res) => {
  console.log("---------validation-------------------");
  //console.log(req.body);
};

const confirmPayment = async (req, res) => {
  //   console.log("---------confirmation-------------------");
  //   console.log(req.body);

  const merchant_code = req.body.BillRefNumber;
  const amount = req.body.TransAmount;
  const code = req.body.TransID;
  const phone = req.body.MSISDN.replace(/\s/g, "");
  const phone1 = `0${phone.substring(3)}`;

  //console.log("requested", req.body);

  try {
    //check for merchant account details
    const merchant = await Merchant.findOne({
      account_number: merchant_code,
    });
    if (!merchant) {
      const newAnonymous = Anonymous({
        amount: amount,
        customer_phone:phone,
        transaction_code:code,
        transaction_type:"MPESA-OFFLINE"
      })
      try{
        newAnonymous.save();
      }
      catch(err){
        console.log("eror saving")
      }
      console.log("received anonymous payment")
    }
    //save the transaction
    // console.log(merchant);
    const msg = `Your have received Kes.${amount} from ${req.body.FirstName} payment for: ${merchant.business_name}.\nRef: ${code}`;
    // const msg = `Your payment of Kes.${amount} to ${merchant.business_name} has been sent.\nRef: ${code}`;
    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.customer_phone = phone1;
    transaction.merchant = merchant._id;
    transaction.transaction_code = code;
    transaction.transaction_type = "MPESA-OFFLINE";

    const newTransaction = await transaction.save();
    //console.log(newTransaction);
    // console.log(msg);
    // sendSms(msg, merchant.phone);
    res.status(200).json("ok");
  } catch (error) {
    //console.log(error.message);
    res.status(200).json("ok");
  }
  //    {
  //   TransactionType: 'Pay Bill',
  //   TransID: 'RCD4Q01QYW',
  //   TransTime: '20230313205752',
  //   TransAmount: '1.00',
  //   BusinessShortCode: '4100341',
  //   BillRefNumber: '1',
  //   InvoiceNumber: '',
  //   OrgAccountBalance: '32.00',
  //   ThirdPartyTransID: '',
  //   MSISDN: '2547 ***** 923',
  //   FirstName: 'RIDHIWANI'
  // }
};

const registerUrls = async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.safaricom.co.ke/mpesa/c2b/v2/registerurl",
      {
        ShortCode: "4100341",
        ResponseType: "Completed",
        ConfirmationURL: "https://api.rhonpesa.online/api/v1/offline-confirm",
        ValidationURL: "https://api.rhonpesa.online/api/v1/offline-validate",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.send(response);
  } catch (error) {
    res.send(error);
  }
};
module.exports = { validatePayment, confirmPayment, registerUrls };
