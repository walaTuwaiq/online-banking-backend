// require("../../db/db");
const userModel = require("../../db/models/userModel");
const cardModel = require("../../db/models/cardModel")
// const courseModel = require("../../db/models/courseModel")
const bcrypt = require("bcrypt");
const { findOneAndUpdate } = require("../../db/models/userModel");

const newUser = async (req, res) => {
  let { userName, fullName, password, dateOfBirth, nationalId } = req.body;

  try {
    const checkUser = await userModel.find({ nationalId });
    if (checkUser.length == 0) {
      password = await bcrypt.hash(password, 10);
      const newUserAccount = await new userModel({ userName, fullName, password, dateOfBirth, nationalId, history:[], isAdmin:false });
      const saveNewAccount = await newUserAccount.save();
      
      // const newWalletToUser = await new cardModel({balance:0.00,transfer:[],userId:saveNewAccount._id})
      // const saveNewWallet = await newWalletToUser.save();

      const findLastUser = await cardModel.findOne().sort({ _id: -1 }).limit(1)
      if(findLastUser == null){
        const newCardToUser = await new cardModel({ibanNumber:1000806030302001, isActive: true, balance:0, userId: saveNewAccount._id})
        const saveNewCard = await newCardToUser.save();
      }else{
        const newIban = findLastUser.ibanNumber+1
        const newCardToUser = await new cardModel({ibanNumber:newIban, isActive: true, balance:0, userId: saveNewAccount._id})
        const saveNewCard = await newCardToUser.save();
      }
      res.status(201).json(newUserAccount);
    } else {
      res.send("You are already have account.");
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = { newUser };
