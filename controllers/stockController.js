const Stock = require("../models/stockModel");
const Merchant = require("../models/merchantModel");

const createInitialStock = (req, res) => {
  //morning stock
  const { opening_stock } = req.body;
  //start stock
  //close stock
  //expected sale
  //merchant_id
};

module.exports = {
  createInitialStock,
};
