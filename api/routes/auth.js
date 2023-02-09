const express = require("express");
const router = express.Router();
const User = require("../../models/user");


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
	
router.post("/login", async (req, res) => {
	
	const user = await User.findOne({
		email: req.body.email,
		password: req.body.email
	})

	if(user){
		return res.json({status: 'ok', user: true})
	}else{
		return res.json({status: 'error', user: false})
	}

});
module.exports = router;