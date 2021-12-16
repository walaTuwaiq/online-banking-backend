const express = require("express");
const cardRoute = express.Router();

const { getCards,getIbanCards, getCardByUserId } = require("../controllers/card");
const { authentication } = require("../middleware/authentication");

cardRoute.get("/cards", getCards);
cardRoute.get("/iban-cards", getIbanCards);
// cardRoute.get("/user-data", authentication, userData);
cardRoute.get("/user-card",authentication, getCardByUserId);

module.exports = cardRoute;
