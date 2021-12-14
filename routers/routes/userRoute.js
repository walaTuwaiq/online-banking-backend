const express = require("express");
const userRoute = express.Router();

const { getUsers, userData,addBalance, getUserHistory } = require("../controllers/user");
const { authentication } = require("../middleware/authentication");

userRoute.get("/users", getUsers);
userRoute.get("/user-data", authentication, userData);
userRoute.post("/add-balance", authentication, addBalance);
userRoute.get("/history", authentication, getUserHistory);

module.exports = userRoute;
