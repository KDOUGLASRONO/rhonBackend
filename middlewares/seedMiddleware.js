const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
// const emailValidator = require("email-validator");
// const jwt = require("jsonwebtoken");

const addDefaultAdminUser = async (req, res, next) => {
  const email = process.env.ADMIN_EMAIL;
  const pass = process.env.ADMIN_PASSWORD;
  const phone = process.env.ADMIN_PHONE;

  const user = await User.findOne({ email: email });
  if (user) {
    return next();
  }

  try {
    hashedpass = await bcrypt.hash(pass, 10);

    const user = new User({
      email: email,
      phone: phone,
      password: hashedpass,
      isAdmin: true,
    });

    user.save().then((createdUser) => {
      console.log({ message: "admin created successfully", createdUser });
      next();
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, info: "admin user not created" });
  }
};

const updateAdminUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      "638de14b5a2de392f4043d6a",
      { isAdmin: true },
      { new: true }
    );

    console.log(updatedUser);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addDefaultAdminUser,
  updateAdminUser,
};
