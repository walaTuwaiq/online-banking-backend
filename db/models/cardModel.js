const mongoose = require("mongoose");

const cardModel = new mongoose.Schema({
  ibanNumber: { type: Number, required: true, unique: true },
  isActive: { type: Boolean, required: true },
  balance: { type: Number, required: true },
  expiredDate: {
    type: Date,
    default: () => new Date(+new Date() + 10 * 12 * 7 * 24 * 60 * 60 * 1000),
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
});

module.exports = mongoose.model("cardModel", cardModel);
