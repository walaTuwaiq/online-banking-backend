const userModel = require("../../db/models/userModel");
const cardModel = require("../../db/models/cardModel");
const transactionModel = require("../../db/models/transactionModel");
const paymentModel = require("../../db/models/paymentModel");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  const userId = req.token.userId;

  try {
    const checkUser = await userModel.findOne({ _id: userId });

    if (checkUser.isAdmin) {
      const users = await userModel.find({});
      res.status(200).json(users);
    } else {
      res.status(403).json("YOU'RE NOT ADMIN");
    }
  } catch (error) {
    res.send("error");
  }
};

const userData = async (req, res) => {
  const userId = req.token.userId;
  try {
    const user = await userModel
      .findOne({ _id: userId })
      .select(
        "email userName fullName lastSeen dateOfBirth nationalId history isAdmin"
      );
    const userCards = await cardModel.find({ userId });
    res.status(200).json({ userCards, user });
  } catch (error) {
    res.send(error);
  }
};

const getUserHistory = async (req, res) => {
  const userId = req.token.userId;
  try {
    const cardUser = await cardModel.findOne({ userId });
    const transactionsUser = await transactionModel
      .find({
        cardId: cardUser._id,
      })
      .populate("cardId");
    const paymentsUser = await paymentModel
      .find({ cardId: cardUser._id })
      .populate("cardId");
    res.status(200).json({ paymentsUser, transactionsUser });
  } catch (error) {
    res.send("error here");
  }
};

const getFullPaymentById = async (req, res) => {
  const id = req.params.id;
  const userId = req.token.userId;
  try {
    const cardUser = await cardModel.findOne({ userId });
    const paymentUser = await paymentModel
      .findOne({ _id: id })
      .populate("cardId");
    res.status(200).json(paymentUser);
  } catch (error) {
    res.send("error here");
  }
};

const getFullTransactionById = async (req, res) => {
  const id = req.params.id;
  const userId = req.token.userId;
  try {
    const transactionUser = await transactionModel
      .findOne({ _id: id })
      .populate("cardId");
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
        "email userName fullName lastSeen dateOfBirth nationalId history isAdmin"
      );

    const userCards = await cardModel.find({ userId });
    res.status(200).json({ userCards, user });
  } catch (error) {
    res.send(error);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.token.userId;
  const id = req.params.id;

  try {
    const user = await userModel.findOne({ _id: userId });

    if (user.isAdmin) {
      const account = await userModel.findOneAndDelete({ _id: id });
      const card = await cardModel.findOneAndUpdate(
        { userId: id },
        { isActive: false }
      );
      const users = await userModel.find({});
      res.status(200).json(users);
    } else {
      res.status(403).json("You Are Not Admin!");
    }
  } catch (error) {
    res.send("error");
  }
};

const checkEmail = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    res.status(200).json("Found");
  } else {
    res.send("not found");
  }
};

const resetPass = async (req, res) => {
  let { password, email } = req.body;
  const user = await userModel.findOne({ email });

  if (user) {
    password = await bcrypt.hash(password, 10);
    const updatePass = await userModel.findOneAndUpdate(
      { email },
      { password },
      { new: true }
    );
    res.status(200).json("successfully");
  } else {
    res.status(403).send("You are don't have account");
  }
};

module.exports = {
  getUsers,
  userData,
  getUserHistory,
  getFullPaymentById,
  getFullTransactionById,
  updateUserData,
  deleteUser,
  checkEmail,
  resetPass,
};
