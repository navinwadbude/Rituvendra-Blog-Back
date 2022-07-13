const router=require("express").Router()
const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")

//register
router.post("/register", async(req,res)=>{
    try{
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
            message: "succes",
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
 !user && res.status(400).json("wrong credential")
 console.log(user,"frgrgrg")

 const validate=await bcrypt.compare(req.body.password,user.password)
 !validate && res.status(400).json("Wrong password")
console.log(typeof req.body.password+"========>",typeof user.password)
 
 const{password ,...others}=user
 res.status(200).json(others)
     
} catch (err){
res.status(500).json(err)
}
console.log(user._id,"User._id");
const createWebToken= async()=>{
  const token = await jwt.sign(User._id,"mynameisrituvendramishrajabalpur")

//   const token = jwt.sign(data, "jwtSecretKey");
  
  res.send(token);
  console.log(token)
 

const userver=await jwt.verify(token,"mynameisrituvendramishrajabalpur")
console.log(userver)
createWebToken()
}

})
module.exports=router