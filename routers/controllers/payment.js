const paymentModel = require("../../db/models/paymentModel");
const userModel = require("../../db/models/userModel")


const paymentReceipt = async(req, res) => {
  const { date, from, to, walletId, cardId } = req.body;
  const userId = req.token.userId

  try {
      const user = await userModel
    const newReceipt = await new paymentModel({date, from, to, walletId, cardId})
    
  } catch (error) {
      
  }
};

module.exports = { getCards };
