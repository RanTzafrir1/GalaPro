const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema({
  id: { type: Number },
  firstName: { type: String },
  lastName: { type: String },
  sliderValue: { type: Number },
});

module.exports = mongoose.model('User', userModel);
