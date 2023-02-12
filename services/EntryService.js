const EntryModel = require("../models/entry");
 
exports.getAllEntries = async () => {
  return await EntryModel.find();
};
 
exports.createEntry = async (entry) => {
  return await EntryModel.create(entry);
};
exports.getEntryById = async (id) => {
  return await EntryModel.findById(id);
};
 
exports.updateEntry = async (id, entry) => {
  return await EntryModel.findByIdAndUpdate(id, entry);
};
 
exports.deleteEntry = async (id) => {
  return await EntryModel.findByIdAndDelete(id);
};