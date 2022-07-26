const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
//register
module.exports={
register: async(req,res)=>{
    try{
      dotenv.config();

        const {username,email,password,cpassword}=req.body
        if(!username||!email||!password||!cpassword){
          return res.status(400).json("please filled all details")
        }
        const pass  = await bcrypt.hash(password,10)
        const user = await User.create({
            username,
            email,
            password:pass ,
            
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
  
}},





//login
login:async(req,res)=>{
    
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



const accesstoken = await jwt.sign({userid:user.id},process.env.ACCESS_TOKEN,{
  expiresIn: '2m' 
})
const refreshtoken= await jwt.sign({userid:user.id},process.env.REFRESH_TOKEN,{
  expireIn:"1d"
})
await User.findByIdAndUpdate({ _id: user.id }, 
  {
      $set: {
      refresh_token:refreshtoken
        }
   },
    {
      new: true,
      useFindAndModify: true
    })

    res.cookie('refreshToken', refreshtoken,{
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
  });
const setToken =  await User.findOneAndUpdate({_id:user.id},{$set:{token:accesstoken}})
// console.log(token)
// const userver=await jwt.verify(token,"mynameisrituvendramishrajabalpur")
// console.log(userver)
res.status(200).json({"accessToken":accesstoken,"user":user})

} catch (err){
  console.log(err)
res.status(500).json({message:"Email dont exist"})
}

},

 logout : async(req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if(!refreshToken) return res.sendStatus(204);
  const user = await User.findOne({refresh_token: refreshToken});
  if(!user) return res.sendStatus(204);
  const userId = user.id;
  await User.findByIdAndUpdate({_id: userId},{refresh_token: null});
  res.clearCookie('refreshToken');
  return res.sendStatus(200);


},
 //getuserdata
getUserData:async(req,res)=>{
  try {
    const user=await User.find()
    res.json(user)
  } catch (error) {
    console.log(error)
  }
}

}