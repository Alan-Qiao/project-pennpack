const express = require('express');
const Class = require('../models/classModel');
const User = require('../models/userModel');
const authenticate = require('../middlewares/authenticator');

const router = express.Router();

router.get('/getclasses', async (req, res, next) => {
  console.log('in router /class/getclasses');
  try {
    const classes = await Class.find();
    // console.log(classes);
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
    // console.log(newlyCreatedClass);
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

module.exports = router;
