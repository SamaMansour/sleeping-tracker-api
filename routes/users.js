const router = require("express").Router();
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Entry = require("../models/entry");
const durationCalculation = require("../lib/duration");

// Handle signup for a user 

router.post("/", async (req, res)=> {
  const schema = joi.object({
    name: joi.string().required().min(2).max(30),
    username: joi.string().required().min(2).max(20),
    email: joi.string().email().required().min(2).max(30),
    password: joi.string().required().min(6).max(200), 
    profilePhoto: joi.string().optional()
  })


const { error } = schema.validate(req.body);
if(error) return res.status(400).send(error.details[0].message);


try {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user with email already exists");

  user = await User.findOne({ username: req.body.username })
  if (user) return res.status(400).send("user with username already exists");
  
  const { name, username, email, password, profilePhoto} = req.body

  user = new User ({
    name,
    username,
    email,
    password,
    profilePhoto

  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const secretKey = process.env.JWT_SECRET_KEY

  const token = jwt.sign({_id: user._id, name: user.name, username: user.username, email: user.email, password: user.password}, secretKey);
  
  res.send(token);

} catch (error){
  res.status(500).send(error.message);
  console.log(error.message);

}
})

router.post("/:userId/entries", async (req, res)=>{

  const user = await User.findById(req.params.userId);

  let { date, sleepTime, wakeupTime} = req.body;

  sleepTime = newDate(`${date} ${sleepTime}`);
  wakeupTime = newDate(`${date} ${wakeupTime}`);
  date = newDate(date);

  const entryToCreate = {
    user,
    date,
    sleepTime,
    wakeupTime,
    duration
  }

  const entry = await Entry.create (entryToCreate)
  user.entries.push(entry);
  await user.save();

  res.send(entry);
 

});

module.exports = router


