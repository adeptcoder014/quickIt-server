const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const clients = {};

io.on("connection", (socket) => {
  console.log(`NewSocket : ${socket.id}`);

  clients[socket.id] = socket;

  socket.on("sendMessage", (message) => {
    console.log("message :", message);
    Object.values(clients).forEach((client) => {
      // console.log("=============>", client);
      // return;
      if (client.id !== socket.id) {

      client.emit("receiveMessage", message);
      }
    });
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    delete clients[socket.id];
  });
});

app.get("/", (req, res) => {
  res.status(200).json("Welcome to the server-side");
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// const clients = {};

// io.on("connection", (socket) => {
//   console.log(`Client connected: ${socket.id}`);

//   clients[socket.id] = socket;

//   socket.on("sendMessage", (message) => {
//     console.log(`Message received: ${message}`);

//     Object.values(clients).forEach((client) => {
//       client.emit("receiveMessage", message);
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log(`Client disconnected: ${socket.id}`);

//     delete clients[socket.id];
//   });
// });

// server.listen(3000, () => {
//   console.log("Server started on port 3000");
// });
