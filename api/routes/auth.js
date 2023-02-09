const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
	const newUser = {
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	};

	const user = new User(newUser);

	try {
		await user.save();
		res.status(200).send({ user: user._id });
	} catch (error) {
		res.status(400).send(error);
	}
  });
	
  

module.exports = router;