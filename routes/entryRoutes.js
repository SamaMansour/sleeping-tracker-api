const express = require("express");
const router = express.Router();
const {
  createEntry,
  getEntries
} = require("../controllers/entryController");

const { protect } = require("../middleware/authMiddleware");

router.route("/new").post(protect, createEntry)
router.route("/entries").get(protect, getEntries)

module.exports = router;