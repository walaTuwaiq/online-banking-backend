const mongoose = require("mongoose");

const paymentModel = new mongoose.Schema({
  // date: { type: String, required: true },
  date: { type: Date, default: Date.now },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "cardModel" },
  to: { type: String, required: true },
  amount: { type: Number, required: true },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: "cardModel" },
  // cardId: { type: mongoose.Schema.Types.ObjectId, ref: "cardModel" },
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
});

module.exports = mongoose.model("paymentModel", paymentModel);
