const mongoose = require("mongoose");

const walletModel = new mongoose.Schema({
  balance: { type: Number, required: true},
  transfer:[{type: String}],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },

  // cardId:{type: mongoose.Schema.Types.ObjectId, ref: "cardModel"},
  // paymentId:{type: mongoose.Schema.Types.ObjectId, ref: "paymentModel"},
});

module.exports = mongoose.model("walletModel", walletModel);
