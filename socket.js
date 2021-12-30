// const http = require("http");
// const listenApp = require("./server")

// const { Server } = require("socket.io");

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });
// console.log(io);
// io.on("connection", (socket) => {
//   console.log("user connect", socket.id);

//   // socket.on("join_room",(data)=>{
//   //   socket.join(data)
//   //   console.log("user in", data);
//   // })

//   socket.on("disconnect", () => {
//     console.log("DIS CONNECT", socket.id);
//   });
// });

// server.listenApp