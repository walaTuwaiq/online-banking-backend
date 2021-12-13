const paymentModel = require("../../db/models/paymentModel");
const userModel = require("../../db/models/userModel");
const cardModel = require("../../db/models/cardModel");
const transactionModel = require("../../db/models/transactionModel")

const userTransaction = async (req, res) => {
  const userId = req.token.userId
  const cardUser = await cardModel.findOne({userId})
  const receiptsUser = await transactionModel.find({cardId: cardUser._id})
  res.status(200).json(receiptsUser)
};

const transactionReceipt = async (req, res) => {
  const { date, to, amount } = req.body;
  const userId = req.token.userId;

  try {
    const user = await cardModel.findOne({ userId });
    console.log(user);

    const newReceipt = new paymentModel({
      date,
      from: user._id,
      to,
      amount,
      cardId: user._id,
    });
    // console.log(newReceipt);

    const saveReceipt = await newReceipt.save();
    // console.log(saveReceipt);

    if (user.balance >= amount) {
      const updateBlanace = user.balance - amount;
      const updateWallet = await cardModel.findOneAndUpdate(
        { userId },
        { balance: updateBlanace },
        { new: true }
      );
      res.status(201).json(saveReceipt);
    } else {
      res.status(403).json("You're don't have enough balance!");
    }
  } catch (error) {
    // console.log("www");
    res.send("error here");
  }
};

module.exports = { paymentReceipt, userPayments };
