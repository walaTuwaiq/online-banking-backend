const cardModel = require("../../db/models/cardModel");
const userModel = require("../../db/models/userModel");

const getCards = async (req, res) => {
  const userId = req.token.userId;

  try {
    const checkAdmin = await userModel.findOne({ _id: userId });

    if (checkAdmin.isAdmin) {
      const cards = await cardModel.find({}).populate("userId","fullName");
      res.status(200).json(cards);
    }
  } catch (error) {
    res.send("error");
  }
};

const getCardByUserId = async (req, res) => {
  const userId = req.token.userId;

  try {
    const user = await userModel
      .findOne({ _id: userId })
      .select("email userName fullName dateOfBirth isAdmin");
    const card = await cardModel
      .find({ userId })
      .select("ibanNumber isActive expiredDate");
    res.status(200).json({ user, card });
  } catch (error) {
    res.send("error here");
  }
};

const getIbanCards = (req, res) => {
  cardModel
    .find({})
    .select("ibanNumber")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.send(error);
    });
};

const addBalance = async (req, res) => {
  const { newBalance, id } = req.body;
  const userId = req.token.userId;

  try {
    const checkAdmin = await userModel.findOne({ _id: userId });
    console.log(checkAdmin, "checkAdmin");

    if (checkAdmin.isAdmin) {
      const user = await cardModel.findOne({ _id: id });
      const sumBlanace = user.balance + newBalance;
      const updateBalance = await cardModel.findOneAndUpdate(
        { _id: id },
        { balance: sumBlanace },
        { new: true }
      );
      res.status(201).json(user);
    } else {
      res.status(403).json("DON'T HAVE ACCESS!");
    }
  } catch (error) {
    res.send("error");
  }
};

module.exports = { getCards, getIbanCards, getCardByUserId, addBalance };
