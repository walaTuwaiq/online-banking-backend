const mongoose = require("mongoose");

const verificationModel = new mongoose.Schema({
  // date: { type: String, required: true },
  email: { type: String, required: true },
  code: { type: String, required: true },
});

module.exports = mongoose.model("verificationModel", verificationModel);
