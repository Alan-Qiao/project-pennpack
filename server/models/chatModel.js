const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema({
  userIdA: { type: String },
  userIdB: { type: String },
  messages: { type: [String] },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
