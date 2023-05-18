const Merchant = require("../models/merchantModel");
const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator");
const jwt = require("jsonwebtoken");
const {
  generateCode,
  generate4digitCode,
  sendSms,
} = require("../utilities/helpers");

const requestAccountCreation = async (req, res) => {
  const { email, phone, business_name, location } = req.body;

  //validate phone
  if (!phone) {
    return res.status(400).json("phone number required");
  }

  if (phone.length !== 10) {
    return res.status(400).json("invalid phone number");
  } else if (phone.substring(0, 2) !== "07" && phone.substring(0, 2) !== "01") {
    return res.status(400).json("invalid phone number");
  }

  if (!business_name) {
    return res.status(400).json("Business name is required");
  }
  //if email provided, validate email
  if (email) {
    if (!emailValidator.validate(email)) {
      return res.status(400).json("invalid email");
    }
    const existingEmail = await Merchant.findOne({
      email: email,
    });

    if (existingEmail) {
      return res
        .status(400)
        .json(`Business with email ${email} already exists`);
    }
  }

  //check for dublicate phones
  const existingPhoneNumber = await Merchant.findOne({
    phone: phone,
  });

  if (existingPhoneNumber) {
    return res.status(400).json(`Phone Number ${phone} already exists`);
  }

  //generate password and hash it
  try {
    const password = generateCode(7);
    const hashedpass = await bcrypt.hash(password, 10);

    const account_number = generate4digitCode();

    const merchant = new Merchant({
      email: email || null,
      phone: phone,
      business_name: business_name,
      account_number: account_number,
      password: hashedpass,
      location: location,
    });

    const newMerchant = await merchant.save();

    //send an sms to notify the merchant
    const msg = `Hello ${newMerchant.business_name}\nYour request to join RhonSystems has been received.\nOne of our agents will get back to you`;
    // sendSms(msg, phone);

    res.status(201).json({ message: "request send successfully", newMerchant });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const approveMerchantAccount = async (req, res) => {
  const id = req.params.id;

  try {
    const existingMerchant = await Merchant.findById(id);
    // console.log(existingMerchant);
    if (!existingMerchant) {
      throw new Error("Merchant not found");
    }
    if (existingMerchant.isApproved) {
      throw new Error("Merchant account is already approved");
    }

    const password = generateCode(7);
    const hashedpass = await bcrypt.hash(password, 10);

    const updatedMerchant = await Merchant.findByIdAndUpdate(
      id,
      { isApproved: true, password: hashedpass },
      { new: true }
    );

    //send sms with the login details and account number
    const sms = `Hello ${updatedMerchant.business_name}. Your rhone account request has been approved. Your password is ${password}`;

    // sendSms(sms, updatedMerchant.phone);
    res
      .status(200)
      .json({ message: `your new password is ${password}`, updatedMerchant });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const merchantLogin = (req, res) => {
  const { email, password, phone } = req.body;

  if (email) {
    //handle email login
    Merchant.findOne({ email: email })
      .then((user) => {
        if (user == null) {
          res.status(400).json({ message: "user not found" });
        } else {
          bcrypt
            .compare(password, user.password)
            .then((result) => {
              if (result == true) {
                const token = jwt.sign(
                  { id: user._id },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "1d",
                  }
                );
                res.status(200).json({
                  _id: user._id,
                  email: user.email,
                  phone: user.phone,
                  account_number: user.account_number,
                  token: token,
                });
              } else {
                res.status(400).json("invalid password");
              }
            })
            .catch((error) => {
              res.json(error.message);
            });
        }
      })
      .catch((err) => {
        res.json(err.message);
      });
  } else if (phone) {
    //handle phone login
    Merchant.findOne({ phone: phone })
      .then((user) => {
        if (user == null) {
          res.status(400).json({ message: "user not found" });
        } else {
          bcrypt
            .compare(password, user.password)
            .then((result) => {
              if (result == true) {
                const token = jwt.sign(
                  { id: user._id },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "1d",
                  }
                );
                res.status(200).json({
                  _id: user._id,
                  email: user.email,
                  phone: user.phone,
                  account_number: user.account_number,
                  token: token,
                });
              } else {
                res.status(400).json("invalid password");
              }
            })
            .catch((error) => {
              res.json(error.message);
            });
        }
      })
      .catch((err) => {
        res.json(err.message);
      });
  } else {
    return res.status(400).json("Provide email or Phone Number");
  }
};

const getAllMerchant = (req, res) => {
  Merchant.find(function (err, data) {
    if (err) {
      res.json(err.message);
    } else {
      res.status(200).json(data);
    }
  }).select("-password");
};

const getAllMerchantRequests = async (req, res) => {
  try {
    const unApprovedMerchants = await Merchant.find({
      isApproved: false,
    }).select("-password");
    res
      .status(200)
      .json({ total: unApprovedMerchants.length, unApprovedMerchants });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const checkApprovalStatus = async (req, res) => {
  const merchant_id = req.params.id;

  try {
    if (!merchant_id) {
      return res.status(400).json("required id param missing");
    }

    const merchant = await Merchant.findById(merchant_id).select("-password");

    if (!merchant) {
      return res.status(400).json("merchant with provided id not found");
    }

    if (!merchant.isApproved) {
      return res
        .status(200)
        .json({ message: "merchant pending approval", status: "false" });
    }
    res.status(200).json({ message: "merchant approved", status: "true" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const updatePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  const user_id = req.user._id;

  try {
    if (!password || !newPassword) {
      return res.status(400).json("missing required params");
    }

    const existingUser = await Merchant.findOne({ _id: user_id });

    if (!existingUser) {
      return res.status(400).json("user not found or was deleted");
    }

    const validPass = await bcrypt.compare(password, existingUser.password);

    if (!validPass) {
      return res.status(400).json("Invalid password");
    }

    //hash new pass
    const hashedpass = await bcrypt.hash(newPassword, 10);

    const updatedMerchant = await Merchant.findByIdAndUpdate(user_id, {
      password: hashedpass,
    });

    return res.status(200).json("password updated successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

const resetPassword = async (req, res) => {
  const { business_name } = req.body;
  try {
    const business = await Merchant.findOne({ business_name: business_name });

    if (!business) {
      return res
        .status(400)
        .json(
          `Business with name ${business_name} does not exist in our DataBase`
        );
    }
    //impliment some rate limiting

    //
    //generate new password
    const newPassword = generateCode(7);
    const hashedpass = await bcrypt.hash(newPassword, 10);

    await Merchant.findByIdAndUpdate(business._id, {
      password: hashedpass,
    });

    //send sms
    const sms = `Hello ${business.business_name}. Your password was reset successfully. New password is ${newPassword} \n If you did not request for password reset please contact Rhon system Admins at 0705280119`;

    // sendSms(sms, business.phone);
    res
      .status(200)
      .json(
        `Password reset successfully, \nNew password ${newPassword} sent to ${business.phone}`
      );
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const deleteAccount = async (req, res) => {
  const merchant_id = req.params.id;
  try {
    const existingMerchant = await Merchant.findOne({ _id: merchant_id });
    if (!existingMerchant) {
      return res.status(400).json("merchant not found or was deleted");
    }
    await existingMerchant.deleteOne();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

module.exports = {
  requestAccountCreation,
  approveMerchantAccount,
  merchantLogin,
  getAllMerchant,
  getAllMerchantRequests,
  checkApprovalStatus,
  updatePassword,
  resetPassword,
  deleteAccount,
};
