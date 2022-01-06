const express = require("express");
const userRoute = express.Router();

const {
  getUsers,
  userData,
  getUserHistory,
  getFullPaymentById,
  getFullTransactionById,
  updateUserData,
  deleteUser,
  checkEmail,
  resetPass,
} = require("../controllers/user");
const { authentication } = require("../middleware/authentication");

userRoute.get("/users", authentication, getUsers);
userRoute.put("/update-data", authentication, updateUserData);
userRoute.delete("/remove-user/:id", authentication, deleteUser);

userRoute.get("/user-data", authentication, userData);
userRoute.get("/history", authentication, getUserHistory);
userRoute.get("/full-data-payment/:id", authentication, getFullPaymentById);
userRoute.get(
  "/full-data-transaction/:id",
  authentication,
  getFullTransactionById
);
userRoute.post("/check-email", checkEmail);
userRoute.put("/re-pass", resetPass);

module.exports = userRoute;
