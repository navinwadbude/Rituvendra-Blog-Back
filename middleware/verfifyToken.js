

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  console.log("token",token);
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token,  "refreshtoken", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
 
};
