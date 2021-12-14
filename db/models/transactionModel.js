const mongoose = require("mongoose");

const transactionModel = new mongoose.Schema({
  // date: { type: String, required: true },
  date: { type: Date, default: Date.now },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "cardModel" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "cardModel" },
  amount: { type: Number, required: true },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: "cardModel" },
});

module.exports = mongoose.model("transactionModel", transactionModel);
