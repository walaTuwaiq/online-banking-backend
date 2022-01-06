const mongoose = require("mongoose");

const paymentModel = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "cardModel" },
  to: { type: String, required: true },
  amount: { type: Number, required: true },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: "cardModel" },
});

module.exports = mongoose.model("paymentModel", paymentModel);
