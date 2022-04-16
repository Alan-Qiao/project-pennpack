const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema({
  userIdA: { type: mongoose.Types.ObjectId },
  userIdB: { type: String },
  messages: { type: [String] },
});

const Chat = mongoose.model('Comment', chatSchema);

module.exports = Chat;
