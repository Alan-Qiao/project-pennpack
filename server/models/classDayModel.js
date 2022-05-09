const mongoose = require('mongoose');

const { Schema } = mongoose;

const classDaySchema = new Schema({
  classId: { type: String },
  date: { type: Date },
  typeOfClass: { type: String },
  topic: { type: String },
  notes: { type: [mongoose.Types.ObjectId] },
});

const ClassDay = mongoose.model('ClassDay', classDaySchema);

module.exports = ClassDay;
