const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  status: String,
  themeColor: String,
  profilePicture: String
});

module.exports = mongoose.model('User', userSchema);