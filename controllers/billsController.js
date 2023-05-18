const Bill = require("../models/billsModel");
const Merchant = require("../models/merchantModel");
const UserBill = require("../models/userBillsModel");
const addBill = async (req, res) => {
  const { name, amount, period } = req.body;
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
    console.log(error);
    res.status(400).json(error.message);
  }
};

const getAllBills = async (req, res) => {
  try {
    const allBills = await Bill.find().sort({ createdAt: -1 });
    res.status(200).json(allBills);
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    res.status(400).json(error.message);
  }
};

//merchant bills
const addMerchantBill = async (req, res) => {
  const { merchant_id, bill_id } = req.body;
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
      return res.status(400).json("merchant already enrolled to bill");
    }
    const userbill = new UserBill();
    userbill.user = merchant_id;
    userbill.bill = bill_id;

    const newUserBill = await (
      await (await userbill.save()).populate("user")
    ).populate("bill");

    newUserBill.user.password = "###########";
    res.status(200).json(newUserBill);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const getAllMerchantBills = async (req, res) => {
  const merchant_id = req.params.id;

  try {
    const bills = await UserBill.find({
      user: merchant_id,
      active: true,
    })
      .populate("user")
      .populate("bill");

    bills.forEach((b) => {
      b.user.password = "########";
    });

    res.status(200).json(bills);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports = {
  addBill,
  getAllBills,
  editBill,
  deleteBill,
  addMerchantBill,
  getAllMerchantBills,
};
