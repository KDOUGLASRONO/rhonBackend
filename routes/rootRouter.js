const express = require("express");
const rootRouter = express.Router();

const userController = require("../controllers/userController");
const {
  handleStkCallback,
  stkpush,
  getAllTransactions,
  getMerchantTransactions,
} = require("../controllers/paymentController");
const {
  requestAccountCreation,
  approveMerchantAccount,
  getAllMerchant,
  getAllMerchantRequests,
  merchantLogin,
  checkApprovalStatus,
  resetPassword,
  updatePassword,
  deleteAccount,
} = require("../controllers/merchantController");

//withdrawals controllers
const {
  initiateWithdrawal,
  getAllWithdrawals,
  getMerchantWithdrawals,
  handleResult,
  handleTimeout,
  getFailedWithdrawals,
} = require("../controllers/withdrawalController");

//.
const { protect, admin } = require("../middlewares/authMiddleware");
const {
  getAccessToken,
  getB2CAccessToken,
  getC2BAccessToken,
} = require("../middlewares/mpesaMiddleware");
const {
  checkMerchantStatus,
} = require("../middlewares/merchantAuthMiddleware");

const { ussdHandler } = require("../controllers/ussdController");
const {
  validatePayment,
  confirmPayment,
  registerUrls,
} = require("../controllers/offlinePaymentController");
const {
  getAnalytics,
  merchantSpecificData,
} = require("../controllers/analyticsController");
const {
  sendToMerchant,
  verifyTransfer,
  getAllTransfers,
} = require("../controllers/transferController");
const {
  addBill,
  editBill,
  getAllBills,
  deleteBill,
  deleteMerchantBill,
  addMerchantBill,
  getAllMerchantBills,
} = require("../controllers/billsController");

const {
  deductions,
  merchantDeduction,
  reverseDeductions
} = require("../controllers/deductionController");
//const deductions = require("../controllers/deductionController");

//ADMIN ROUTES
rootRouter.get("/users", protect, admin, userController.getUsers);
// rootRouter.post("/user/register", userController.signUp);
rootRouter.post("/user/login", userController.signIn);
rootRouter.post("/user/register", userController.signUp);

//merchant routes
rootRouter.get("/merchants", getAllMerchant); //auth to be added
rootRouter.get("/merchants/inactive", protect, admin, getAllMerchantRequests);
rootRouter.post("/merchant", requestAccountCreation);
rootRouter.post("/merchant/login", checkMerchantStatus, merchantLogin);
rootRouter.put("/merchant/approve/:id", approveMerchantAccount);
rootRouter.get("/merchant-status/:id", checkApprovalStatus);
rootRouter.post("/merchant/reset-pass", resetPassword);
rootRouter.put("/merchant/update-password", protect, updatePassword);
rootRouter.delete("/merchant/delete/:id", protect, admin, deleteAccount);

//transactions/payments routes
rootRouter.post("/pokeaujumbe", handleStkCallback);
rootRouter.post("/pay", getAccessToken, stkpush);
rootRouter.get("/transactions", getAllTransactions);
rootRouter.get("/merchant-transactions/:id", getMerchantTransactions);

//withdrawals routes
rootRouter.get("/withdrawals", getAllWithdrawals);
rootRouter.get("/merchant-withdrawals/:id", getMerchantWithdrawals);
rootRouter.post("/withdraw", getB2CAccessToken, initiateWithdrawal);
rootRouter.post("/b2c-result", handleResult);
rootRouter.post("/b2c-timeout", handleTimeout);
rootRouter.get("/failed-withdrawals", getFailedWithdrawals);

rootRouter.post("/ussd-handler", ussdHandler);

//offline payments
rootRouter.post("/offline-confirm", confirmPayment);
rootRouter.post("/offline-validate", validatePayment);
rootRouter.get("/register", getC2BAccessToken, registerUrls);

//analytics
rootRouter.get("/analytics", getAnalytics);
rootRouter.get("/merchant-analytics/:id", merchantSpecificData);

//merchant to merchant
rootRouter.post("/transfer", sendToMerchant);
rootRouter.post("/validate-transfer", verifyTransfer);
rootRouter.get("/get-all-transfers", getAllTransfers);

//bills
rootRouter.post("/add-bill", addBill);
rootRouter.put("/edit-bill/:id", editBill);
rootRouter.get("/get-all-bills", getAllBills);
rootRouter.delete("/delete-bill/:id", deleteBill);
rootRouter.delete("/delete-merchant-bill/:id", deleteMerchantBill);

//merchant-bills
rootRouter.post("/add-merchant-bill", addMerchantBill);
rootRouter.get("/get-merchant-bills/:id", getAllMerchantBills);

//deductions routes
rootRouter.get("/deductions", deductions);
rootRouter.get("/deductions/:id", merchantDeduction);
rootRouter.post("/reverse-deduction/:id", reverseDeductions);

//rootRouter.get("/deductions/:id", deductions);

module.exports = rootRouter;
