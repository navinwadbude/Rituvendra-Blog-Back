const mongoose=require("mongoose")
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true, 
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    
    token:{
        type:String,
        default:null
    },
    refresh_token: {
        type: String,
        min: 6,
      },
},
    
);
module.exports=mongoose.model("User",UserSchema)