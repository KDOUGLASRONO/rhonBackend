const Merchant = require("../models/merchantModel");
const Transfer = require("../models/transferModel");
const {
  getUserBalance,
  generateTranxRef,
  sendSms,
} = require("../utilities/helpers");

const sendToMerchant = async (req, res) => {
  const { to, from, amount } = req.body;
  try {
    if (!to || !from || !amount) {
      return res.status(400).json("missing required inputs");
    }
    if (parseInt(amount) < 1) {
      return res.status(400).json("invalid amount");
    }
    const receiver = await Merchant.findOne({
      account_number: to,
    });
    // console.log(receiver);
    if (!receiver) {
      return res.status(400).json(`Merchant with account ${to} not found`);
    }
    const sender = await Merchant.findOne({
      account_number: from,
    });

    if (!sender) {
      return res.status(400).json(`Merchant with account ${from} not found`);
    }

    if (to === from) {
      return res
        .status(400)
        .json(`Self business to business transfers not allowed`);
    }
    const sender_balance = await getUserBalance(sender._id);
    // console.log(sender_balance);
    //2 bob for sms?
    if (sender_balance < parseInt(amount)) {
      return res
        .status(400)
        .json(`You have no enough balance to send ${amount}`);
    }

    const ref = await generateTranxRef();

    const transfer = new Transfer({
      amount: amount,
      reference: ref,
      receiptient: receiver._id,
      sender: sender._id,
    });

    const newTransfer = await transfer.save();

    const sms_to_sender = `${ref} Confirmed. Ksh ${amount} sent to ${receiver.business_name}`;
    const sms_to_receiver = `${ref} Confirmed. You have received Ksh ${amount} from ${sender.business_name}`;

    // sendSms(sms_to_receiver, receiver.phone);
    // sendSms(sms_to_sender, sender.phone);

    return res.status(200).json(newTransfer);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const verifyTransfer = async (req, res) => {
  const ref = req.body.ref;
  try {
    if (!ref) {
      return res.status(400).json("Missing required Parameter");
    }

    const transfer = await Transfer.findOne({
      reference: ref,
    })
      .populate("sender")
      .populate("receiptient");

    if (!transfer) {
      return res.status(400).json(`No transfer Found matching ${ref}`);
    }

    const result = {
      amount: transfer.amount,
      from: {
        business: transfer.sender.business_name,
        phone: transfer.sender.phone,
      },
      to: {
        business: transfer.receiptient.business_name,
        phone: transfer.receiptient.phone,
      },
      date: transfer.createdAt,
    };
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

const getAllTransfers = async (req, res) => {
  try {
    const allTransfers = await Transfer.find()
      .sort({ createdAt: -1 })
      .populate("sender")
      .populate("receiptient");

    allTransfers.forEach((t) => {
      t.sender.password = "##########";
      t.receiptient.password = "##########";
    });
    res.status(200).json(allTransfers);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports = {
  sendToMerchant,
  verifyTransfer,
  getAllTransfers,
};
