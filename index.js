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
const allSavings = require("./savings")
const Saving = require("./models/savingsModel")

//testing

//connect to database
mongoose
  .connect(process.env.MONGO_URL_ONLINE)
  .then(() => console.log("connected to db successfully"))
  .catch((err) => console.log(err));

//fucntion to coppy merchnats to database


const  copydata =()=>{
  console.log("all Merchants", allSavings)
  allSavings.map(async(saving)=>{

    const newSaving = new Saving({
      _id:saving._id,
      merchant:saving.merchant,
      amount:saving.amount,
      createdAt:saving.createdAt,
      updatedAt:saving.updatedAt,
      __v: 0
    })
       await newSaving.save();

  })
}
/*copydata()*/

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
