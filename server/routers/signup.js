const express = require('express');
const User = require('../models/userModel');
// const consts = require('./routesConst');

const router = express.Router();

// router.post('/', async (req, res) => {
// //   const { email, username, password } = req.body;

//   // if (!consts.isInputValid(email) || !consts.isInputValid(username) || 
//   //       !consts.isInputValid(password)) {
//   //      res.status(400).send({ message: consts.invalidInputErrorMessage })
//   //      return
//   // }

// //   try {
// //     const existingUser = await User.findOne({ email: email });
// //     if (existingUser) {
// //       res.status(400).json({ auth: false, message: consts.emailExists });
// //       return;
// //     }

// // 		const newUser = await new User({
// // 			email: email, username: username, password: password })
// // 			.save();

// // 		res.status(200).json({
// // 			success: true,
// // 			user: newUser.toObject()
// //     })
// //   } catch (err) {
// //     console.log(err)
// //     res.status(500).json({ success: false })
// //   }
// })

module.exports = router;
