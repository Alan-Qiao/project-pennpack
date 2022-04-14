const User = require('../models/userModel')
const express = require('express');
const router = express.Router()

// router.get('/', async (req, res) => {
// 	let token = req.cookies.auth;
// 	const { email, password } = req.query
//   User.findByToken(token, (err, user) => {
//     if (err) {
//       return res(err);
//     }
//     if (user) {
//       return res.status(400).json({
//         error: true,
//         message: "You are already logged in"
//       });
//     } else {
//       User.findOne({email: email}, (err, user)  => {
//         if (!user) {
//           return res.json({ isAuth: false, message: ' Auth failed, email not found' });
//         }

//         user.comparepassword(req.query.password, (err, isMatch) => {
//           if (!isMatch) {
//             return res.json({ isAuth: false, message: "password doesn't match" });
//           }

//           user.generateToken(async (err, user) => {
//             if (err) {
//               return res.status(400).send(err);
//             }

// 						// Deactivated account will automatically become active again if loggin in
// 						user.deactivated = false;
// 						await user.save()

//             res.status(200).cookie('auth', user.token).json({
//               isAuth: true,
//               id: user._id,
//               username: user.username
//             });
//           });
//         });
//       });
//     }
//   });
// })

// module.exports = router