const mongoose = require("mongoose");

const paymentModel = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  from: { type: String, required: true, unique: true },
  to: { type: String, required: true},
  toString: { type: mongoose.Schema.Types.ObjectId, ref: "walletModel" },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: "cardModel" },
});

module.exports = mongoose.model("paymentModel", paymentModel);
