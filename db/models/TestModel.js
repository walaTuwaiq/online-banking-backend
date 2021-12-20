const mongoose = require("mongoose");

const testModel = new mongoose.Schema({
  // date: { type: String, required: true },
  name:{type:String},
  // date: { type: Date, default: Date.now },
  expiredDate: { type: Date, default: () => new Date(+new Date() + 10*12*7*24*60*60*1000)  },
});

module.exports = mongoose.model("testModel", testModel);
