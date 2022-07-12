const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authrouter=require("./routes/auth")



dotenv.config();
app.use(express.json());
app.use("/api/auth",authrouter)
mongoose.connect(`mongodb+srv://Rituvendra_login:rituvendra12345@cluster0.n518x.mongodb.net/users_db`)
  .then(()=>console.log("DB connected"))
  .catch((err) => console.log('============>',err));


 

  
app.listen("3000", () => {
    console.log("Backend is running");
  });