const userModel = require("../../db/models/userModel");
const cardModel = require("../../db/models/cardModel");
const bcrypt = require("bcrypt");

const newUser = async (req, res) => {
  let {
    email,
    userName,
    fullName,
    password,
    dateOfBirth,
    nationalId,
    nationality,
  } = req.body;

  try {
    const checkUser = await userModel.find({ nationalId });

    if (checkUser.length == 0) {
      password = await bcrypt.hash(password, 10);
      const newUserAccount = await new userModel({
        email,
        userName,
        fullName,
        password,
        dateOfBirth,
        nationalId,
        nationality,
        isAdmin: false,
        history: [],
      });

      if (newUserAccount.isAdmin == true) {
        const saveNewAccount = await newUserAccount.save();
        res.status(201).json("WELCOME ADMIN");
        return;
      }

      // to find last item:
      const findLastUser = await cardModel.findOne().sort({ _id: -1 }).limit(1);

      //if it's first user in my database:
      if (findLastUser == null) {
        const newCardToUser = await new cardModel({
          ibanNumber: 1000806030302001,
          isActive: true,
          balance: 0,
          userId: newUserAccount._id,
        });

        const saveNewCard = await newCardToUser.save();
        const saveNewAccount = await newUserAccount.save();
      } else {
        const newIban = findLastUser.ibanNumber + 1;
        // new Iban

        const newCardToUser = await new cardModel({
          ibanNumber: newIban,
          isActive: true,
          balance: 0,
          userId: newUserAccount._id,
        });
        const saveNewCard = await newCardToUser.save();
        const saveNewAccount = await newUserAccount.save();
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
