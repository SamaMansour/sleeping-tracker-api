const mongoose = require("mongoose");
const entrySchema = mongoose.Schema(
  {
    sleepTime: {
      type: String,
      required: [true, "Please select a valid sleep time"],
    },
    wakeUpTime: {
      type: String,
      required: [true, "Please select a valid wake up time"],
    },
    date: {
      type: Date,
      required: [true, "The date is not valid"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Entry", entrySchema);