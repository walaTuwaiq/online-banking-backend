const express = require("express");
const transactionRoute = express.Router();

const {
  userTransaction,
  transactionReceipt,
  allTransactions,
  allTransactionsInOneWeek,
} = require("../controllers/transaction");
const { authentication } = require("../middleware/authentication");

transactionRoute.post("/transaction", authentication, transactionReceipt);
transactionRoute.get("/transactions", authentication, userTransaction);
transactionRoute.get("/all-transactions", allTransactions);
transactionRoute.get("/transactions-in-week", allTransactionsInOneWeek);

module.exports = transactionRoute;
