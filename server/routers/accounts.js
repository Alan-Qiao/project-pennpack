const express = require('express');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config').get(process.env.NODE_ENV);
const authenticator = require('../middlewares/authenticator');
const User = require('../models/userModel');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    if (req.userId) {
      res.status(200).send('Already logged in');
      return;
    }
    const { body: { _id, username, password } } = req;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ error: 'user not found' });
      return;
    }
    user.checkPassword(password, (err, isRight) => {
      if (isRight) {
        const token = jwt.sign({ userId: _id }, SECRET);
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
          .status(200)
          .json({ message: `Logged in ${username}`, user });
        return;
      }
      res.status(401).json({ error: 'incorrect password' });
    });
  } catch (err) {
    next(err);
  }
});

router.post('/logout', authenticator, async (req, res, next) => {
  try {
    if (req.userId) req.userId = null;
    res.clearCookie('token').status(200).send('Logged out.');
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  const { body: { name, username, password } } = req;
  if (!name || !username || !password) {
    res.status(400).json({ error: 'Missing Required Information' });
    return;
  }
  if (!name.match(/^([0-9a-z.'-] ?)+$/i) || !username.match(/^[0-9a-z\-_]+$/i)) {
    res.status(400).json({ error: 'Invalid Username or Name' });
    return;
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(409).json({ error: 'Username already exists' });
      return;
    }
    await User.create({ name, username, password });
    res.status(201).send('User created');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
