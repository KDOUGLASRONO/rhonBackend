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

//testing
 const Merchants = require("./models/merchantModel");
//testing

//add admin as in env file
const seedAdmin = require("./middlewares/seedMiddleware").addDefaultAdminUser;

mongoose
  .connect(process.env.MONGO_URL_ONLINE)
  .then(() => console.log("connected to db successfully"))
  .catch((err) => console.log(err));

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
   const data = await Merchants.find()
   console.log("deductions: ", data)
});



app.use("/api/v1", rootRouter);

app.listen(port, () => {
  console.log(`app is running at port: ${port}`);

  //start jobs after server runs
  // deductBillSavingJob.start();
});
