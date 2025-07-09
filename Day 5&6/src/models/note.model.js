const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const noteModel = mongoose.model("note", notesSchema);

module.exports = noteModel;
