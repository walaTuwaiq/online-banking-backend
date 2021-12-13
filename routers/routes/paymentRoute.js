const express = require("express");
const paymentRoute = express.Router();

const { paymentReceipt, userPayments } = require("../controllers/payment");
const { authentication } = require("../middleware/authentication");

// paymentRoute.get("/users", getUsers);
// paymentRoute.get("/user-data", authentication, userData);
paymentRoute.post("/payment", authentication, paymentReceipt);
paymentRoute.get("/payments", authentication, userPayments);
// paymentRoute.get("/wallet", getAllWallet);

module.exports = paymentRoute;
