const userModel = require("../../db/models/userModel");
const cardModel = require("../../db/models/cardModel");
const transactionModel = require("../../db/models/transactionModel");
const paymentModel = require("../../db/models/paymentModel");
const testModel = require("../../db/models/TestModel");

const getUsers = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.send(error);
    });
};

const userData = async (req, res) => {
  const userId = req.token.userId;
  try {
    const user = await userModel
      .findOne({ _id: userId })
      .select(
        "userName fullName lastSeen dateOfBirth nationalId history isAdmin"
      );
    const userCards = await cardModel.find({ userId });
    res.status(200).json({ userCards, user });
  } catch (error) {
    res.send(error);
  }
};

const addBalance = async (req, res) => {
  const { newBalance } = req.body;
  const userId = req.token.userId;
  try {
    const user = await cardModel.findOne({ userId });
    const sumBlanace = user.balance + newBalance;
    const updateWallet = await cardModel.findOneAndUpdate(
      { userId },
      { balance: sumBlanace },
      { new: true }
    );
    res.status(201).json(user);
  } catch (error) {
    res.send(error);
  }
};

const getUserHistory = async (req, res) => {
  const userId = req.token.userId;
  try {
    const cardUser = await cardModel.findOne({ userId });
    // console.log(cardUser);

    const transactionsUser = await transactionModel
      .find({
        cardId: cardUser._id,
      })
      .populate("cardId");
    // console.log(transactionsUser);

    const paymentsUser = await paymentModel
      .find({ cardId: cardUser._id })
      .populate("cardId");
    // console.log(paymentsUser);

    res.status(200).json({ paymentsUser, transactionsUser });
  } catch (error) {
    res.send("error here");
  }
};

const getFullPaymentById = async (req, res) => {
  const id = req.params.id;
  // const { id } = req.params.id;
  const userId = req.token.userId;
  try {
    const cardUser = await cardModel.findOne({ userId });
    // console.log(cardUser);

    // const transactionsUser = await transactionModel
    //   .find({
    //     cardId: cardUser._id,
    //   })
    //   .populate("cardId");
    // console.log(transactionsUser);

    const paymentUser = await paymentModel
      .findOne({ _id: id })
      .populate("cardId");
    // console.log(paymentsUser);

    res.status(200).json(paymentUser);
  } catch (error) {
    res.send("error here");
  }
};

const getFullTransactionById = async (req, res) => {
  const id = req.params.id;
  // const { id } = req.params.id;
  const userId = req.token.userId;
  try {
    // const cardUser = await cardModel.findOne({ userId });
    // console.log(cardUser);

    // const transactionsUser = await transactionModel
    //   .find({
    //     cardId: cardUser._id,
    //   })
    //   .populate("cardId");
    // console.log(transactionsUser);

    const transactionUser = await transactionModel
      .findOne({ _id: id })
      .populate("cardId");
    // console.log(paymentsUser);

    res.status(200).json(transactionUser);
  } catch (error) {
    res.send("error here");
  }
};

const updateUserData = async (req, res) => {
  const { userName } = req.body;
  const userId = req.token.userId;
  try {
    const updateData = await userModel.findOneAndUpdate(
      { _id: userId },
      { userName }
    );

    const user = await userModel
      .findOne({ _id: userId })
      .select(
        "userName fullName lastSeen dateOfBirth nationalId history isAdmin"
      );

    const userCards = await cardModel.find({ userId });
    res.status(200).json({ userCards, user });
  } catch (error) {
    res.send(error);
  }
};

const test = (req, res) => {
  const testing = testModel.find({});
  res.status(200).json(testing);
};

const testing = async (req, res) => {
  const { name } = req.body;
  console.log(name);
  try {
    const aa = new testModel({ name});
    // console.log(aa,"neeew");

    const bb = await aa.save();
    // console.log(bb,"nettt");

    res.status(200).json(bb);
  } catch (error) {
    res.send("errorrr")
  }
};

module.exports = {
  getUsers,
  userData,
  addBalance,
  getUserHistory,
  getFullPaymentById,
  getFullTransactionById,
  updateUserData,
  test,
  testing,
};
