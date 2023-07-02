const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { email, phone, password } = req.body;

  //console.log("regitration attempt", req.body);

  if (!email || !password || !phone) {
    return res.status(400).json("all fields are required");
  } else if (password.length < 8) {
    return res.status(400).json("password too short");
  } else if (!emailValidator.validate(email)) {
    return res.status(400).json("invalid email");
  } else if (phone.length !== 10) {
    return res.status(400).json("invalid phone number");
  } else if (phone.substring(0, 2) !== "07" && phone.substring(0, 2) !== "01") {
    return res.status(400).json("invalid phone number");
  }
  const user = await User.findOne({ email: email });
  if (user) {
    res
      .status(400)
      .json({ message: `user with email:${email} already exists` });
  }
  try {
    hashedpass = await bcrypt.hash(password, 10);

    const user = new User({
      email: email,
      phone: phone,
      password: hashedpass,
    });

    user.save().then(() => {
      res
        .status(201)
        .json({ message: `user :${user.email} registered successfully`, user });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const signIn = (req, res) => {
  const { email, password } = req.body;
  //console.log("admin login", req.body);

  User.findOne({ email: email })
    .then((user) => {
      if (user == null) {
        return res.status(400).json({ message: "user not found" });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((result) => {
            if (result == true) {
              const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                expiresIn: "1d",
              });
              res.status(200).json({
                _id: user._id,
                email: user.email,
                phone: user.phone,
                token: token,
              });
            } else {
             return res.status(400).json("invalid password");
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
};

const getUsers = (req, res) => {
  User.find(function (err, data) {
    if (err) {
      res.json(err.message);
    } else {
      res.json(data);
    }
  }).select("-password");
};

module.exports = {
  signUp,
  signIn,
  getUsers,
};
