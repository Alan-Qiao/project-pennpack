const mongoose = require('mongoose');

const { Schema } = mongoose;

const classDaySchema = new Schema({
  classId: { type: mongoose.Types.ObjectId },
  date: { type: Date },
  type: { type: String, enum: ['Lecture', 'Recitation', 'Seminar'] },
  topic: { type: String },
  notes: { type: [mongoose.Types.ObjectId] },
});

const ClassDay = mongoose.model('ClassDay', classDaySchema);

module.exports = ClassDay;
