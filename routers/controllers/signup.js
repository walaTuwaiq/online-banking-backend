const userModel = require("../../db/models/userModel");
const cardModel = require("../../db/models/cardModel");
const bcrypt = require("bcrypt");

const newUser = async (req, res) => {
  let { userName, fullName, password, dateOfBirth, nationalId, nationality } =
    req.body;

  try {
    const checkUser = await userModel.find({ nationalId });
    if (checkUser.length == 0) {
      password = await bcrypt.hash(password, 10);
      const newUserAccount = await new userModel({
        userName,
        fullName,
        password,
        dateOfBirth,
        nationalId,
        nationality,
        history: [],
        isAdmin: false,
      });
      // console.log(newUserAccount);
      //create new user

      // console.log(saveNewAccount,"saveNewAccount");
      
      // to find last item:
      const findLastUser = await cardModel.findOne().sort({ _id: -1 }).limit(1);
      // console.log(findLastUser,"findLastUser");
      //null
      
      //if it's first user in my database:
      if (findLastUser == null) {
        // console.log("null statemnt");

        const newCardToUser = await new cardModel({
          ibanNumber: 1000806030302001,
          isActive: true,
          balance: 0,
          userId: newUserAccount._id,
        });
        // console.log(newCardToUser,"newCardToUser");
        
        const saveNewCard = await newCardToUser.save();
        const saveNewAccount = await newUserAccount.save();
        // console.log(saveNewCard,"saveNewCard");


      } else {
        const newIban = findLastUser.ibanNumber + 1;
        // console.log(newIban,"newIban");
        // new Iban

        const newCardToUser = await new cardModel({
          ibanNumber: newIban,
          isActive: true,
          balance: 0,
          userId: newUserAccount._id,
        });
        const saveNewCard = await newCardToUser.save();
        const saveNewAccount = await newUserAccount.save();
        console.log(saveNewCard,"saveNewCard");
        console.log(saveNewAccount,"saveNewAccount");
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
