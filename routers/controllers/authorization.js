const authorizationModel = require("../../db/models/authorizationModel");

const getAuthorizations = async (req, res) => {
  const userId = req.token.userId;

  const authorizations = authorizationModel.find({});
  res.status(200).json(authorizations);
};

const getAuthorizationUser = async (req, res) => {
  const userId = req.token.userId;

  const authorizations = await authorizationModel.find({ to: { $in: userId } });
  res.status(200).json(authorizations);
};

const createAuthorization = async (req, res) => {
  const userId = req.token.userId;
  const { to, highestAmount } = req.body;
  // console.log(userId,"userId");
  // console.log(to,"to");
  // console.log(highestAmount,"highestAmount");

  try {
    const check = await authorizationModel.findOne({ from: userId });
    // console.log(check,"check");

    if (check) {
      const checkToArr = await authorizationModel.find({
        from: userId,
        to: { $in: to },
      });
      // console.log(checkToArr,"checkToArr");
      if (checkToArr.length > 0) {
        res.send("You're already have authorization!");
      } else {
        const addAuth = await authorizationModel.findOneAndUpdate(
          { from: userId },
          {
            $push: { to },
          },
          { new: true }
        );
        res.status(200).json(addAuth);
      }
    } else {
      const authorization = await new authorizationModel({
        from: userId,
        to,
        highestAmount,
      });
      const authorizationSave = await authorization.save();
      res.status(201).json(authorizationSave);
    }
  } catch (error) {
    res.send("error");
  }
};

module.exports = {
  getAuthorizations,
  createAuthorization,
  getAuthorizationUser,
};
