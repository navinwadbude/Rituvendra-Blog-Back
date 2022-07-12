const router=require("express").Router()
const User=require("../models/User")
const bcrypt=require("bcrypt")

//register
router.post("/register", async(req,res)=>{
    try{
        const hashesPass = await bcrypt.hash(req.body.password,10)
        const newUser=  new User({
            username:req.body.username,
            email:req.body.email,
            password: hashesPass
         })
        const user = await newUser.save();
        res.status(200).json(user)

    }
    catch(err){
        res.status(400).json(err)
    }
}
)


//login
router.post("/login",async(req,res)=>{
  const user=await user.findOne({
      username:re
  })


}
module.exports=router