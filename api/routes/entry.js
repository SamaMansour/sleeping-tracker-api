const express = require("express");
const router = express.Router();
const entryService = require("../../services/EntryService");

router.get("/entries/:id", async (req, res) => {
  try {
    const entry = await entryService.getEntryById(req.params.id);
    res.json({ data: entry, status: "success" });
  } catch (err) {
    res.status(500);
  }
});

router.get("/entries", async (req, res) => {
  try {
    const entry = await entryService.getAllEntries();
    res.json({ data: entry, status: "success" });
  } catch (err) {
    res.status(500);
  }
});

router.post("/new", async (req, res) => {
  try {
    const entry = await entryService.createEntry(req.body);
    res.json({ data: entry, status: "success" });
  } catch (err) {
    res.status(500);
  }
});
	
module.exports = router;