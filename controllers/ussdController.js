// const { response } = require("express");
const axios = require("axios");
const Merchant = require("../models/merchantModel");
const UserBill = require("../models/userBillsModel");

const { getUserBalance } = require("../utilities/helpers");

const ussdHandler = async (req, res) => {
  let { sessionId, serviceCode, phoneNumber, text, networkCode } = req.body;

  res.set("Content-Type: text/plain");

  //handle first case payment
  console.log(phoneNumber);
  // console.log(phoneNumber.substring(4));
  if (text.split("*").length == 2 && text.split("*")[0].length == 4) {
    const phone = phoneNumber;
    const merchant_code = text.split("*")[0];
    const amount = text.split("*")[1];
    try {
      await axios.post("http://localhost:5000/api/v1/pay", {
        phone,
        amount,
        merchant_code,
      });
      let response = `END Payment request sent successfully\nEnter Pin to complete payment`;
      return res.send(response);
    } catch (error) {
      let response = `END ${error.response.data}`;
      console.log(error.response.data);
      return res.send(response);
    }
  }

  //handle default
  if (text === "") {
    //handle defaults
    let response = `CON Welcome to Rhone System\nHow may we help you?\n1. Make Payment \n2. My Account`;
    res.send(response);
  } else if (text === "1") {
    let response = `CON Enter merchant Code`;
    res.send(response);
  }
  //will start from here
  else if (text.split("*").length === 2 && text.split("*")[0] === "1") {
    let response = `CON Enter amount`;
    res.send(response);
  } else if (text.split("*").length === 3 && text.split("*")[0] === "1") {
    if (
      isNaN(Number(text.split("*")[1])) ||
      isNaN(Number(text.split("*")[2]))
    ) {
      let response = `END Account Number and Amount should be digits`;
      return res.send(response);
    }
    //send push
    try {
      await axios.post("http://localhost:5000/api/v1/pay", {
        phone: phoneNumber,
        amount: text.split("*")[2],
        merchant_code: text.split("*")[1],
      });
      let response = `END Payment request sent successfully\nEnter Pin to complete payment`;
      return res.send(response);
    } catch (error) {
      let response = `END ${error.response.data}`;
      console.log(error.response.data);
      return res.send(response);
    }
  } else if (text === "2") {
    let response = `CON Enter Your merchant Acc No to proceed`;
    res.send(response);
  } else if (text.split("*").length === 2 && text.split("*")[0] === "2") {
    const phone = `0${phoneNumber.substring(4)}`;
    const merchant = await Merchant.findOne({
      account_number: text.split("*")[1],
    });
    if (!merchant) {
      let response = `END No merchant found with Acc No ${text.split("*")[1]}`;
      return res.send(response);
    }
    if (merchant.phone !== phone) {
      let response = `END The merchant is not registered to this phone(simcard)`;
      return res.send(response);
    }
    let response = `CON Choose service\n1. Withdraw\n2. Send to merchant\n3. Balance\n4. My bills`;
    res.send(response);
  }

  //handle withdraw
  else if (
    text.split("*").length === 3 &&
    text.split("*")[0] === "2" &&
    text.split("*")[2] === "1"
  ) {
    let response = `CON Enter amount`;
    res.send(response);
  } else if (
    text.split("*").length === 4 &&
    text.split("*")[0] === "2" &&
    text.split("*")[2] === "1"
  ) {
    const amount = Number(text.split("*")[3]);
    const merchant_account = text.split("*")[1];
    const initiator_phone = `0${phoneNumber.substring(4)}`;

    try {
      const resp = await axios.post("http://localhost:5000/api/v1/withdraw", {
        amount,
        merchant_account,
        initiator_phone,
      });

      // console.log(resp);
      let response = `END ${resp.data}`;
      return res.send(response);
    } catch (error) {
      let response = `END ${error.response.data}`;
      console.log(error.response.data);
      return res.send(response);
    }
  }
  //handle send to merchant
  else if (
    text.split("*").length === 3 &&
    text.split("*")[0] === "2" &&
    text.split("*")[2] === "2"
  ) {
    let response = `CON enter recipients Acc No`;
    res.send(response);
  } else if (
    text.split("*").length === 4 &&
    text.split("*")[0] === "2" &&
    text.split("*")[2] === "2"
  ) {
    const sender = text.split("*")[1];
    const receiver = text.split("*")[3];
    const merchant = await Merchant.findOne({
      account_number: receiver,
    });
    if (!merchant) {
      let response = `END Receiving merchant not found`;
      return res.send(response);
    }
    let response = `CON Enter amount`;
    res.send(response);
  } else if (
    text.split("*").length === 5 &&
    text.split("*")[0] === "2" &&
    text.split("*")[2] === "2"
  ) {
    const sender = text.split("*")[1];
    const receiver = text.split("*")[3];
    const amount = text.split("*")[4];

    const merchant = await Merchant.findOne({
      account_number: receiver,
    });
    if (!merchant) {
      let response = `END Receiving merchant not found`;
      return res.send(response);
    }
    let response = `CON Send ${amount} to ${merchant.business_name}.\n1. confirm\n2. Cancel`;
    res.send(response);
  } else if (
    text.split("*").length === 6 &&
    text.split("*")[0] === "2" &&
    text.split("*")[2] === "2" &&
    text.split("*")[5] === "1"
  ) {
    const sender = text.split("*")[1];
    const receiver = text.split("*")[3];
    const amount = text.split("*")[4];

    try {
      await axios.post("http://localhost:5000/api/v1/transfer", {
        to: receiver,
        amount: amount,
        from: sender,
      });
      let response = `END Transfer successfull\nThank you for choosing Rhon Payments`;
      return res.send(response);
    } catch (error) {
      let response = `END ${error.response.data}`;
      console.log(error.response.data);
      return res.send(response);
    }
  } else if (
    text.split("*").length === 6 &&
    text.split("*")[0] === "2" &&
    text.split("*")[2] === "2" &&
    text.split("*")[5] === "2"
  ) {
    let response = `END Tranfer Cancelled.\nWelcome Again`;
    return res.send(response);
  }

  //handle Balance check
  else if (
    text.split("*").length === 3 &&
    text.split("*")[0] === "2" &&
    text.split("*")[2] === "3"
  ) {
    const merchant = await Merchant.findOne({
      account_number: text.split("*")[1],
    });
    // console.log({ merchant, no: text.split("*")[1] });
    const balance = await getUserBalance(merchant._id);
    if (balance < 1) {
      let response = `END Your Balance for ${
        merchant.business_name
      } is Ksh 0. You have Ksh ${Math.abs(balance)} unpaid bill deductions`;
      return res.send(response);
    }
    let response = `END Your Balance for ${merchant.business_name} is Ksh ${balance}`;
    return res.send(response);
  }

  //handle Bills check
  else if (
    text.split("*").length === 3 &&
    text.split("*")[0] === "2" &&
    text.split("*")[2] === "4"
  ) {
    const code = text.split("*")[1];
    const resp = await ussdUserBillsCheck(code);
    let response = `END Your current active bills\n${resp}`;
    return res.send(response);
  }
  //last default
  else {
    let response = `END Invalid response. Try again!!`;
    return res.send(response);
  }
};

//handle any other

// if(text !== "" && text.split("*")[0].length !== 4){
//     //this will redo the previous response
// }

const ussdUserBillsCheck = async (code) => {
  const merchant = await Merchant.findOne({ account_number: code });

  const MerchantBills = await UserBill.find({
    user: merchant._id,
  }).populate("bill");

  if (MerchantBills.length < 1) {
    return "You have no bills yet, Login to your portal and subscribe to any of our available bills";
  }

  const strings = MerchantBills.map((item, index) => {
    let amount_per_day = () => {
      if (item.bill.period === "Monthly") {
        return Number(item.bill.amount) / 30;
      } else {
        return Number(item.bill.amount) / 365;
      }
    };
    const daily_deduction = Math.ceil(amount_per_day() / 10) * 10;
    return `${index + 1}. ${item.bill.name} ${item.bill.amount}, ${
      item.bill.period
    } Billed Ksh ${daily_deduction} daily`;
  });

  const result = strings.join("\n");

  return result;
};
module.exports = {
  ussdHandler,
};
