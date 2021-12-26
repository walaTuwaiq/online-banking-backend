const mongoose = require("mongoose");

const authorizationModel = new mongoose.Schema({
  // date: { type: String, required: true },
  date: { type: Date, default: Date.now },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
  to: [{ type: mongoose.Schema.Types.ObjectId, ref: "userModel" }],
  highestAmount: { type: Number },
});

module.exports = mongoose.model("authorizationModel", authorizationModel);
