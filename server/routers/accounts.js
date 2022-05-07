const express = require('express');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config').get(process.env.NODE_ENV);
const authenticate = require('../middlewares/authenticator');
const User = require('../models/userModel');

const router = express.Router();

router.get('/getuser/:username', authenticate, async (req, res, next) => {
  try {
    const { params: { username } } = req;
    const result = await User.findOne({ username });

    if (!result) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json({ message: 'Read User', user: result });
    }
  } catch (err) {
    next(err);
  }
});

router.get('/getuser', authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ error: 'user not found' });
      return;
    }
    res.status(200).json({
      user,
      message: 'Retrieved user information',
    });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { body: { username, password } } = req;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ error: 'user not found' });
      return;
    }
    if (req.cookies.token) {
      res.status(200).json({ message: 'Already logged in', user });
      return;
    }
    if (user.attempts >= 3) {
      if ((Date.now() - user.updatedAt) > 3 * 60 * 1000) {
        user.attempts = 0;
        await user.save();
      } else {
        res.status(403).json({ error: 'account is locked' });
        return;
      }
    }
    user.checkPassword(password, (err, isRight) => {
      if (isRight) {
        const token = jwt.sign({ userId: user._id }, SECRET);
        console.log(process.env.NODE_ENV);
        res.cookie('token', token, { secure: true, httpOnly: true, sameSite: 'none' })
          .status(200)
          .json({ message: `Logged in ${username}`, user });
        return;
      }
      user.attempts += 1;
      user.save().then(() => res.status(401).json({ error: 'incorrect password' }));
    });
  } catch (err) {
    next(err);
  }
});

router.post('/logout', authenticate, async (req, res, next) => {
  try {
    if (req.userId) req.userId = null;
    res.clearCookie('token').status(200).json({ message: 'Logged out.' });
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
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    next(err);
  }
});

router.post('/resetPassword', async (req, res, next) => {
  try {
    const { body: { username, password } } = req;
    if (!username || !password) {
      res.status(400).json({ error: 'Missing Required Information' });
      return;
    }
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ error: 'User does not exist' });
    }
    user.password = password;
    await user.save();
    res.status(200).json({ message: 'Password Updated' });
  } catch (err) {
    next(err);
  }
});

router.get('/authenticate', async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({ message: 'unauthenticated' });
    return;
  }
  try {
    const { userId } = jwt.verify(token, SECRET);
    req.userId = userId;
    res.status(200).json({ message: 'authenticated' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
