const express = require("express");
const socketRoute = express.Router();

const {
  chatMessage,
  chatMessageToAdmin,
  messagesById,
  messagesToAdmin,
} = require("../controllers/socket");
const { authentication } = require("../middleware/authentication");

socketRoute.post("/send-message-chat", authentication, chatMessage);
socketRoute.post("/send-message-admin-chat", authentication, chatMessageToAdmin);
socketRoute.get("/chat-messages", authentication, messagesById);
socketRoute.get("/chat-messages-admin/:id", authentication, messagesToAdmin);

module.exports = socketRoute;
