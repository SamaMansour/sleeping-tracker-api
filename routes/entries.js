const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/users");
const Entry = require("../models/entry");

router.get("/:userId", auth, async (req, res) =>{
	try {
		const user = await User.findById(req.params.userId);
    if (user._id == req.user._id) res.status(401).send("not authorized");

    const entries = user.entries.sort((a, b)=> newDate(b.date) - newDate(a.date));

    res.send(entries)
    } catch (error) {
    console.log(error.message)
  }

	
});


router.post("/", auth, async(req, res)=>{
  const user = await User.findById(req.body.userId);

  const entryRequest = {
    user,
    date: req.body.date, 
    sleepTime: req.body.sleepTime,
    wakeupTime: req.body.wakeupTime,
    duration: req.body.duration
  }

  const entry = await Entry.create(entryRequest)

  user.entries.push(entry)
  await user.save()

  res.send("OK")
});



module.exports = router;