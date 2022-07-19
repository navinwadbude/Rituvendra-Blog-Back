const router=require("express").Router()
const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");


//register
router.post("/register", async(req,res)=>{
    try{
      dotenv.config();

        const {username,email,password,cpassword}=req.body
        const pass  = await bcrypt.hash(password,10)
        const user = await User.create({
            username,
            email,
            password:pass ,
            cpassword
          });
          console.log(user,"user");
          return res.status(200).json({
            message: "success",
          });
        } catch (error) {
            console.log(error)
          return res.status(500).json({
            error: error.message,
          });
  
}}
)



//login
router.post("/login",async(req,res)=>{
    
 try{
 const user=await User.findOne({ email:req.body.email})
 console.log("=======>",user)
 !user && res.status(400).json("wrong credential")

 const validate=await bcrypt.compare(req.body.password,user.password)
 !validate && res.status(400).json("Wrong password")
//  const{password ,...others}=user

const token = await jwt.sign({userid:user.id},"mynameisrituvendramishrajabalpur")
const setToken =  await User.findOneAndUpdate({_id:user.id},{$set:{token:token}})
// console.log(token)
// const userver=await jwt.verify(token,"mynameisrituvendramishrajabalpur")
// console.log(userver)
res.status(200).json({"accessToken":token,"user":user})

} catch (err){
  console.log(err)
res.status(500).json(err)
}



})

router.get("/getUserData",async(req,res)=>{
  let token = req.headers["authorization"];
})


module.exports=router