const express = require('express');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const authenticate = require('../middlewares/authenticator');

const router = express.Router();

router.post('/send', authenticate, async (req, res, next) => {
  try {
    console.log('in /chat/send')
    const { body: { message} } = req;
    console.log(message);

    const newlyCreatedMessage = await Message.create({ 
      type: message.type,
      content: message.content,
      sender: message.sender
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
    console.log('in /messages/:chatId')
    const { params: { chatId } } = req;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      res.status(404).json({ error: 'Chat not found' });
      return;
    }

    let messages = [];
    for (let i = 0; i < chat.messages.length; i++) {
      const currMessageId = chat.messages[i];
      const messageObj = await Message.findById(currMessageId);

      const messageId = messageObj.sender === req.userId ? 0 : 1;

      const messageToPush = {
        id: messageId,
        type: messageObj.type,
        content: messageObj.content
      }
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
    console.log('in /chat/getchats')
    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ error: 'user not found' });
      return;
    }

    let userChats = [];
    for (let i = 0; i < user.chats.length; i++) {
      const { userIdA, userIdB } = await Chat.findById(user.chats[i]);
      console.log(userIdA, userIdB);
      
      let userInfo;
      if (userIdA !== req.userId) {
        userInfo = await User.findById(userIdA);
      } else {
        userInfo = await User.findById(userIdB);
      }

      const userInfoCondensed = {
        chatId: user.chats[i],
        userIdB: userInfo._id,
        name: userInfo.name,
        username: userInfo.username
      }
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
    console.log('in /chat/create')
    const { body: { userBId } } = req;

    // Checking if this class already exists
    let existingChat = await Chat.findOne({ userIdA: req.userId, userIdB: userBId });
    if (existingChat) {
      res.status(409).json({ error: 'Chat already exists' });
      return;
    }

    existingChat = await Chat.findOne({ userIdA: userBId, userIdB: req.userId, }); 
    if (existingChat) {
      res.status(409).json({ error: 'Chat already exists' });
      return;
    }   

    const newlyCreatedChat = await Chat.create({ userIdA: req.userId, userIdB: userBId });

    // Add the chat id to both users' chat arrays
    let userA = await User.findOne({ _id: req.userId });
    userA.chats.push(newlyCreatedChat._id);
    userA.save();

    let userB = await User.findOne({ _id: userBId });
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
