const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageModel = new Schema({
  type: { type: String },
  content: { type: String },
  sender: { type: String },
});

const Message = mongoose.model('Message', messageModel);

module.exports = Message;
