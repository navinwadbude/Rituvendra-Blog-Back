
const jwt = require("jsonwebtoken");


 export const verifyToken = (req, res, next) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log("verify============",token)
  if(token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if(err) return res.json({msg:"access token expire"});
      req.email = decoded.email;
      next();
  })
}
