const mongoose = require("mongoose");

const paymentModel = new mongoose.Schema({
  date: { type: String, required: true},
  from: { type: String, required: true},
  to: { type: String, required: true},
  walletId: { type: mongoose.Schema.Types.ObjectId, ref: "walletModel" },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: "cardModel" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
});

module.exports = mongoose.model("paymentModel", paymentModel);
