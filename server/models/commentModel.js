const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  noteId: { type: mongoose.Types.ObjectId },
  commenter: { type: String }, // handle of commenter
  content: { type: String },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
