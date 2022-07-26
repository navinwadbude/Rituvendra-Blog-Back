const express =require( "express");

const router=require( "./routes/authrouter.js")

const app = express();
const dotenv = require("dotenv");

const cors = require('cors')
 
app.use(cors())
dotenv.config();
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/controller",router)

