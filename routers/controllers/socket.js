const userModel = require("../../db/models/userModel");
const chatModel = require("../../db/models/chatModel");

// const chatMessage = async (req, res) => {
//   const { userId, message, time, author } = req.body;
//   // console.log(userId,message,time,"data");
//   try {
//     const userChats = await userModel.findOne({ _id: userId });
//     // console.log(userChats,"userChats");

//     if (userChats) {
//       const chat = await new chatModel({ from: userId, message, time, author });
//       const saveNewChat = await chat.save();
//       res.status(201).json(saveNewChat);
//     }
//   } catch (error) {
//     res.send("error");
//   }
// };

// room: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
//   messages: [
//     {
//       to: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
//       author: { type: String },
//       message: [{ type: String }],
//       time: { type: String },
//     },
//   ],

//to User
const chatMessage = async (req, res) => {
  const { userId, message, time, author } = req.body;
  // console.log(userId,message,time,"data");
  try {
    const findChat = await chatModel.findOne({ room: userId });
    // console.log(findChat, "findChat");
    if (findChat) {
      // console.log("updateeedd");
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
      // console.log(chat, "chatt3");
      res.status(201).json(chat.messages);
    } else {
      const chat = await new chatModel({
        room: userId,
        messages: { author, message, time },
      });
      const saveNewChat = await chat.save();
      // console.log(saveNewChat, "saveNewChat");
      res.status(201).json(saveNewChat.messages);
    }
  } catch (error) {
    res.send("error");
  }
};

//to User
const messagesById = async (req, res) => {
  const userId = req.token.userId;
  // console.log(userId,"data");
  try {
    const chats = await chatModel.findOne({ room: userId });
    // const admin = await chatModel.find({ to: userId });
    // const userChats = user.filter((elem) => {
    //   return (
    //     elem.date.getDate() == new Date(Date.now()).getDate() &&
    //     elem.date.getMonth() == new Date(Date.now()).getMonth() &&
    //     elem.date.getFullYear() == new Date(Date.now()).getFullYear()
    //   );
    // });
    // const adminChats = admin.filter((elem) => {
    //   return (
    //     elem.date.getDate() == new Date(Date.now()).getDate() &&
    //     elem.date.getMonth() == new Date(Date.now()).getMonth() &&
    //     elem.date.getFullYear() == new Date(Date.now()).getFullYear()
    //   );
    // });
    // console.log({ userChats, adminChats }, "{ userChats, adminChats }");
    res.status(200).json(chats.messages);
  } catch (error) {
    res.send("error");
  }
};

//to Admin
const chatMessageToAdmin = async (req, res) => {
  const { userId, message, time, author } = req.body;
  // console.log(userId,message,time,"data");
  try {
    const userChats = await chatModel.findOne({ room: userId });
    // console.log(userChats,"userChats");

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
      const chats = await new chatModel({
        from: userId,
        message,
        time,
        author,
        to,
      });
      const saveNewChat = await chats.save();
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
      // const admin = await chatModel.find({ from: userId });
      // const userChats = user.filter((elem) => {
      //   return (
      //     elem.date.getDate() == new Date(Date.now()).getDate() &&
      //     elem.date.getMonth() == new Date(Date.now()).getMonth() &&
      //     elem.date.getFullYear() == new Date(Date.now()).getFullYear()
      //   );
      // });
      // const adminChats = admin.filter((elem) => {
      //   return (
      //     elem.date.getDate() == new Date(Date.now()).getDate() &&
      //     elem.date.getMonth() == new Date(Date.now()).getMonth() &&
      //     elem.date.getFullYear() == new Date(Date.now()).getFullYear()
      //   );
      // });

      res.status(200).json(chats.messages);
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
