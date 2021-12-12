// require("../../db/db");
const userModel = require("../../db/models/userModel");
// const courseModel = require("../../db/models/courseModel")
const bcrypt = require("bcrypt");

const newUser = async (req, res) => {
  let { userName, fullName, password, dateOfBirth, nationalId } = req.body;

  try {
    const checkUser = await userModel.find({ nationalId });
    if (checkUser.length == 0) {
      password = await bcrypt.hash(password, 10);
      const newUserAccount = await new userModel({ userName, fullName, password, dateOfBirth, nationalId, history:[], isAdmin:false });
      const saving = await newUserAccount.save();
      res.status(201).json(newUserAccount);
    } else {
      res.status(201).send("You are already have account.");
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = { newUser };
