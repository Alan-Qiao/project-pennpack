const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema({
  classDayId: { type: String },
  ownerHandle: { type: String },
  description: { type: String },
  notelink: { type: String },
  likes: { type: Number },
  comments: { type: [mongoose.Types.ObjectId] },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
