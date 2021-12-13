const express = require("express");
const cardRoute = express.Router();

const { getCards } = require("../controllers/card");
const { authentication } = require("../middleware/authentication");

cardRoute.get("/cards", getCards);
// cardRoute.get("/user-data", authentication, userData);

module.exports = cardRoute;
