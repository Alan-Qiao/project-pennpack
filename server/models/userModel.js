const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const config = require('../config').get(process.env.NODE_ENV);
// const salt=10;

// const userSchema = new Schema({
//  token: { type: String },
//  email: { type: String,  required: true, unique: true },
//  username: { type: String,  required: true, unique: false },
//  password: { type: String,  required: true, unique: false  },
//  passwordResetToken: { type: String},
//  passwordResetExpires: { type: Date},
//  profilePictureURL: { type: String, required: false },
//  deactivated: { type: Boolean, default: false},
//  blockedUsers: [String], // userIds
//  followedUsers: [String], // userIds
//     chats: [ String ], // messageIds
// }, { timestamps: true, collection: 'users'});
// // TODO: CHANGE THIS BACK AFTER MERGE

// //pre function to hash password when user is saved into data base
// userSchema.pre('save',function(next){
//     var user=this;

//     if(user.isModified('password')){
//         bcrypt.genSalt(salt,function(err,salt){
//             if(err)return next(err);

//             bcrypt.hash(user.password,salt,function(err,hash){
//                 if(err) return next(err);
//                 user.password=hash;
//                 next();
//             })

//         })
//     }
//     else{
//       next();
//     }
// });

// // check whether entered password is the same as what is stored in the data base
// userSchema.methods.comparepassword=function(password,cb){
//     bcrypt.compare(password,this.password,function(err,isMatch){
//         if(err) return cb(next);
//         cb(null,isMatch);
//     });
// }

// // generate jwt token
// userSchema.methods.generateToken=function(cb){
//     var user =this;
//     var token=jwt.sign(user._id.toHexString(),confiq.SECRET);

//     user.token=token;
//     user.save(function(err,user){
//         if(err) return cb(err);
//         cb(null,user);
//     })
// }

// // find by token
// userSchema.statics.findByToken=function(token,cb){
//     var user=this;
//     jwt.verify(token,confiq.SECRET,function(err,decode){
//         user.findOne({"_id": decode, "token":token},function(err,user){
//             if(err) return cb(err);
//             cb(null,user);
//         })
//     })
// };

// // delete token when a user logs out
// userSchema.methods.deleteToken=function(token,cb){
//     var user=this;

//     user.update({$unset : {token :1}},function(err,user){
//         if(err) return cb(err);
//         cb(null,user);
//     })
// }

// // https://www.youtube.com/watch?v=B0LI7Oc7C4A
// userSchema.methods.createPasswordResetToken = function() {
// 	const resetToken = crypto.randomBytes(32).toString('hex')

// 	this.passwordResetToken = crypto
// 		.createHash('sha256')
// 		.update(resetToken)
// 		.digest('hex')
	
// 	// password expires after 10 minutes
// 	this.passwordResetExpires = Date.now() + 10 * 60 * 1000

// 	return resetToken
// }

// const User = mongoose.model('User', userSchema)

// module.exports = User;