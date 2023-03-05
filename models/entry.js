const mongoose = require("mongoose")

const EntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: { maxDepth: 2 }
  },
  date: {
    type: String,
    required: true
  },
  sleepTime: { 
    type: String,
    required: [true, "The sleeptime is required"]
  },
  wakeupTime: {
    type: String,
    required: [true, "The wakeuptime is required"]
  },
  duration: { 
    type: String,
    required: [true, "The duration is required"]
  }
})


module.exports = mongoose.model("Entry", EntrySchema)