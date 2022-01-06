const paymentModel = require("../../db/models/paymentModel");
const userModel = require("../../db/models/userModel");
const cardModel = require("../../db/models/cardModel");

const userPayments = async (req, res) => {
  const userId = req.token.userId;
  const cardUser = await cardModel.findOne({ userId });
  const receiptsUser = await paymentModel.find({ cardId: cardUser._id });
  res.status(200).json(receiptsUser);
};

const paymentReceipt = async (req, res) => {
  const { to, amount } = req.body;
  const userId = req.token.userId;

  try {
    const cardUser = await cardModel.findOne({ userId });

    if (cardUser.balance >= amount) {
      const newReceipt = new paymentModel({
        from: cardUser._id,
        to,
        amount,
        cardId: cardUser._id,
      });
      const saveReceipt = await newReceipt.save();
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
    res.send("error here");
  }
};

module.exports = { paymentReceipt, userPayments };
