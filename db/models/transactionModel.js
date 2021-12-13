const mongoose = require("mongoose");

const transactionModel = new mongoose.Schema({
  date: { type: String, required: true },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
  amount: { type: Number, required: true },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: "cardModel" },
  // cardId: { type: mongoose.Schema.Types.ObjectId, ref: "cardModel" },
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
});

module.exports = mongoose.model("transactionModel", transactionModel);
