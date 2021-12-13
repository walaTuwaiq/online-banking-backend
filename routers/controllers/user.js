const userModel = require("../../db/models/userModel");
const walletModel = require("../../db/models/walletModel")

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

const userData = async(req,res)=>{
  const userId = req.token.userId
  try {
    const userDate = await userModel.find({_id:userId}).select("userName fullName lastSeen dateOfBirth nationalId history isAdmin")
    res.status(200).json(userDate[0])
  } catch (error) {
    res.send(error)
  }
}

const addBalance = async(req,res)=>{
  const {newBalance} = req.body
  const userId = req.token.userId
  // console.log(newBalance);

  try {
    const user = await walletModel.findOne({userId})
    const sumBlanace = user.balance+newBalance
    const updateWallet = await walletModel.findOneAndUpdate({userId},{balance:sumBlanace},{new:true})
    // console.log(sumBlanace);
    // console.log(updateWallet);
    res.status(201).json(user)
  } catch (error) {
    res.send(error)
  }
}

module.exports = { getUsers, userData, addBalance };
