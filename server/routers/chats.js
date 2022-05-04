const express = require('express');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const authenticate = require('../middlewares/authenticator');


const router = express.Router();

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
      
      let userInfo;
      if (userIdA._id.toString() !== req.userId) {
        userInfo = await User.findById(userIdA);
      } else {
        userInfo = await User.findById(userIdB);
      }

      const userInfoCondensed = {
        id: userInfo._id,
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
