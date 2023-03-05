const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
    maxLength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 200
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1024
  },
  profilePhoto: String,
  entries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entry",
      autopopulate: { maxDepth: 2 }
    }
  ]
})


module.exports = mongoose.model("User", UserSchema)