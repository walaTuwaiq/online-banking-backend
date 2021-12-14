const paymentModel = require("../../db/models/paymentModel");
const userModel = require("../../db/models/userModel");
const cardModel = require("../../db/models/cardModel");
const transactionModel = require("../../db/models/transactionModel");

const userTransaction = async (req, res) => {
  const userId = req.token.userId;
  const cardUser = await cardModel.findOne({ userId });
  const receiptsUser = await transactionModel.find({ cardId: cardUser._id });
  res.status(200).json(receiptsUser);
};

const transactionReceipt = async (req, res) => {
  const { to, amount } = req.body;
  const userId = req.token.userId;

  try {
    console.log(userId);
    const cardUser = await cardModel.findOne({ userId });
    // console.log("cardUser");

    if (cardUser.balance >= amount) {
      const newReceipt = new transactionModel({
        from: cardUser._id,
        to,
        amount,
        cardId: cardUser._id,
      });
      // console.log(newReceipt);


      const saveReceipt = await newReceipt.save();
      // console.log(saveReceipt);
      const updateBlanace = cardUser.balance - amount;
      const newBalanceValue = await cardModel.findOneAndUpdate(
        { userId },
        { balance: updateBlanace },
        { new: true }
      );
      // console.log(newBalanceValue);

      const recipientUser = await cardModel.findOne({ _id: to });
      console.log(recipientUser);

      const addBalanceTo = recipientUser.balance + amount;
      const recipientUserBalance = await cardModel.findOneAndUpdate(
        { _id: to },
        { balance: addBalanceTo },
        { new: true }
      );
      // console.log(recipientUserBalance);

      res.status(201).json(recipientUserBalance);
    } else {
      res.status(403).json("You're don't have enough balance!");
    }
  } catch (error) {
    // console.log("www");
    res.send("error here");
  }
};

module.exports = { userTransaction, transactionReceipt };
