const mongoose = require("mongoose");

const cardModel = new mongoose.Schema({
  ibanNumber: { type: Number, required: true, unique: true },
  isActive: { type: Boolean, required: true},
  balance: { type: Number, required: true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
});

module.exports = mongoose.model("cardModel", cardModel);
