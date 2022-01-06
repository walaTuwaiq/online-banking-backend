const userModel = require("../../db/models/userModel");
const chatModel = require("../../db/models/chatModel");

//to User
const chatMessage = async (req, res) => {
  const { userId, message, time, author } = req.body;
  try {
    const findChat = await chatModel.findOne({ room: userId });
    if (findChat) {
      const chat = await chatModel.findOneAndUpdate(
        { room: userId },
        {
          $push: {
            messages: {
              author,
              message,
              time,
            },
          },
        }
      );
      res.status(201).json(chat.messages);
    } else {
      const chat = await new chatModel({
        room: userId,
        messages: { author, message, time },
      });
      const saveNewChat = await chat.save();
      console.log(saveNewChat.messages, "saveNewChat");
      res.status(201).json(saveNewChat.messages);
    }
  } catch (error) {
    res.send("error");
  }
};

//to User
const messagesById = async (req, res) => {
  const userId = req.token.userId;
  try {
    const chats = await chatModel.findOne({ room: userId });
    if (chats !== null) {
      res.status(200).json(chats.messages);
    } else {
      res.status(403).json("not found messages");
    }
  } catch (error) {
    res.send("error");
  }
};

//to Admin
const chatMessageToAdmin = async (req, res) => {
  const { userId, message, time, author } = req.body;
  try {
    const userChats = await chatModel.findOne({ room: userId });

    if (userChats) {
      const chats = await chatModel.findOneAndUpdate(
        { room: userId },
        {
          $push: {
            messages: {
              author,
              message,
              time,
            },
          },
        }
      );
      res.status(201).json(chats.messages);
    } else {
      const chat = await new chatModel({
        room: userId,
        messages: { author, message, time },
      });
      const saveNewChat = await chat.save();
      res.status(201).json(saveNewChat.messages);
    }
  } catch (error) {
    res.send("error");
  }
};

//to Admin
const messagesToAdmin = async (req, res) => {
  const userId = req.token.userId;
  const id = req.params.id;
  try {
    const user = await userModel.findOne({ _id: userId });
    if (user.isAdmin) {
      const chats = await chatModel.findOne({ room: id });
      res.status(200).json(chats.messages);
    } else {
      res.status(403).json("You're not an admin!");
    }
  } catch (error) {
    res.send("error");
  }
};

const adminChats = async (req, res) => {
  const userId = req.token.userId;
  try {
    const user = await userModel.findOne({ _id: userId });

    if (user.isAdmin) {
      const chats = await chatModel
        .find({})
        .populate("room", "fullName userName dateOfBirth nationalId");
      res.status(200).json(chats);
    } else {
      res.status(403).json("You're not an admin");
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  chatMessage,
  chatMessageToAdmin,
  messagesById,
  messagesToAdmin,
  adminChats,
};
