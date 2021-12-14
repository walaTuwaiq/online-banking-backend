const express = require("express");
const transactionRoute = express.Router();

const {userTransaction, transactionReceipt} = require("../controllers/transaction");
const { authentication } = require("../middleware/authentication");

// paymentRoute.get("/users", getUsers);
// paymentRoute.get("/user-data", authentication, userData);
transactionRoute.post("/transaction", authentication, transactionReceipt);
transactionRoute.get("/transactions", authentication, userTransaction);
// paymentRoute.get("/wallet", getAllWallet);

module.exports = transactionRoute;
