const express = require("express");
const sendMsgRoute = express.Router();

const { sendEmailMsg, checkCode } = require("../controllers/SendMsg");

sendMsgRoute.post("/msg", sendEmailMsg);
sendMsgRoute.post("/check-msg", checkCode);

module.exports = sendMsgRoute;
