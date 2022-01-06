const mongoose = require("mongoose");

const verificationModel = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
});

module.exports = mongoose.model("verificationModel", verificationModel);
