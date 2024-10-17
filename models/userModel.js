const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  profession: { type: [String], required: true },
  maritalStatus: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('User', userSchema);
