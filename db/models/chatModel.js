const mongoose = require("mongoose");

const chatModel = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
  author: { type: String },
  message: { type: String },
  time: { type: String },
});

module.exports = mongoose.model("chatModel", chatModel);
