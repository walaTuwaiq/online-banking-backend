const paymentModel = require("../../db/models/paymentModel");
const userModel = require("../../db/models/userModel");
const cardModel = require("../../db/models/cardModel");

const userPayments = async (req, res) => {
  const userId = req.token.userId
  const cardUser = await cardModel.findOne({userId})
  const receiptsUser = await paymentModel.find({cardId: cardUser._id})
  res.status(200).json(receiptsUser)
};

const paymentReceipt = async (req, res) => {
  const { to, amount } = req.body;
  const userId = req.token.userId;

  // console.log(userId);
  try {
    const cardUser = await cardModel.findOne({ userId });
    // console.log(cardUser);
    
    if (cardUser.balance >= amount) {
      // const ibanCard = cardUser.ibanNumber
      const newReceipt = new paymentModel({
        from: cardUser._id,
        to,
        amount,
        cardId: cardUser._id,
      });
      // console.log(newReceipt);
  
      const saveReceipt = await newReceipt.save();
      // console.log(saveReceipt);

      const updateBlanace = cardUser.balance - amount;
      const updateCardBalance = await cardModel.findOneAndUpdate(
        { userId },
        { balance: updateBlanace },
        { new: true }
      );
      res.status(201).json(updateCardBalance);
    } else {
      res.status(403).json("You're don't have enough balance!");
    }
  } catch (error) {
    // console.log("www");
    res.send("error here");
  }
};

module.exports = { paymentReceipt, userPayments };
