const express = require("express");
const cardRoute = express.Router();

const {
  getCards,
  getIbanCards,
  getCardByUserId,
  addBalance,
} = require("../controllers/card");
const { authentication } = require("../middleware/authentication");

cardRoute.get("/cards", authentication, getCards);
cardRoute.get("/iban-cards", getIbanCards);
cardRoute.post("/add-balance", authentication, addBalance);
cardRoute.get("/user-card", authentication, getCardByUserId);

module.exports = cardRoute;
