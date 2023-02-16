const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Entry = require("../models/entry");

const removeTime = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

const createEntry = asyncHandler(async (req, res) => {
  const { sleepTime, wakeUpTime, date } = req.body;

  if (!sleepTime || !wakeUpTime || !date) {
    res.status(400);
    throw new Error("Invalid input.");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  const transformed_date = removeTime(new Date(date));

 
  const sleep = await Entry.find({ user: req.user.id, date: transformed_date });

  if (sleep.length > 0) {
    res.status(412);
    throw new Error("There is already a sleep entry for that date!");
  }

  const new_sleep = await Entry.create({
    sleepTime,
    wakeUpTime,
    date: transformed_date,
    user: req.user.id,
  });

  res.status(201).json(new_sleep);
});

const getEntries = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.user.id);

  
  const daysBack = parseInt(req.query.daysBack || 7);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  
  const startFilterDate = new Date().setDate(new Date().getDate() - daysBack);

  const sleepEntries = await Entry.find({
    user: req.user.id,
    date: { $gte: startFilterDate, $lt: new Date() },
  }).sort({
    date: -1,
  });

  res.status(200).json(sleepEntries);
});


module.exports = {
  createEntry,
  getEntries,
};