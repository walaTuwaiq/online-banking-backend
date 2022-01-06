const express = require("express");
const paymentRoute = express.Router();

const { paymentReceipt, userPayments } = require("../controllers/payment");
const { authentication } = require("../middleware/authentication");

paymentRoute.post("/payment", authentication, paymentReceipt);
paymentRoute.get("/payments", authentication, userPayments);

module.exports = paymentRoute;
