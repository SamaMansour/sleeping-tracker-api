const router = require("express").Router();
const User = require("../models/users");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required().min(2).max(20),
    password: Joi.string().required().min(6).max(200)
  })

  const { error } = schema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  try {
    let user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(400).send("Invalid login credentials!")

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isValidPassword) return res.status(400).send("Invalid login credentials!")

    const secretKey = process.env.JWT_SECRET_KEY
    const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, secretKey)

    res.send(token)
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error)
  }
})

module.exports = router;