const express = require("express");
const userRoute = express.Router();

const { getUsers, userData, getUserHistory, getFullPaymentById, getFullTransactionById,updateUserData, deleteUser, test, testing } = require("../controllers/user");
const { authentication } = require("../middleware/authentication");

userRoute.get("/users", getUsers);
userRoute.get("/user-data", authentication, userData);
userRoute.get("/history", authentication, getUserHistory);
userRoute.get("/full-data-payment/:id", authentication, getFullPaymentById);
userRoute.get("/full-data-transaction/:id", authentication, getFullTransactionById);
userRoute.put("/update-data", authentication, updateUserData);
userRoute.get("/test", test);
userRoute.post("/test", testing);
userRoute.delete("/remove-user", authentication, deleteUser);


module.exports = userRoute;
