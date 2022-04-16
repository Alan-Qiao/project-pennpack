const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageModel = new Schema({
  content: { type: String },
  sender: { type: mongoose.Types.ObjectId },
});

const Message = mongoose.model('Comment', messageModel);

module.exports = Message;
