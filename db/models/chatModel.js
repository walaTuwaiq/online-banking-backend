const mongoose = require("mongoose");

const chatModel = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
  messages: [
    {
      author: { type: String },
      message: { type: String },
      time: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("chatModel", chatModel);
