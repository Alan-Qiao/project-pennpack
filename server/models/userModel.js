const mongoose = require('mongoose');

const { Schema } = mongoose;

const bcrypt = require('bcrypt');
// const crypto = require('crypto');
// const config = require('../config').get(process.env.NODE_ENV); do we need this???

const userSchema = new Schema({
  name: { type: String, required: true, unique: false },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  classesEnrolled: { type: [mongoose.Types.ObjectId] },
  attempts: { type: Number, default: 0 },
  chats: { type: [mongoose.Types.ObjectId] },
  notesUploaded: { type: Number },
}, { timestamps: true, collection: 'Users' });

// hash password before saving
userSchema.pre('save', async function hashPass() {
  if (this.isModified('password')) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
});

// check whether entered password is the same as what is stored in the data base
userSchema.methods.checkPassword = function unhashPass(password, cb) {
  bcrypt.compare(password, this.password, (err, isRight) => {
    if (err) {
      cb(err);
    } else {
      cb(null, isRight);
    }
  });
};

// userSchema.methods.createPasswordResetToken = function() {
//   const resetToken = crypto.randomBytes(32).toString('hex')

//   this.passwordResetToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex')
// // password expires after 10 minutes
//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000

//   return resetToken
// }

const User = mongoose.model('User', userSchema);

module.exports = User;
