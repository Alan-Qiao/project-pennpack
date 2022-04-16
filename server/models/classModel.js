const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema({
  className: { type: String },
  professor: { type: String },
  classDays: { type: [mongoose.Types.ObjectId] },
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
