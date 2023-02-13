const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
require("./database");
const retailerRoute = require("./routes/retailer");
const userRoute = require("./routes/user");

//=========================================================
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

//=========================================================
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const clients = {};

//================= SOCKET ========================================
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
//================= ROUTES =======================================

app.get("/", (req, res) => {
  res.status(200).json("Welcome to the server-side");
});

app.use("/retailer", retailerRoute);
app.use("/user", userRoute);

//=========================================================

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//=============================
