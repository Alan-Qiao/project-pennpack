const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema({
  classDayId: { type: mongoose.Types.ObjectId },
  ownerHandle: { type: String },
  description: { type: String },
  link: { type: String },
  likes: { type: Number },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
