const express = require("express");
const signupRoute = express.Router();

const {
    newUser,
} = require("../controllers/signup");

signupRoute.post("/signup", newUser);


module.exports = signupRoute;