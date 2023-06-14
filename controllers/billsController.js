const Bill = require("../models/billsModel");
const Merchant = require("../models/merchantModel");
const UserBill = require("../models/userBillsModel");
const deleteBillTransaction = require("../models/deleteBillTransactionModel");
const deductions = require("../models/deductionModel");

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

  try{
    const merchantBill = await UserBill.findById(userBill_id).populate("bill");

    const merchantDeductions = await deductions.find({
      merchant_bill: userBill_id,
      bill:merchantBill.bill._id,
    })

    //console.log("deductions:", merchantDeductions);

    const totalDeducted = merchantDeductions.map((item)=>{
        return item.amount
      }).reduce((a,b)=>{
        return parseInt(a) + parseInt(b)
      },0)

      console.log("total deducted amount:", totalDeducted)

    //update userBill
    const updatedMerchantBill = await merchantBill.update(
      {
        is_active: false
      }
    )
    console.log("updated merchnat bill", updatedMerchantBill)

    let newDeleteBillTransaction = new deleteBillTransaction({
      merchant: merchantBill.user,
      userBill: merchantBill._id,
      bill: merchantBill.bill._id,
      totalDeducted:totalDeducted,
      activeDeductions:totalDeducted
    })

    if(updatedMerchantBill.acknowledged){
      console.log("updated, acknowledged")
      const existingDeletedUserBill = await deleteBillTransaction.findOne({
        userBill:userBill_id
      })
      if(existingDeletedUserBill){
        console.log("existing deleted bill found")
        try{
          await existingDeletedUserBill.update({
            totalDeducted: totalDeducted,
            activeDeductions:totalDeducted
          })
          console.log("done updating")
          return res.status(200).json(existingDeletedUserBill)
        }
        catch(error){
          return res.status(404).send({message: "error updating deletedbill"});
        }
      }
      else{
        try{
          await newDeleteBillTransaction.save()
        }
        catch(error){
          res.status(404).json(error);
        }

      }
   
    }
    else{
      response.status(404).json({message:"failed to delete merchant bill"})
    }
  }
  catch(err){
    res.status(404).json(err)
  }
  //console.log("newDeleteBillTransaction: " + newDeleteBillTransaction);
 //await newDeleteBillTransaction.save();

  //console.log("merchantBill_id: " + merchantBill)

  res.status(200).send({ message:`id received ${userBill_id}` });
}

//merchant bills
const addMerchantBill = async (req, res) => {
  const { merchant_id, bill_id, start_date } = req.body;
  //console.log("adding bills", req.body)

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
    userbill.user = merchant_id;
    userbill.bill = bill_id;
    userbill.start_date = (!start_date)? getStartDate(): start_date;

    const newUserBill = await (
      await (await userbill.save()).populate("user")
    ).populate("bill");

    newUserBill.user.password = "###########";
    res.status(200).json(newUserBill);
  } catch (error) {
    //console.log(error);
    res.status(400).json(error.message);
  }
};

const getAllMerchantBills = async (req, res) => {
  const merchant_id = req.params.id;
  //console.log("id: " + merchant_id)

  try {
    const bills = await UserBill.find({
      user: merchant_id,
      is_active: true,
    })
      .populate("user")
      .populate("bill");

    bills.forEach((b) => {
      b.user.password = "########";
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
