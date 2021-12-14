const express = require("express");
const cardRoute = express.Router();

const { getCards,getIbanCards } = require("../controllers/card");
const { authentication } = require("../middleware/authentication");

cardRoute.get("/cards", getCards);
cardRoute.get("/iban-cards", getIbanCards);
// cardRoute.get("/user-data", authentication, userData);

module.exports = cardRoute;
