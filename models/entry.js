const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  
});

module.exports = Entry = mongoose.model("entries", EntrySchema);