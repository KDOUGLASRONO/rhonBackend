const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const morgan = require("morgan");
const rootRouter = require("./routes/rootRouter");
const { deductBillSavingJob } = require("./utilities/schedulers");
//const allDeductions = require("./deduction")
//const Deduction = require("./models/deductionModel")

//testing

//connect to database
mongoose
  .connect(process.env.MONGO_URI_RHONPESA)
  .then(() => console.log("connected to db successfully"))
  .catch((err) => console.log(err));

//fucntion to coppy merchnats to database


const  copydata =()=>{
  //console.log("all Merchants", allMerchants)
 allDeductions.map(async(deduction)=>{

    const newDeduction = new Deduction({
      _id:deduction._id,
      amount:deduction.amount,
      merchant:deduction.merchant,
      merchant_bill:deduction.merchant_bill,
      createdAt:deduction.createdAt,
      updatedAt:deduction.updatedAt,
      __v: 0
    })
       await newDeduction.save();

  })
}
//copydata()

//add admin as in env file
const seedAdmin = require("./middlewares/seedMiddleware").addDefaultAdminUser;



//required middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(morgan("tiny"));
app.use(seedAdmin);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.get("/", async (req, res) => {
  res.send("You have reached rhone sytems backed");
});

app.use("/api/v1", rootRouter);

app.listen(port, () => {
  console.log(`app is running at port: ${port}`);

  //start jobs after server runs
  deductBillSavingJob.start();
});
