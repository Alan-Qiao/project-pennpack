const express = require('express');
const Class = require('../models/classModel');
const User = require('../models/userModel');
const authenticate = require('../middlewares/authenticator');

const router = express.Router();

router.get('/getuserclasses', authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ error: 'user not found' });
      return;
    }
    let userClasses = user.classesEnrolled;
    res.status(200).json({
      userClasses,
      message: 'Retrieved all of users classes',
    });

  } catch (err) {
    next(err);
  }
});

router.get('/getuserclasses/:username', async (req, res, next) => {
  try {
    const { params: { username } } = req;
    const user = await User.find({username});

    if (!user) {
      res.status(404).json({ error: 'user not found' });
      return;
    }
    let userClasses = user[0].classesEnrolled;
    if (typeof userClasses === 'undefined') {
      userClasses = [];
    }
    res.status(200).json({
      userClasses,
      message: 'Retrieved all of users classes',
    });

  } catch (err) {
    next(err);
  }
});

router.get('/getclasses', async (req, res, next) => {
  try {
    const classes = await Class.find();
    if (!classes) {
      res.status(400).json({ error: 'No classes' });
      return;
    }
    res.status(200).json({
      classes,
      message: 'Retrieved all of the classes',
    });
  } catch (err) {
    next(err);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const { body: { className, professor } } = req;

    if (!className || !professor) {
      res.status(400).json({ error: 'Missing Required Information' });
      return;
    }

    // Checking if this class already exists
    const existingClass = await Class.findOne({ className });
    if (existingClass) {
      res.status(409).json({ error: 'class already exists' });
      return;
    }

    const newlyCreatedClass = await Class.create({ className, professor });
    res.status(201).json({
      className,
      newlyCreatedClass: newlyCreatedClass._id,
      message: 'Class is created',
    });
  } catch (err) {
    next(err);
  }
});

router.post('/join', authenticate, async (req, res, next) => {
  try {
    const { body: { classId } } = req;
    const classObj = await Class.findOne({ _id: classId });
    const user = await User.findById(req.userId);

    if (!classObj) {
      res.status(404).json({ error: 'class not found' });
      return;
    }

    if (!user.classesEnrolled.includes(classId)) {
      user.classesEnrolled.push(classId);
      user.save();
      res.status(201).json({ message: 'user joined class' });
    } else {
      res.status(409).json({ error: 'user Already in class' });
      return;
    }
  } catch (err) {
    next(err);
  }
});

router.get('/read/:className', authenticate, async (req, res, next) => {
  try {
    const { params: { className } } = req;
    const result = await Class.findOne({ className });

    if (!result) {
      res.status(404).json({ error: 'class not found' });
    } else {
      res.status(200).json({ message: 'Read Class Data', class: result });
    }
  } catch (err) {
    next(err);
  }
});

router.get('/readbyid/:classId', authenticate, async (req, res, next) => {
  try {
    const { params: { classId } } = req;
    const result = await Class.findOne({ _id: classId });

    if (!result) {
      res.status(404).json({ error: 'class not found' });
    } else {
      res.status(200).json({ message: 'Read Class Data', class: result });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
