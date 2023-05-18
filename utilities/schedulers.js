const cron = require("node-cron");
const { deductBillSaving } = require("./jobs");

const timezone = "Africa/Nairobi";

// "*/2 * * * *",
const deductBillSavingJob = cron.schedule(
  "0 0 * * *",
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
