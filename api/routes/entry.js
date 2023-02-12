const express = require("express");
const router = express.Router();
const entryService = require("../../services/EntryService");


router.post("/new", async (req, res) => {
  try {
    const entry = await entryService.createEntry(req.body);
    res.json({ data: entry, status: "success" });
  } catch (err) {
    res.status(500);
  }
});
	
module.exports = router;