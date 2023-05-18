const Merchant = require("../models/merchantModel");

const checkMerchantStatus = async (req, res, next) => {
  try {
    const approvedMerchant = await Merchant.findOne({ email: req.body.email });

    if (!approvedMerchant) {
      throw new Error("Merchant does not exist");
    }
    if (!approvedMerchant.isApproved) {
      throw new Error("Account is yet to be approved");
    }
    next();
  } catch (error) {
    res.status(401).json(error.message);
  }
};

module.exports = {
  checkMerchantStatus,
};
