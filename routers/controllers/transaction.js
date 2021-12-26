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
    // console.log(userId);
    // print correct user id

    const cardUser = await cardModel.findOne({ userId });
    // console.log(cardUser);
    // select correct card

    if (cardUser.balance >= amount) {
      const newReceipt = new transactionModel({
        from: cardUser._id,
        to,
        amount,
        cardId: cardUser._id,
      });
      // console.log(newReceipt);
      // create new transaction
      // must be buttom


      const saveReceipt = await newReceipt.save();
      
      const updateBlanace = cardUser.balance - amount;
      const newBalanceValue = await cardModel.findOneAndUpdate(
        { userId },
        { balance: updateBlanace },
        { new: true }
      );
      // console.log(newBalanceValue);
      // updated from mongoose compass

      const recipientUser = await cardModel.findOne({ _id: to });
      // console.log(recipientUser);
      // in "to" key assign card id, dont another user id

      const addBalanceTo = recipientUser.balance + amount;
      const recipientUserBalance = await cardModel.findOneAndUpdate(
        { _id: to },
        { balance: addBalanceTo },
        { new: true }
      );
      // console.log(recipientUserBalance);

      res.status(201).json(newBalanceValue);
    } else {
      res.status(403).json("You're don't have enough balance!");
    }
  } catch (error) {
    // console.log("www");
    res.send("error here");
  }
};

const allTransactions = async(req,res)=>{
  const transactios = await transactionModel.find({})
  res.status(200).json(transactios)
}

const allTransactionsInOneWeek = async(req,res)=>{
  const date = new Date()
  const thisDay = date.getDate()
  const thisMonth = date.getMonth()
  const thisYear = date.getFullYear()
  const fromDate= new Date (thisYear,thisMonth,thisDay-7)
  // console.log(date,"date");
  // console.log(fromDate,"fromDate");

  const transactios = await transactionModel.find({
    date:{
      $gte: fromDate,
      $lt: date
    }
  })
  // console.log(transactios.length,"transactios");
  res.status(200).json(transactios)
}

module.exports = { userTransaction, transactionReceipt, allTransactions,allTransactionsInOneWeek };
