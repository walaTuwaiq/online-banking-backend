const mongoose = require("mongoose");

const chatModel = new mongoose.Schema({
  // from: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
  // to: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
  // author: { type: String },
  // message: { type: String },
  // time: { type: String },
  // date: { type: Date, default: Date.now },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
  messages: [
    {
      // to: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
      author: { type: String },
      message: { type: String },
      time: { type: String },
    },
  ],
});

module.exports = mongoose.model("chatModel", chatModel);
