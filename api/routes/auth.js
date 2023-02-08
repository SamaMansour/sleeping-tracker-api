const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
	
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const isUserExist = await User.findOne({ email: req.body.email });
	if (isUserExist) {
		return res.status(400).send("user exist");
	}

	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);
	const newUser = {
		username: req.body.username,
		email: req.body.email,
		password: hashPassword,
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