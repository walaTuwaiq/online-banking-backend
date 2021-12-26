require("./db/db");
const express = require("express");
var cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());
/////////////////
// const courseRoute = require("./routers/routes/courseRoute")
// app.use(courseRoute)

const signUpRoute = require("./routers/routes/signupRoute")
app.use(signUpRoute)

const loginRoute = require("./routers/routes/loginRoute")
app.use(loginRoute)

const userRoute = require("./routers/routes/userRoute")
app.use(userRoute)

const cardRoute = require("./routers/routes/cardRoute")
app.use(cardRoute)

const paymentRoute = require("./routers/routes/paymentRoute")
app.use(paymentRoute)

const transactionRoute = require("./routers/routes/transactionRoute")
app.use(transactionRoute)

const authorizationRoute = require("./routers/routes/authorizationRoute")
app.use(authorizationRoute)


////////////

const Port = 5000;
app.listen(Port, () => {
  console.log("SERVER IS RUN!");
});
