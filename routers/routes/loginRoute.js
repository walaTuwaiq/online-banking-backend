const express = require("express");
const loginRoute = express.Router();

const { login, checkToken } = require("../controllers/login");
const { authentication } = require("../middleware/authentication");

loginRoute.post("/login", login);
loginRoute.get("/login", authentication, checkToken);

module.exports = loginRoute;
