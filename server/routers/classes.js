const express = require('express');
const Class = require('../models/classModel');
const User = require('../models/userModel');
const authenticate = require('../middlewares/authenticator');
const Note = require('../models/noteModel');
const ClassDay = require('../models/classDayModel');

const router = express.Router();

router.get('/getuserclasses', authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ error: 'user not found' });
      return;
    }
    const userClasses = user.classesEnrolled;
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
    const user = await User.find({ username });

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
      console.log('user already in class err');
      res.status(409).json({ error: 'user already in class' });
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

router.post('/addDay', authenticate, async (req, res, next) => {
  try {
    const { body: { className, date, type, topic } } = req;
    console.log(req.body);
    if (!className || !date || !type || !topic) {
      res.status(400).json({ error: 'Missing required information' });
      return;
    }
    const classObj = await Class.findOne({ className });
    if (!classObj) {
      res.status(404).json({ error: 'Cannot find associated class' });
    }
    const result = await ClassDay.create({
      classId: classObj._id,
      date: new Date(date),
      type,
      topic,
      notes: [],
    });
    classObj.classDays.push(result._id);
    classObj.save();
    res.status(201).json({ message: 'Class Day successfully created', day: result });
  } catch (err) {
    next(err);
  }
});

router.get('/readDays/:classId', authenticate, async (req, res, next) => {
  try {
    const { params: { classId } } = req;
    const classObj = await Class.findById(classId);
    if (!classObj) {
      res.status(404).json({ error: 'Class not found' });
      return;
    }
    const days = await ClassDay.find({ _id: { $in: classObj.classDays } });
    res.status(200).json({ message: 'Retrieved class days successfully', days });
  } catch (err) {
    next(err);
  }
});

// For ClassDay.js, getting data about the class day
router.get('/readClassDay/:classId', authenticate, async (req, res, next) => {
  try {
    const { params: { classId } } = req;
    const classDayObj = await ClassDay.findById(classId);
    if (!classDayObj) {
      res.status(404).json({ error: 'ClassDay not found' });
      return;
    }
    res.status(200).json({
      message: 'Retrieved class days successfully',
      type: classDayObj.type,
      topic: classDayObj.topic,
      date: classDayObj.date,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/readDayById/:classId', authenticate, async (req, res, next) => {
  try {
    const { params: { classId } } = req;
    const classObj = await Class.findById(classId);
    if (!classObj) {
      res.status(404).json({ error: 'Class not found' });
      return;
    }
    const days = await ClassDay.find({ _id: { $in: classObj.classDays } });
    res.status(200).json({ message: 'Retrieved class days successfully', days });
  } catch (err) {
    next(err);
  }
});

router.post('/addNote', authenticate, async (req, res, next) => {
  try {
    const { body: { classDayId, description, link } } = req;
    if (!classDayId || !description || !link) {
      res.status(400).json({ error: 'Missing required information' });
      return;
    }
    const classDay = await ClassDay.findById(classDayId);
    if (!classDay) {
      res.status(404).json({ error: 'Associated class day not found' });
    }
    const { username } = await User.findById(req.userId);
    const result = await Note.create({
      classDayId, ownerHandle: username, description, link, likes: 0,
    });
    classDay.notes.push(result._id);
    classDay.save();
    res.status(201).json({ message: 'Class note successfully created', note: result });
  } catch (err) {
    next(err);
  }
});

router.post('/updateNote', authenticate, async (req, res, next) => {
  try {
    const { body: { noteId, classDayId, description, link, likes } } = req;
    if (!noteId) {
      res.status(400).json({ error: 'Missing note identifier' });
      return;
    }
    const note = await Note.findById(noteId);
    if (!note) {
      res.status(404).json({ error: 'Class note not found' });
      return;
    }
    if (classDayId) note.classDayId = classDayId;
    if (description) note.description = description;
    if (link) note.link = link;
    if (likes) note.likes = likes;
    note.save();
    res.status(200).json({ message: 'Class note successfully updated', note });
  } catch (err) {
    next(err);
  }
});

router.get('/readNotes/:classDayId', authenticate, async (req, res, next) => {
  try {
    const { params: { classDayId } } = req;
    const day = await ClassDay.findById(classDayId);
    if (!day) {
      res.status(404).json({ error: 'Class Day not found' });
      return;
    }
    const notes = await Note.find({ _id: { $in: day.notes } });
    res.status(200).json({ message: 'Retrieved Notes Successfully', notes });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
