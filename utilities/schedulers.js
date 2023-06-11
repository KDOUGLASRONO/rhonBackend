const cron = require("node-cron");
const { deductBillSaving } = require("./jobs");

const timezone = "Africa/Nairobi";

// "*/ * * * *",
const deductBillSavingJob = cron.schedule(
  "*/30 * * * *",
  async () => {
    try {
      await deductBillSaving();
    } catch (error) {
      console.error(error);
    }
  },
  { scheduled: true, timezone }
);

// Export the cron job
module.exports = { deductBillSavingJob };
