const Bill = require("../models/billsModel");
const Deduction = require("../models/deductionModel");
const Merchant = require("../models/merchantModel");
const Saving = require("../models/savingsModel");
const UserBill = require("../models/userBillsModel");

function finalAmount(amount){
  if(amount<100){
    return amount + 3
  }
  else if (amount>99 && amount<300){
    return amount + 6
  }
  else if (amount>299 && amount<500){
    return amount + 8
  }
  else{
    return amount + 10
  }
}

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

        //console.log("current bill start date", merchantBill.start_date)
        
       // if(merchantBill?.start_date<=new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate())){
         // console.log(" started")
          //console.log(merchantBill.start_date ,"!=",new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate()))
        
        let amount_per_day = () => {
          if (merchantBill.bill.period === "MONTHLY") {
            let amount = Math.ceil(Number(merchantBill.bill.amount) / 30);
            return finalAmount(amount)
          } 
          else if(merchantBill.bill.period === "WEEKLY)") {
            let amount = Math.ceil(Number(merchantBill.bill.amount) / 7);
           return finalAmount(amount)
          }
          else if(merchantBill.bill.period === "2 WEEKS"){
            let amount = Math.ceil(Number(merchantBill.bill.amount)/14);
            return finalAmount(amount)
          }
          else if(merchantBill.bill.period === "YEARLY"){
            let amount = Math.ceil(Number(merchantBill.bill.amount)/365);
            return finalAmount(amount)
          } 
          else if(merchantBill.bill.period === "DAILY"){
            let amount = Math.ceil(Number(merchantBill.bill.amount)/1);
            return finalAmount(amount)
          }
          else{
            return parseInt(merchantBill.bill.amount) + 3
          }         
        };

        const amount = Math.ceil(amount_per_day());
        const deduction = new Deduction();
        deduction.merchant = merchant._id;
        deduction.merchant_bill = merchantBill._id;
        deduction.bill = merchantBill.bill._id;
        deduction.amount = amount.toString();
        const newDeduction = await deduction.save();
        console.log("deductions on")
      

        //create a new saving with the total deductions
        //add on total deduction
        totalDeduction = totalDeduction + amount;
        // console.log(newDeduction);
     // }
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
