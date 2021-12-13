const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  lastSeen: { type: String },
  dateOfBirth: { type: String, required: true },
  nationalId: { type: Number, required: true, unique: true },
  history: [{ type: String }],
  isAdmin: { type: Boolean, required: true },
});

module.exports = mongoose.model("userModel", userModel);
