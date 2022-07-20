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

 
 if(!req.body.email){
   return res.status(400).json("email is required")
  }
 if(!req.body.password){
  return res.status(400).json("password is required")
  }
 const user=await User.findOne({ email:req.body.email})
if(!user){
  return res.status(400).json("wrong credential")
 }
 const validate=await bcrypt.compare(req.body.password,user.password)
 !validate && res.status(400).json("Wrong password")
//  const{password ,...others}=user



const token = await jwt.sign({userid:user.id},process.env.ACCESS_TOKEN,{
  expiresIn: '2m' 
})
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

router.get("/getUserData", verifyToken,async(req,res)=>{
  console.log('===========>',req.userId )
})

module.exports=router