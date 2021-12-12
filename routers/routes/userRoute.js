const express = require("express");
const userRoute = express.Router();

const {
    getUsers,
} = require("../controllers/user");

userRoute.get("/users", getUsers);


module.exports = userRoute;