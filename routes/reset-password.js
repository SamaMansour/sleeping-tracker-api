const { User } = require("../models/users");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const joi = require("joi");
const router = require("express").Router();

router.post("/", async (req, res)=>{
  try {
    const schema = joi.object({ email: joi.string().email().required()});
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const user = await User.findOne({ email: req.body.email });
    if(!user){
      return res.status(400).send("user with given name doesn't exist");
    }

    const token = await Token.findOne({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const link = `localhost:3000/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "password-reset", link);

    res.send("password link was sent to your account");


  }catch(error){
    res.send("An error occured");
    console.log(error);
  }
});


router.post("/:userId/:token", async(req, res)=>{
  try {
    const schema = joi.object({password: joi.string().required()});
    const { error } = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.params.userId);
    if(!user) return res.status(400).send("Invalid link or expired");

    const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);


  }
})
module.exports = router;