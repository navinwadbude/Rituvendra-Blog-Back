const express = require("express");
const bodyParser = require('body-parser');
const authrouter=require("./controller/controller")




const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const cors = require('cors')
 
app.use(cors())
dotenv.config();
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/controller",authrouter)

console.log("==================",process.env.MONGOOSE_URL)

mongoose.connect(process.env.MONGOOSE_URL)
  .then(()=>console.log("DB connected"))
  .catch((err) => console.log('============>',err));


 

  
app.listen("3000", () => {
    console.log("Backend is running");
  });