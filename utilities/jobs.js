const Bill = require("../models/billsModel");
const Deduction = require("../models/deductionModel");
const Merchant = require("../models/merchantModel");
const Saving = require("../models/savingsModel");
const UserBill = require("../models/userBillsModel");

const deductBillSaving = async () => {
  try {
    //get all merchants
    const allMerchants = await Merchant.find();

    for (const merchant of allMerchants) {
      let totalDeduction = 0;
      //find merchant bills
      const merchantBills = await UserBill.find({
        user: merchant._id,
        is_active: true,
      }).populate("bill");

      for (const merchantBill of merchantBills) {
        let amount_per_day = () => {
          if (merchantBill.bill.period === "Monthly") {
            return Number(merchantBill.bill.amount) / 30;
          } else {
            return Number(merchantBill.bill.amount) / 365;
          }
        };

        const amount = Math.ceil(amount_per_day() / 10) * 10;
        const deduction = new Deduction();
        deduction.merchant = merchant._id;
        deduction.merchant_bill = merchantBill._id;
        deduction.amount = amount.toString();
        const newDeduction = await deduction.save();

        //create a new saving with the total deductions
        //add on total deduction
        totalDeduction = totalDeduction + amount;
        // console.log(newDeduction);
      }

      //Create a saving for the user
      if (totalDeduction >= 1) {
        const saving = new Saving();
        saving.merchant = merchant._id;
        saving.amount = totalDeduction.toString();
        await saving.save();
      }
    }
  } catch (error) {
    // Handle the error here
    console.log("---cron job error---");
    console.error(error);
  }
};

module.exports = {
  deductBillSaving,
};
