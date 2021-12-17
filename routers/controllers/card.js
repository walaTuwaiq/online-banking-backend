const cardModel = require("../../db/models/cardModel");
const userModel = require("../../db/models/userModel");

const getCards = (req, res) => {
    cardModel
    .find({}).populate("userId")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.send(error);
    });
};

const getCardByUserId = async(req, res) => {
  const userId = req.token.userId

  try {
    // console.log(userId)
    const user = await userModel.findOne({_id:userId}).select("userName fullName dateOfBirth isAdmin")
    // console.log(user)
    
    const card = await cardModel.find({userId}).select("ibanNumber isActive expiredDate")
    // console.log(card)

    res.status(200).json({user,card})
  } catch (error) {
    res.send("error here")
  }
  
};

const getIbanCards = (req, res) => {
  cardModel
  .find({}).select("ibanNumber")
  .then((result) => {
    res.status(200).json(result);
  })
  .catch((error) => {
    res.send(error);
  });
};


module.exports = { getCards, getIbanCards, getCardByUserId };
