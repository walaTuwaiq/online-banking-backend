const express = require("express");
let cors = require("cors");
const socket = require("socket.io");
const app = express();
require("dotenv").config();
require("./db/db");

app.use(cors());
app.use(express.json());

/////////////////

const signUpRoute = require("./routers/routes/signupRoute");
app.use(signUpRoute);

const loginRoute = require("./routers/routes/loginRoute");
app.use(loginRoute);

const userRoute = require("./routers/routes/userRoute");
app.use(userRoute);

const cardRoute = require("./routers/routes/cardRoute");
app.use(cardRoute);

const paymentRoute = require("./routers/routes/paymentRoute");
app.use(paymentRoute);

const transactionRoute = require("./routers/routes/transactionRoute");
app.use(transactionRoute);

const SendMsgRoute = require("./routers/routes/SendMsgRoute");
app.use(SendMsgRoute);

const socketRoute = require("./routers/routes/socketRoute");
app.use(socketRoute);

////////////

const Port = 5000;
const server = app.listen(process.env.PORT || Port, () => {
  console.log("SERVER IS RUN!");
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("user connect", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("socket id", socket.id, "join in", data, "room");
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnect", socket.id);
  });
});
