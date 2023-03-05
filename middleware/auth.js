const jwt = require("jsonwebtoken");

const auth = (req, res, next) =>{
  const token = req.header("x-auth-token");
  if(!auth)return res.status(401).send("Not Authorized");

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const payload = jwt.verify (token, secretKey);
    req.user = payload;

    next()


  }catch(error){
    res.status(400).send("Invalid token !");
    console.log(error);
  }
}

module.exports = auth;