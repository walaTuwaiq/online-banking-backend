const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  lastLogIn: { type: String },
  dateOfBirth: { type: String, required: true },
  nationalId: { type: Number, required: true, unique: true },
  nationality: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: "paymentModel" }],
});

module.exports = mongoose.model("userModel", userModel);
