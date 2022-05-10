const express = require('express');
const Multer = require('multer');
const { format } = require('util');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const authenticate = require('../middlewares/authenticator');
const gc = require('../config/mediaConfig');

const bucket = gc.bucket('pennpack');

const router = express.Router();

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.post('/uploadfile', multer.single('file'), async (req, res, next) => {
  const { file } = req;

  if (!file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);

    res.status(200).json({
      message: 'mediaUrl sent here',
      result: publicUrl,
    });
  });
  blobStream.end(file.buffer);
});

router.post('/sendmessage', authenticate, async (req, res, next) => {
  try {
    const { body: { message } } = req;

    const newlyCreatedMessage = await Message.create({
      type: message.type,
      content: message.content,
      sender: message.sender,
    });

    // Add the message to the Chat
    const chat = await Chat.findById(message.chatId);

    chat.messages.push(newlyCreatedMessage._id);
    chat.save();

    res.status(201).json({
      newlyCreatedMessage,
      message: 'Message is created',
    });
  } catch (err) {
    next(err);
  }
});

router.get('/messages/:chatId', authenticate, async (req, res, next) => {
  try {
    const { params: { chatId } } = req;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      res.status(404).json({ error: 'Chat not found' });
      return;
    }

    const messages = [];
    for (let i = 0; i < chat.messages.length; i++) {
      const currMessageId = chat.messages[i];
      // eslint-disable-next-line no-await-in-loop
      const messageObj = await Message.findById(currMessageId);

      const messageId = messageObj.sender === req.userId ? 0 : 1;

      const messageToPush = {
        id: messageId,
        type: messageObj.type,
        content: messageObj.content,
      };
      messages.push(messageToPush);
    }

    res.status(200).json({
      messages,
      message: 'Retrieved all of users classes',
    });
  } catch (err) {
    next(err);
  }
});

router.get('/getchats', authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ error: 'user not found' });
      return;
    }

    const userChats = [];
    for (let i = 0; i < user.chats.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const { userIdA, userIdB } = await Chat.findById(user.chats[i]);

      let userInfo;
      if (userIdA !== req.userId) {
        // eslint-disable-next-line no-await-in-loop
        userInfo = await User.findById(userIdA);
      } else {
        // eslint-disable-next-line no-await-in-loop
        userInfo = await User.findById(userIdB);
      }

      const userInfoCondensed = {
        chatId: user.chats[i],
        userIdB: userInfo._id,
        name: userInfo.name,
        username: userInfo.username,
      };
      userChats.push(userInfoCondensed);
    }

    res.status(200).json({
      userChats,
      message: 'Retrieved all of users classes',
    });
  } catch (err) {
    next(err);
  }
});

router.post('/create', authenticate, async (req, res, next) => {
  try {
    const { body: { userBId } } = req;

    // Checking if this chat already exists
    let existingChat = await Chat.findOne({ userIdA: req.userId, userIdB: userBId });
    if (existingChat) {
      res.status(409).json({ error: 'Chat already exists' });
      return;
    }

    existingChat = await Chat.findOne({ userIdA: userBId, userIdB: req.userId });
    if (existingChat) {
      res.status(409).json({ error: 'Chat already exists' });
      return;
    }

    const newlyCreatedChat = await Chat.create({ userIdA: req.userId, userIdB: userBId });

    // Add the chat id to both users' chat arrays
    const userA = await User.findOne({ _id: req.userId });
    userA.chats.push(newlyCreatedChat._id);
    userA.save();

    const userB = await User.findOne({ _id: userBId });
    userB.chats.push(newlyCreatedChat._id);
    userB.save();

    res.status(201).json({
      newlyCreatedChat: newlyCreatedChat._id,
      message: 'Chat is created',
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
