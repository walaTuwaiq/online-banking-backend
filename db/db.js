const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL).then(
  () => {
    console.log("DB connected");
  },
  (err) => {
    console.log(err);
  }
);
