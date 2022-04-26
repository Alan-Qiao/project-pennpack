const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema({
  className: { type: Stringr, required: true, unique: true  },
  professor: { type: String, required: true, unique: false  },
  classDays: { type: [mongoose.Types.ObjectId] },
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
