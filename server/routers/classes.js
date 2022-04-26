const express = require('express');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config').get(process.env.NODE_ENV);
const authenticator = require('../middlewares/authenticator');
const Class = require('../models/classModel');
const User = require('../models/userModel');

const router = express.Router();

router.post('/create', authenticator, async (req, res, next) => {
  try {
    const { body: { className, professor } } = req;
    
    

    if (!className || !professor ) {
      res.status(400).json({ error: 'Missing Required Information' });
      return;
    }
    let letters = /^[A-Za-z]+$/;
    if (!className.match(/^([A-Za-z.'-'0-900'] ?)+$/i) || !professor.match(letters)) {
      res.status(400).json({ error: 'Invalid classname ' });
      return;
    }
    try {
      const existingClass = await Class.findOne({ className });
      if (existingClass) {
        res.status(409).json({ error: 'class already exists' });
        return;
      }

      await Class.create({className, professor});
      res.status(201).json({ message: 'Class is created' });
     
    } catch (err) {
      next(err);
    }
    
  } catch (err) {
    next(err);
  }
});

router.post('/join', authenticator,  async (req, res, next) => {
  try {
    // the actual object id of the class
    const { body: { className, professor } } = req;
    const clas = await Class.findOne({ className })
    const user = User.findById(req.userId)
    if (!clas) {
      res.status(404).json({ error: 'class not found' });
      return;
    }
      if(user.classesEnrolled.findIndex(Class) !== -1){
        //add class to user's list ofclasses
        user.classesEnrolled.push(Class)
        res.status(201).json({ message: 'user joined class' });

      } else {
        res.status(409).json({ message: 'user Already in class' });
        return;

      }
      

    
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