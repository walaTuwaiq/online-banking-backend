const userModel = require("../../db/models/userModel");
const chatModel = require("../../db/models/chatModel");

const chatMessage = async (req, res) => {
  const { userId, message, time, author } = req.body;
  // console.log(userId,message,time,"data");
  try {
    const userChats = await userModel.findOne({ _id: userId });
    // console.log(userChats,"userChats");

    if (userChats) {
      const chat = await new chatModel({ from: userId, message, time, author });
      const saveNewChat = await chat.save();
      res.status(201).json(saveNewChat);
    }
  } catch (error) {
    res.send("error");
  }
};

const chatMessageToAdmin = async (req, res) => {
  const { userId, message, time, author, to } = req.body;
  // console.log(userId,message,time,"data");
  try {
    const userChats = await userModel.findOne({ _id: userId });
    // console.log(userChats,"userChats");

    if (userChats) {
      const chat = await new chatModel({
        from: userId,
        message,
        time,
        author,
        to,
      });
      const saveNewChat = await chat.save();
      res.status(201).json(saveNewChat);
    }
  } catch (error) {
    res.send("error");
  }
};

const messagesById = async (req, res) => {
  const userId = req.token.userId;
  // console.log(userId,"data");
  try {
    const userChats = await chatModel.find({ from: userId });
    const adminChats = await chatModel.find({ to: userId });
    // console.log(userChats,"userChats");
    // console.log(userChats,"userChats");
    res.status(200).json({ userChats, adminChats });
  } catch (error) {
    res.send("error");
  }
};

const messagesToAdmin = async (req, res) => {
  const userId = req.token.userId;
  const id = req.params.id;
  try {
    const user = await userModel.findOne({ _id: userId });
    if (user.isAdmin) {
      const userChats = await chatModel.find({ from: id }).sort({ time: 1 });
      const adminChats = await chatModel
        .find({ from: userId })
        .sort({ time: 1 });
      res.status(200).json({ userChats, adminChats });
    } else {
      res.status(403).json("You're not an admin!");
    }
  } catch (error) {
    res.send("error");
  }
};

module.exports = {
  chatMessage,
  chatMessageToAdmin,
  messagesById,
  messagesToAdmin,
};
