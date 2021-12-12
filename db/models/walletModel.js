const mongoose = require("mongoose");

const walletModel = new mongoose.Schema({
  balance: { type: Number, required: true, unique: true },
  transfer:[{type: String}],
  cardId:{type: mongoose.Schema.Types.ObjectId, ref: "cardModel"},
  paymentId:{type: mongoose.Schema.Types.ObjectId, ref: "paymentModel"},
});

module.exports = mongoose.model("walletModel", walletModel);
