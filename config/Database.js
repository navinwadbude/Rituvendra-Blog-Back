const mongoose = require("mongoose");
const db=mongoose.connect(process.env.MONGOOSE_URL)
.then(()=>console.log("DB connected"))
.catch((err) => console.log('============>',err));


console.log("==================",process.env.MONGOOSE_URL)



app.listen("3000", () => {
  console.log("Backend is running");
});
 
export default db