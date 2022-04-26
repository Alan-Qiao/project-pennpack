const express = require('express');
const Class = require('../models/classModel');

const router = express.Router();


router.get('/getclasses'), async (req, res) => {
  console.log('in router /class/getclasses');
  try {
    const classes = await Class.find();
    console.log(classes);
    if (!classes) {
      console.log('no classes');
      res.status(400).json({ error: 'No classes' });
      return;
    }
    res.status(200).json({ 
      classes: classes,
      message: 'Retrieved all of the classes' 
    });
  } catch (e) {
    console.log(e);
  }
}

router.post('/create', async (req, res, next) => {
  try {
    const { body: { className, professor } } = req;

    if (!className || !professor ) {
      res.status(400).json({ error: 'Missing Required Information' });
      console.log('missing required information')
      return;
    }

    try {
      // Checking if this class already exists
      const existingClass = await Class.findOne({ className });
      if (existingClass) {
        res.status(409).json({ error: 'class already exists' });
        return;
      }

      await Class.create({ className, professor });
      res.status(201).json({ 
        className: className,
        message: 'Class is created' 
      });
     
    } catch (err) {
      next(err);
    }
    
  } catch (err) {
    next(err);
  }
});

router.post('/join', async (req, res, next) => {
  try {
    const { body: { className, userId } } = req;
    const classObj = await Class.findOne({ className });
    const user = await User.findById(userId);

    if (!classObj) {
      res.status(404).json({ error: 'class not found' });
      return;
    }
      if(user.classesEnrolled.findIndex(classObj) !== -1){
        user.classesEnrolled.push(classObj)
        res.status(201).json({ message: 'user joined class' });

      } else {
        res.status(409).json({ message: 'user Already in class' });
        return;
      }
      
  } catch (err) {
    next(err);
  }

});


module.exports = router;